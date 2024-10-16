import sys
import os
import logging
from PyQt5.QtWidgets import (
    QApplication, QWidget, QLabel, QLineEdit, QListWidget, 
    QPushButton, QVBoxLayout, QHBoxLayout, QMessageBox, 
    QTextEdit, QInputDialog
)
from PyQt5.QtCore import Qt

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class AppGenerator(QWidget):
    def __init__(self):
        super().__init__()
        self.file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app.txt")
        self.apps = self.load_apps()
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()

        # Search Bar
        search_layout = QHBoxLayout()
        search_label = QLabel("Search:")
        search_layout.addWidget(search_label)
        self.search_entry = QLineEdit()
        self.search_entry.textChanged.connect(self.filter_apps)
        search_layout.addWidget(self.search_entry)
        layout.addLayout(search_layout)

        # App List
        self.app_list = QListWidget()
        self.app_list.itemSelectionChanged.connect(self.load_app_details)
        layout.addWidget(self.app_list)

        # App Details (Name, Version, Commands)
        self.app_name_input = QLineEdit()
        self.app_name_input.setPlaceholderText("App Name")
        layout.addWidget(self.app_name_input)

        self.version_input = QLineEdit()
        self.version_input.setPlaceholderText("Version")
        layout.addWidget(self.version_input)

        self.commands_input = QTextEdit()
        self.commands_input.setPlaceholderText("Enter commands separated by commas")
        layout.addWidget(self.commands_input)

        # Buttons: Add, Edit, Remove, Save
        button_layout = QHBoxLayout()
        self.add_button = QPushButton("Add App")
        self.add_button.clicked.connect(self.add_app)
        button_layout.addWidget(self.add_button)

        self.edit_button = QPushButton("Edit App")
        self.edit_button.clicked.connect(self.edit_app)
        button_layout.addWidget(self.edit_button)

        self.remove_button = QPushButton("Remove App")
        self.remove_button.clicked.connect(self.remove_app)
        button_layout.addWidget(self.remove_button)

        self.save_button = QPushButton("Save Changes")
        self.save_button.clicked.connect(self.save_to_file)
        button_layout.addWidget(self.save_button)

        layout.addLayout(button_layout)

        # Set the layout and window properties
        self.setLayout(layout)
        self.setWindowTitle("App Generator")
        self.setMinimumWidth(500)
        self.setStyleSheet(
            "QListWidget::item:selected { background-color: #3498db; color: white; }"
            "QPushButton { background-color: #2ecc71; color: white; border: none; padding: 10px; border-radius: 5px; }"
            "QPushButton:hover { background-color: #27ae60; }"
            "QLineEdit, QTextEdit { border: 1px solid #ccc; border-radius: 5px; padding: 5px; }"
        )
        self.filter_apps()

    def load_apps(self):
        """Load the apps from app.txt into a list."""
        try:
            apps = []
            with open(self.file_path, "r") as file:
                app_name, version, commands = None, None, []
                for line in file:
                    line = line.strip()
                    if line.startswith("Commands:"):
                        commands = line.split(": ")[1].split(", ")
                    elif line.startswith("App"):
                        if app_name and version and commands:
                            apps.append((app_name, version, commands))
                        parts = line.split()
                        app_name, version = parts[1], parts[2]
                        commands = []
                if app_name and version and commands:
                    apps.append((app_name, version, commands))
            logging.debug(f"Loaded apps: {apps}")
            return apps
        except FileNotFoundError:
            logging.error("App list file not found!")
            return []

    def filter_apps(self):
        """Filter and display apps based on search input."""
        search_term = self.search_entry.text().lower()
        self.app_list.clear()
        for app_name, version, _ in self.apps:
            if search_term in f"{app_name} {version}".lower():
                self.app_list.addItem(f"{app_name} {version}")

    def load_app_details(self):
        """Load the details of the selected app into the input fields."""
        selected_item = self.app_list.currentItem()
        if selected_item:
            app_name, version = selected_item.text().split()
            for name, ver, commands in self.apps:
                if name == app_name and ver == version:
                    self.app_name_input.setText(name)
                    self.version_input.setText(ver)
                    self.commands_input.setText(", ".join(commands))
                    break

    def add_app(self):
        """Add a new app to the list."""
        name = self.app_name_input.text().strip()
        version = self.version_input.text().strip()
        commands = self.commands_input.toPlainText().strip().split(", ")

        if not name or not version or not commands:
            QMessageBox.critical(self, "Error", "All fields are required to add an app.")
            return

        self.apps.append((name, version, commands))
        self.filter_apps()
        QMessageBox.information(self, "Success", f"App '{name}' added.")

    def edit_app(self):
        """Edit the selected app's details."""
        selected_item = self.app_list.currentItem()
        if not selected_item:
            QMessageBox.critical(self, "Error", "Please select an app to edit.")
            return

        old_name, old_version = selected_item.text().split()
        new_name = self.app_name_input.text().strip()
        new_version = self.version_input.text().strip()
        new_commands = self.commands_input.toPlainText().strip().split(", ")

        for i, (name, version, commands) in enumerate(self.apps):
            if name == old_name and version == old_version:
                self.apps[i] = (new_name, new_version, new_commands)
                self.filter_apps()
                QMessageBox.information(self, "Success", f"App '{old_name}' edited.")
                return

    def remove_app(self):
        """Remove the selected app from the list."""
        selected_item = self.app_list.currentItem()
        if not selected_item:
            QMessageBox.critical(self, "Error", "Please select an app to remove.")
            return

        app_name, version = selected_item.text().split()
        self.apps = [(name, ver, cmds) for name, ver, cmds in self.apps if name != app_name or ver != version]
        self.filter_apps()
        QMessageBox.information(self, "Success", f"App '{app_name}' removed.")

    def save_to_file(self):
        """Save the modified apps list back to app.txt."""
        try:
            with open(self.file_path, "w") as file:
                for name, version, commands in self.apps:
                    file.write(f"App {name} {version}\n")
                    file.write(f"Commands: {', '.join(commands)}\n")
            QMessageBox.information(self, "Success", "Changes saved successfully.")
        except Exception as e:
            logging.error(f"Error saving to file: {e}")
            QMessageBox.critical(self, "Error", "Failed to save changes.")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    generator = AppGenerator()
    generator.show()
    sys.exit(app.exec_())
