#!/bin/bash

set -e  # Exit on any error

# Variables
DISK="/dev/sda"  # Replace with the disk to be wiped, change if needed (e.g., /dev/sdb)
HOSTNAME="steamos"
USERNAME="steam"
PASSWORD="password"  # Change to a secure password
LOCALE="en_US.UTF-8"
TIMEZONE="America/New_York"  # Change to your timezone

# WARNING: This step will erase all data on the specified disk!
echo "Warning: This will wipe all data on $DISK. Are you sure? (y/n)"
read confirm
if [[ $confirm != "y" ]]; then
    echo "Aborting installation."
    exit 1
fi

# Wipe all partitions on the disk (Be Careful!)
echo "Wiping all partitions on $DISK..."
sgdisk --zap-all $DISK
partprobe $DISK

# Partition and Format Disk
echo "Partitioning and formatting disk..."
parted -s $DISK mklabel gpt
parted -s $DISK mkpart ESP fat32 1MiB 513MiB
parted -s $DISK set 1 boot on
parted -s $DISK mkpart primary ext4 513MiB 100%
mkfs.fat -F32 "${DISK}1"
mkfs.ext4 "${DISK}2"

echo "Mounting partitions..."
mount "${DISK}2" /mnt
mkdir /mnt/boot
mount "${DISK}1" /mnt/boot

# Base System Installation
echo "Installing base system..."
pacstrap /mnt base linux linux-firmware nano networkmanager grub efibootmgr sudo git vim htop

echo "Generating fstab..."
genfstab -U /mnt >> /mnt/etc/fstab

# System Configuration in Chroot
arch-chroot /mnt /bin/bash <<EOF
# Set hostname
echo "$HOSTNAME" > /etc/hostname
echo "127.0.0.1 localhost" >> /etc/hosts
echo "::1 localhost" >> /etc/hosts
echo "127.0.1.1 $HOSTNAME.localdomain $HOSTNAME" >> /etc/hosts

# Timezone and Locale
ln -sf /usr/share/zoneinfo/$TIMEZONE /etc/localtime
hwclock --systohc
echo "$LOCALE UTF-8" > /etc/locale.gen
locale-gen
echo "LANG=$LOCALE" > /etc/locale.conf

# Root Password
echo "root:$PASSWORD" | chpasswd

# Create Steam User
useradd -m -G wheel $USERNAME
echo "$USERNAME:$PASSWORD" | chpasswd

# Enable sudo
echo "%wheel ALL=(ALL) ALL" > /etc/sudoers.d/wheel

# Install and Configure GRUB
pacman -Sy --noconfirm grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg

# Enable services
systemctl enable NetworkManager
EOF

# Install Desktop, Steam, Network Tools, and Additional Features
arch-chroot /mnt /bin/bash <<EOF
# Install packages
pacman -Sy --noconfirm xorg-server xorg-xinit openbox steam gdm plymouth gamemode xboxdrv vulkan-icd-loader mesa alsa-utils pavucontrol firefox dialog nmtui

# Enable GDM and Xbox Controller
systemctl enable gdm
systemctl enable xboxdrv

# Configure GDM for autologin
mkdir -p /etc/gdm
echo -e "[daemon]\nAutomaticLoginEnable=True\nAutomaticLogin=$USERNAME" > /etc/gdm/custom.conf

# Configure Steam Big Picture Mode
cat <<EOL > /etc/systemd/system/steam-bigpicture.service
[Unit]
Description=Steam Big Picture Mode
After=graphical.target
Wants=graphical.target

[Service]
User=$USERNAME
ExecStart=/usr/bin/steam -tenfoot
Restart=always
Environment=DISPLAY=:0

[Install]
WantedBy=graphical.target
EOL

systemctl enable steam-bigpicture.service

# Configure Openbox as a lightweight desktop
cat <<EOL > /etc/systemd/system/openbox.service
[Unit]
Description=Openbox Desktop
After=graphical.target
Wants=graphical.target

[Service]
User=$USERNAME
ExecStart=/usr/bin/openbox-session
Restart=always
Environment=DISPLAY=:0

[Install]
WantedBy=graphical.target
EOL

# Configure splash screen
plymouth-set-default-theme spinner
sed -i 's/GRUB_CMDLINE_LINUX_DEFAULT=".*"/GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"/' /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg

# Create Openbox menu for launching tools
mkdir -p /home/$USERNAME/.config/openbox
cat <<EOL > /home/$USERNAME/.config/openbox/menu.xml
<openbox_menu>
  <menu id="root-menu" label="Openbox menu">
    <item label="Steam Big Picture">
      <action name="Execute">
        <command>steam -tenfoot</command>
      </action>
    </item>
    <item label="Firefox">
      <action name="Execute">
        <command>firefox</command>
      </action>
    </item>
    <item label="Terminal">
      <action name="Execute">
        <command>xterm</command>
      </action>
    </item>
    <item label="Network Configuration">
      <action name="Execute">
        <command>nmtui</command>
      </action>
    </item>
    <separator />
    <item label="Logout">
      <action name="Exit" />
    </item>
  </menu>
</openbox_menu>
EOL

chown -R $USERNAME:$USERNAME /home/$USERNAME/.config
EOF

echo "Unmounting partitions..."
umount -R /mnt

echo "Installation complete. Reboot your system."
