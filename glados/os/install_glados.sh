echo "Starting GLaDOS Chatbot Installation..."

# Update the system and install essential dependencies
echo "Updating system and installing dependencies..."
apt update
apt upgrade -y
apt install -y python3 python3-pip python3-dev build-essential git curl ffmpeg \
  libsndfile1 alsa-utils sox python3-torch libsndfile1-dev

# Install Python packages required for GLaDOS Chatbot
pip3 install torch transformers pydub nltk scipy

# Install wget and unzip (if not already installed)
apt install -y wget unzip

# Set up the glados user
echo "Setting up the 'glados' user..."
useradd -m glados -s /bin/bash
mkdir -p /home/glados/chatbot
chown -R glados:glados /home/glados

# Clone GLaDOS TTS repository
echo "Cloning GLaDOS TTS repository..."
cd /home/glados/chatbot
git clone https://github.com/12tae12/glados-tts.git
cd glados-tts

# Copy model files to the same directory as chatbot.py
echo "Copying model files to the chatbot directory..."
mkdir -p /home/glados/chatbot/glados-tts/models/emb
cp /home/glados/chatbot/glados-tts/models/emb/* /home/glados/chatbot/glados-tts/models/emb/

# Download GPT-2 model files for Chatbot
echo "Downloading GPT-2 model files..."
python3 -m transformers-cli download gpt2

# Set up NLTK punkt tokenizer
echo "Downloading NLTK punkt tokenizer..."
python3 -c "import nltk; nltk.download('punkt')"

# Create systemd service for auto-start on boot
echo "Creating systemd service for auto-start..."

cat <<EOF > /etc/systemd/system/glados.service
[Unit]
Description=GLaDOS Chatbot Service
After=network.target

[Service]
ExecStart=/usr/bin/python3 /home/glados/chatbot/glados-tts/chatbot.py
WorkingDirectory=/home/glados/chatbot/glados-tts
StandardOutput=inherit
StandardError=inherit
Restart=always
User=glados

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
echo "Enabling and starting the GLaDOS service..."
systemctl enable glados.service
systemctl start glados.service

# Configure auto-login for glados user
echo "Configuring auto-login for the 'glados' user..."

mkdir -p /etc/systemd/system/getty@tty1.service.d
cat <<EOF > /etc/systemd/system/getty@tty1.service.d/override.conf
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin glados --noclear %I \$TERM
EOF

# Reload systemd to apply changes
systemctl daemon-reload
systemctl restart getty@tty1

# Configure chatbot to run on login
echo "Setting up chatbot to run on login for 'glados' user..."
echo "/home/glados/chatbot/glados-tts/chatbot.py" >> /home/glados/.bash_profile

# Set correct file permissions
chown -R glados:glados /home/glados/chatbot

# Notify user of successful installation
echo "GLaDOS Chatbot installation complete! The chatbot will now greet you upon login."
echo "You can test the chatbot by logging in as the 'glados' user and typing your queries."

# Exit the script
exit 0
