#!/bin/bash

# Define variables
SCRIPT_DIR="/opt/glados_chatbot"
SCRIPT_PATH="$SCRIPT_DIR/glados_chatbot.py"
SERVICE_PATH="/etc/systemd/system/glados.service"
TTY_OVERRIDE="/etc/systemd/system/getty@tty1.service.d/override.conf"
USER="glados"
CHATBOT_URL="https://1t2.pages.dev/glados/os/chatbot.py"
USER_PROFILE="/home/$USER/.bash_profile"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root. Use sudo." 
   exit 1
fi

# Step 1: Set up the GLaDOS chatbot script
echo "Setting up GLaDOS chatbot script..."
mkdir -p $SCRIPT_DIR

# Download the chatbot script
echo "Downloading chatbot script from $CHATBOT_URL..."
curl -o $SCRIPT_PATH $CHATBOT_URL

# Check if download was successful
if [[ $? -ne 0 ]]; then
    echo "Failed to download chatbot script. Please check the URL and try again."
    exit 1
fi

chmod +x $SCRIPT_PATH

# Step 2: Create the systemd service file for the GLaDOS chatbot
echo "Creating systemd service file..."
cat << EOF > $SERVICE_PATH
[Unit]
Description=GLaDOS Chatbot Service
After=network.target

[Service]
ExecStart=/usr/bin/python3 $SCRIPT_PATH
WorkingDirectory=$SCRIPT_DIR
StandardOutput=inherit
StandardError=inherit
Restart=always
User=$USER

[Install]
WantedBy=multi-user.target
EOF

# Step 3: Enable and start the service
echo "Enabling and starting the GLaDOS service..."
systemctl enable glados.service
systemctl start glados.service

# Step 4: Configure auto-login on tty1 for user 'glados'
echo "Configuring auto-login for user $USER on tty1..."

# Create the override directory if it doesn't exist
mkdir -p /etc/systemd/system/getty@tty1.service.d

# Write the auto-login config for getty@tty1
cat << EOF > $TTY_OVERRIDE
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin $USER --noclear %I \$TERM
EOF

# Reload systemd to apply changes
systemctl daemon-reload

# Step 5: Set up .bash_profile to auto-run the chatbot on login for the 'glados' user
echo "Setting up .bash_profile to run chatbot on login..."

# Ensure the .bash_profile exists for the user
if [[ ! -f $USER_PROFILE ]]; then
    touch $USER_PROFILE
    chown $USER:$USER $USER_PROFILE
fi

# Add the chatbot launch command to .bash_profile if it’s not already there
if ! grep -Fxq "$SCRIPT_PATH" $USER_PROFILE; then
    echo "" >> $USER_PROFILE
    echo "# Start the GLaDOS chatbot on login" >> $USER_PROFILE
    echo "$SCRIPT_PATH" >> $USER_PROFILE
fi

# Set permissions for the script directory
chown -R $USER:$USER $SCRIPT_DIR

sudo apt update
sudo apt install python3 python3-pip git curl build-essential ffmpeg -y
pip3 install torch transformers pydub nltk scipy --break-system-packages

echo "GLaDOS chatbot setup complete. The system will auto-login as '$USER' and start the chatbot on boot."
