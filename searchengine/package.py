import os
import sys
import shutil
import tempfile
import zipfile
import xml.etree.ElementTree as ET
from PyQt5.QtWidgets import (
    QApplication, QWidget, QPushButton, QVBoxLayout, QFileDialog,
    QMessageBox, QLabel
)

# --- Functions for XML update ---

def indent(elem, level=0):
    """
    In-place prettyprint formatter for ElementTree elements.
    """
    i = "\n" + level * "  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        for child in elem:
            indent(child, level + 1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = i

def parse_info_file(filepath):
    """
    Read an info.txt file and return a dict with keys:
      'Website URL', 'Page Title', 'First Sentence'
    """
    info = {}
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                if ":" in line:
                    key, value = line.split(":", 1)
                    info[key.strip()] = value.strip()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    return info

def update_xml(data_dir, xml_filename="items.xml"):
    """
    Scan the given data_dir for subdirectories containing an info.txt file.
    Then update (or create) an XML file with structure:
      <items>
         <item>
           <title>...</title>
           <description>...</description>
           <url>...</url>
         </item>
         ...
      </items>
    
    If an XML file already exists, update its items; otherwise, create one.
    Items (using Website URL as the unique key) not found in data_dir are removed.
    """
    # Check if the data_dir has a "crawled_data" folder and use it if so.
    potential = os.path.join(data_dir, "crawled_data")
    if os.path.isdir(potential):
        data_dir = potential

    # Load existing XML if it exists.
    if os.path.exists(xml_filename):
        try:
            tree = ET.parse(xml_filename)
            root = tree.getroot()
        except Exception as e:
            print(f"Error parsing existing XML file: {e}")
            root = ET.Element("items")
    else:
        root = ET.Element("items")

    # Build a mapping from URL to existing <item> elements.
    existing_items = {}
    for item in root.findall('item'):
        url_elem = item.find('url')
        if url_elem is not None and url_elem.text:
            existing_items[url_elem.text.strip()] = item

    scanned_urls = set()
    
    # Process each subdirectory in data_dir.
    for entry in os.scandir(data_dir):
        if entry.is_dir():
            info_path = os.path.join(entry.path, "info.txt")
            if os.path.exists(info_path):
                info = parse_info_file(info_path)
                website_url = info.get("Website URL", "").strip()
                page_title = info.get("Page Title", "").strip()
                first_sentence = info.get("First Sentence", "").strip()
                if website_url:
                    scanned_urls.add(website_url)
                    if website_url in existing_items:
                        # Update existing item.
                        item = existing_items[website_url]
                        title_elem = item.find('title')
                        if title_elem is None:
                            title_elem = ET.SubElement(item, "title")
                        title_elem.text = page_title

                        description_elem = item.find('description')
                        if description_elem is None:
                            description_elem = ET.SubElement(item, "description")
                        description_elem.text = first_sentence

                        url_elem = item.find('url')
                        if url_elem is None:
                            url_elem = ET.SubElement(item, "url")
                        url_elem.text = website_url
                    else:
                        # Create new item.
                        item = ET.SubElement(root, "item")
                        title_elem = ET.SubElement(item, "title")
                        title_elem.text = page_title
                        description_elem = ET.SubElement(item, "description")
                        description_elem.text = first_sentence
                        url_elem = ET.SubElement(item, "url")
                        url_elem.text = website_url

    # Remove XML items not present in scanned_urls.
    for url, item in list(existing_items.items()):
        if url not in scanned_urls:
            root.remove(item)

    # Pretty-print and write out the XML.
    indent(root)
    tree = ET.ElementTree(root)
    try:
        tree.write(xml_filename, encoding="utf-8", xml_declaration=True)
        return True, f"XML file '{xml_filename}' updated successfully."
    except Exception as e:
        return False, f"Error writing XML file: {e}"

# --- PyQt5 GUI Application ---

class ZipToXMLUpdater(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Zip to XML Updater")
        self.resize(400, 150)
        self.layout = QVBoxLayout(self)

        self.info_label = QLabel("Select a ZIP file containing the crawled data.", self)
        self.layout.addWidget(self.info_label)

        self.select_button = QPushButton("Select ZIP File", self)
        self.select_button.clicked.connect(self.select_zip)
        self.layout.addWidget(self.select_button)

    def select_zip(self):
        # Open a file dialog to choose a ZIP file.
        options = QFileDialog.Options()
        options |= QFileDialog.ReadOnly
        zip_path, _ = QFileDialog.getOpenFileName(
            self,
            "Select ZIP File",
            "",
            "Zip Files (*.zip);;All Files (*)",
            options=options
        )
        if zip_path:
            self.info_label.setText(f"Selected: {zip_path}")
            QApplication.processEvents()
            self.process_zip(zip_path)

    def process_zip(self, zip_path):
        # Create a temporary directory to extract the zip.
        temp_dir = tempfile.mkdtemp(prefix="zip_extract_")
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(temp_dir)
            # Update XML based on the extracted data.
            success, message = update_xml(temp_dir, xml_filename="items.xml")
            if success:
                QMessageBox.information(self, "Success", message)
            else:
                QMessageBox.critical(self, "Error", message)
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Failed to process ZIP file:\n{e}")
        finally:
            # Clean up the temporary directory.
            shutil.rmtree(temp_dir)
            self.info_label.setText("Select a ZIP file containing the crawled data.")

def main():
    app = QApplication(sys.argv)
    window = ZipToXMLUpdater()
    window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
