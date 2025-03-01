import sys
import base64
import os
from PyQt5.QtWidgets import (
    QApplication, QWidget, QPushButton, QFileDialog, QTextEdit,
    QVBoxLayout, QLabel, QMessageBox
)

class Base64Converter(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle("Base64 Converter for Minecraft Mod")
        self.setGeometry(100, 100, 600, 500)

        layout = QVBoxLayout()

        # Convert File to Base64 Section
        self.label = QLabel("Select an Image (PNG, JPG) or Audio (OGG, MP3, WAV):", self)
        layout.addWidget(self.label)

        self.selectButton = QPushButton("Select File to Convert", self)
        self.selectButton.clicked.connect(self.selectFile)
        layout.addWidget(self.selectButton)

        self.resultText = QTextEdit(self)
        self.resultText.setPlaceholderText("Base64 output will appear here...")
        layout.addWidget(self.resultText)

        self.copyButton = QPushButton("Copy Base64 to Clipboard", self)
        self.copyButton.clicked.connect(self.copyToClipboard)
        layout.addWidget(self.copyButton)

        # Convert Base64 to File Section
        self.decodeLabel = QLabel("Paste Base64 to Convert Back to File:", self)
        layout.addWidget(self.decodeLabel)

        self.base64Input = QTextEdit(self)
        self.base64Input.setPlaceholderText("Paste Base64 string here...")
        layout.addWidget(self.base64Input)

        self.decodeButton = QPushButton("Decode and Save File", self)
        self.decodeButton.clicked.connect(self.decodeBase64)
        layout.addWidget(self.decodeButton)

        self.setLayout(layout)

    def selectFile(self):
        options = QFileDialog.Options()
        filePath, _ = QFileDialog.getOpenFileName(self, "Open File", "", 
                                                  "All Supported Files (*.png *.jpg *.ogg *.mp3 *.wav);;"
                                                  "Image Files (*.png *.jpg);;Audio Files (*.ogg *.mp3 *.wav)",
                                                  options=options)
        if filePath:
            try:
                base64String = self.convertToBase64(filePath)
                self.resultText.setPlainText(base64String)
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to convert file: {str(e)}")

    def convertToBase64(self, filePath):
        with open(filePath, "rb") as file:
            encodedBytes = base64.b64encode(file.read()).decode("utf-8")
        
        fileType = "image/png" if filePath.endswith((".png", ".jpg")) else "audio/ogg"
        base64String = f"data:{fileType};base64,{encodedBytes}"
        
        return base64String

    def copyToClipboard(self):
        clipboard = QApplication.clipboard()
        clipboard.setText(self.resultText.toPlainText())
        QMessageBox.information(self, "Copied", "Base64 string copied to clipboard!")

    def decodeBase64(self):
        base64Data = self.base64Input.toPlainText().strip()
        
        if not base64Data.startswith("data:"):
            QMessageBox.critical(self, "Error", "Invalid Base64 format! Expected 'data:image/png;base64,...'")
            return

        try:
            # Extract file type and actual base64 data
            header, encodedData = base64Data.split(",", 1)
            fileExt = header.split("/")[1].split(";")[0]

            # Save decoded file
            savePath, _ = QFileDialog.getSaveFileName(self, "Save Decoded File", f"decoded_file.{fileExt}",
                                                      f"{fileExt.upper()} Files (*.{fileExt})")

            if savePath:
                with open(savePath, "wb") as file:
                    file.write(base64.b64decode(encodedData))
                QMessageBox.information(self, "Success", f"File saved successfully: {savePath}")

        except Exception as e:
            QMessageBox.critical(self, "Error", f"Failed to decode Base64: {str(e)}")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    converter = Base64Converter()
    converter.show()
    sys.exit(app.exec_())

