#!/bin/bash

set -e  # Exit on any error

# Variables
USERNAME="steam"
PASSWORD="password"  # Change to a secure password
LOCALE="en_US.UTF-8"
TIMEZONE="America/New_York"  # Change to your timezone

# Update and install necessary packages
echo "Updating system..."
sudo zypper refresh
sudo zypper update -y

echo "Installing required packages..."
sudo zypper install -y \
    steam \
    xorg-x11-server \
    xorg-x11-apps \
    openbox \
    gdm \
    plymouth \
    gamemode \
    xboxdrv \
    vulkan-icd-loader \
    mesa \
    alsa-utils \
    pavucontrol \
    firefox \
    dialog \
    nmtui \
    sudo \
    vim \
    git \
    htop

# Create Steam user
sudo useradd -m -G wheel $USERNAME
echo "$USERNAME:$PASSWORD" | sudo chpasswd

# Configure sudoers for the steam user
echo "%wheel ALL=(ALL) ALL" | sudo tee /etc/sudoers.d/wheel

# Set up GDM (Gnome Display Manager) for autologin
echo "Configuring GDM for autologin..."
sudo mkdir -p /etc/gdm
echo -e "[daemon]\nAutomaticLoginEnable=True\nAutomaticLogin=$USERNAME" | sudo tee /etc/gdm/custom.conf

# Enable necessary services
echo "Enabling services..."
sudo systemctl enable gdm
sudo systemctl enable xboxdrv

# Create Steam Big Picture systemd service to launch Steam in Big Picture mode
echo "Creating Steam Big Picture service..."
sudo tee /etc/systemd/system/steam-bigpicture.service > /dev/null <<EOL
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

# Enable Steam Big Picture mode to start automatically on boot
sudo systemctl enable steam-bigpicture.service

# Set up Openbox as the default window manager
echo "Setting up Openbox as the default window manager..."
sudo tee /etc/systemd/system/openbox.service > /dev/null <<EOL
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

# Set Plymouth theme (optional splash screen)
echo "Setting Plymouth theme..."
sudo plymouth-set-default-theme spinner
sudo sed -i 's/GRUB_CMDLINE_LINUX_DEFAULT=".*"/GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"/' /etc/default/grub
sudo grub2-mkconfig -o /boot/grub2/grub.cfg

# Create Openbox menu for launching Steam, Firefox, and terminal
echo "Creating Openbox menu..."
mkdir -p /home/$USERNAME/.config/openbox
sudo tee /home/$USERNAME/.config/openbox/menu.xml > /dev/null <<EOL
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

# Adjust ownership of the Openbox config directory
sudo chown -R $USERNAME:$USERNAME /home/$USERNAME/.config

# Final steps: Enable autologin and reboot
echo "System setup complete. Rebooting the system..."
sudo reboot
