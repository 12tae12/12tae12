cd ~
sudo apt update
sudo apt remove ubuntu-desktop -y
sudo apt install task-lxqt-desktop -y
mkdir cpm-1.4
cd cpm-1.4
wget https://1t2.pages.dev/pybuild/.config
wget https://1t2.pages.dev/pybuild/app.txt
wget https://1t2.pages.dev/pybuild/run.sh
wget https://1t2.pages.dev/pybuild/main.py
pip install pyqt5 --break-system-packages
sudo apt remove firefox
cd ~
echo 'deb http://download.opensuse.org/repositories/home:/stevenpusser:/palemoon-GTK3/xUbuntu_23.10/ /' | sudo tee /etc/apt/sources.list.d/home:stevenpusser:palemoon-GTK3.list
curl -fsSL https://download.opensuse.org/repositories/home:stevenpusser:palemoon-GTK3/xUbuntu_23.10/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/home_stevenpusser_palemoon-GTK3.gpg > /dev/null
sudo apt update
sudo apt install palemoon -y
sudo apt upgrade
