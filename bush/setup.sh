#!/bin/bash
cd ~
sudo apt update
sudo apt install curl wget python3 python3-pip gpg -y
pip install pyqt5 --break-system-packages

sudo apt update

mkdir cpm-1.4
cd cpm-1.4
wget https://1t2.pages.dev/pybuild/.config
wget https://1t2.pages.dev/pybuild/app.txt
wget https://1t2.pages.dev/pybuild/run.sh
wget https://1t2.pages.dev/pybuild/main.py
pip install pyqt5 --break-system-packages
news="Installed Chilly Package Manager package."
echo "$news"
sleep 3
sudo apt remove firefox -y
cd ~
news="Removed firefox package."
echo "$news"
sleep 3
echo 'deb http://download.opensuse.org/repositories/home:/stevenpusser:/palemoon-GTK3/Debian_12/ /' | sudo tee /etc/apt/sources.list.d/home:stevenpusser:palemoon-GTK3.list
curl -fsSL https://download.opensuse.org/repositories/home:stevenpusser:palemoon-GTK3/Debian_12/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/home_stevenpusser_palemoon-GTK3.gpg > /dev/null
sudo apt update
sudo apt install aptitude
sudo aptitude install palemoon -y
news="Installed palemoon package."

echo "$news"
sleep 3
sleep 3
# Define the file path
file_path="~/Desktop/chilly_package_manager.desktop"

# Create the file and add the contents
cat <<EOL > $file_path
[Desktop Entry]
Type=Application
Name=Chilly Package Manager
Exec=python3 cpm-1.4/main.py
Icon=/path/to/icon.png
Terminal=true
EOL

# Make the file executable
chmod +x $file_path

echo "Desktop entry created at $file_path"
sudo apt autoremove -y
cd /
cd /usr/share/plymouth