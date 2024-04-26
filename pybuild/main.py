import sys
import os
import logging
import subprocess
from PyQt5.QtWidgets import (
    QApplication, QWidget, QLabel, QLineEdit, QListWidget,
    QPushButton, QVBoxLayout, QHBoxLayout, QMessageBox, QInputDialog
)
from PyQt5.QtCore import Qt

# Configure logging
logging.basicConfig(level=logging.DEBUG)

def run_commands(commands):
    for command in commands:
        try:
            subprocess.run(command, shell=True, check=True)
        except subprocess.CalledProcessError as e:
            logging.error(f"Error executing command: {command}")
            logging.error(e)
            return False
    return True

def load_apps():
    try:
        # Get the absolute path to the app.txt file
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, "app.txt")
        logging.info(f"Loading app list from: {file_path}")

        with open(file_path, "r") as file:
            apps = []
            app_name = None
            version = None
            commands = []
            for line in file:
                line = line.strip()
                if line.startswith("Commands:"):
                    if not app_name or not version:
                        logging.error(f"Invalid format in app.txt: Commands line encountered before App line")
                        QMessageBox.critical(None, "Error", "Invalid format in app.txt: Commands line encountered before App line")
                        return []
                    commands.extend(line.split(": ")[1].split(", "))
                elif line.startswith("App"):
                    parts = line.split()
                    if len(parts) < 3:
                        logging.error(f"Invalid format in app.txt: App line does not contain name and version")
                        QMessageBox.critical(None, "Error", "Invalid format in app.txt: App line does not contain name and version")
                        return []
                    if app_name and version and commands:
                        apps.append((f"{app_name} {version}", commands))
                        commands = []
                    app_name, version = parts[1], parts[2]
            if app_name and version and commands:  # Add an app only if all fields are present
                apps.append((f"{app_name} {version}", commands))
            logging.debug(f"Loaded apps: {apps}")
            return apps
    except FileNotFoundError:
        logging.error("App list file not found!")
        QMessageBox.critical(None, "Error", "App list file not found!")
        return []

class AppInstaller(QWidget):
    def __init__(self):
        super().__init__()

        self.apps = load_apps()

        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()

        search_layout = QHBoxLayout()
        search_label = QLabel("Search:")
        search_layout.addWidget(search_label)
        self.search_entry = QLineEdit()
        self.search_entry.textChanged.connect(self.filter_apps)
        search_layout.addWidget(self.search_entry)
        layout.addLayout(search_layout)

        self.app_list = QListWidget()
        layout.addWidget(self.app_list)

        button_layout = QHBoxLayout()
        self.install_button = QPushButton("Install")
        self.install_button.clicked.connect(self.on_install)
        button_layout.addWidget(self.install_button)
        layout.addLayout(button_layout)

        self.setLayout(layout)
        self.setWindowTitle("App Installer")
        self.setMinimumWidth(400)
        self.setMaximumWidth(600)
        self.setStyleSheet(
            "QListWidget::item:selected { background-color: #3498db; color: white; }"
            "QPushButton { background-color: #2ecc71; color: white; border: none; padding: 10px; border-radius: 5px; }"
            "QPushButton:hover { background-color: #27ae60; }"
            "QLineEdit { border: 1px solid #ccc; border-radius: 5px; padding: 5px; }"
        )
        self.show()

        # Populate the list with loaded apps
        self.filter_apps()

    def filter_apps(self):
        search_term = self.search_entry.text().lower()
        self.app_list.clear()
        for app_name, _ in self.apps:
            if search_term.lower() in app_name.lower():
                self.app_list.addItem(app_name)  # Add app name to the list widget

    def on_install(self):
        selected_item = self.app_list.currentItem()
        if selected_item:
            app_name = selected_item.text()
            found_app = False  # Flag to indicate if the app is found
            for name, commands in self.apps:
                if name == app_name:
                    found_app = True
                    password, ok = QInputDialog.getText(self, "Sudo Password", "Enter your sudo password:", QLineEdit.Password)
                    if ok:
                        commands_with_sudo = [f"echo {password} | sudo -S {command}" for command in commands]
                        if run_commands(commands_with_sudo):
                            QMessageBox.information(self, "Installation", f"{app_name} installed successfully!")
                        else:
                            QMessageBox.critical(self, "Error", f"Failed to install {app_name}. Please check the logs for details.")
                    return  # Exit the loop after finding the correct app
            if not found_app:
                QMessageBox.critical(self, "Error", f"Could not find {app_name} in the app list.")
        else:
            QMessageBox.critical(self, "Error", "Please select an app to install.")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    installer = AppInstaller()
    sys.exit(app.exec_())

