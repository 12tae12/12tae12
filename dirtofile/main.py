import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import os
import struct
import hashlib
import threading

BINARY_FORMAT_VERSION = 1
CHUNK_SIZE = 1024 * 1024  # 1MB chunks for large files

def folder_to_binary(folder_path, output_file):
    """Convert folder structure to binary format with validation"""
    try:
        with open(output_file, 'wb') as bin_file:
            # Write format header
            bin_file.write(struct.pack('!4sI', b'FBIN', BINARY_FORMAT_VERSION))
            
            for root, dirs, files in os.walk(folder_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, folder_path)
                    
                    # Write path metadata
                    path_bytes = relative_path.encode('utf-8')
                    bin_file.write(struct.pack('!Q', len(path_bytes)))  # Path length
                    bin_file.write(path_bytes)                          # Path content
                    
                    # Write file metadata
                    file_size = os.path.getsize(file_path)
                    bin_file.write(struct.pack('!Q', file_size))        # File size
                    
                    # Write file content with hash verification
                    sha256 = hashlib.sha256()
                    with open(file_path, 'rb') as f:
                        while True:
                            chunk = f.read(CHUNK_SIZE)
                            if not chunk:
                                break
                            sha256.update(chunk)
                            bin_file.write(chunk)
                    
                    # Write file hash
                    bin_file.write(sha256.digest())
            
            # Write final end marker INSIDE the with block
            bin_file.write(struct.pack('!8s', b'FBIN_END'))  # 8-byte end marker

    except Exception as e:
        raise RuntimeError(f"Conversion failed: {str(e)}")

def binary_to_folder(binary_file, output_folder):
    """Convert binary file back to folder structure with validation"""
    try:
        with open(binary_file, 'rb') as bin_file:
            # Verify file header
            header, version = struct.unpack('!4sI', bin_file.read(8))
            if header != b'FBIN':
                raise ValueError("Invalid file format")
            if version != BINARY_FORMAT_VERSION:
                raise ValueError("Unsupported version")
            
            os.makedirs(output_folder, exist_ok=True)
            
            while True:
                # Read potential marker or path length
                marker_data = bin_file.read(8)
                if not marker_data:
                    break  # Natural end of file
                
                # Check for end marker
                if marker_data == b'FBIN_END':
                    break
                
                # Process as path length
                try:
                    path_length = struct.unpack('!Q', marker_data)[0]
                except struct.error:
                    raise ValueError("Unexpected data at end of file")
                
                # Read path
                path = bin_file.read(path_length).decode('utf-8')
                full_path = os.path.join(output_folder, path)
                os.makedirs(os.path.dirname(full_path), exist_ok=True)
                
                # Read file size
                file_size = struct.unpack('!Q', bin_file.read(8))[0]
                
                # Read file content with hash verification
                sha256 = hashlib.sha256()
                remaining = file_size
                with open(full_path, 'wb') as f:
                    while remaining > 0:
                        chunk_size = min(remaining, CHUNK_SIZE)
                        chunk = bin_file.read(chunk_size)
                        if not chunk:
                            raise ValueError("Unexpected end of file")
                        sha256.update(chunk)
                        f.write(chunk)
                        remaining -= chunk_size
                
                # Verify hash
                stored_hash = bin_file.read(32)
                if sha256.digest() != stored_hash:
                    raise ValueError(f"File corruption detected in {path}")
            
            # Verify we read the entire file
            remaining_data = bin_file.read()
            if remaining_data:
                raise ValueError("Extra data found after end marker")

    except Exception as e:
        raise RuntimeError(f"Extraction failed: {str(e)}")

# GUI Implementation
class BinaryConverterApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Folder Binary Converter")
        self.geometry("600x300")
        self.create_widgets()
        self.loading_window = None  # To hold the loading indicator window
    
    def create_widgets(self):
        # Folder to Binary Section
        folder_frame = tk.Frame(self, padx=20, pady=10)
        folder_frame.pack(fill='x')
        
        tk.Label(folder_frame, text="Folder to Binary", font=('Arial', 12, 'bold')).pack(anchor='w')
        self.folder_entry = tk.Entry(folder_frame, width=50)
        self.folder_entry.pack(side='left', padx=5)
        tk.Button(folder_frame, text="Browse", command=self.browse_folder).pack(side='left')
        tk.Button(folder_frame, text="Convert", command=self.start_folder_conversion).pack(side='left', padx=10)
        
        # Binary to Folder Section
        binary_frame = tk.Frame(self, padx=20, pady=10)
        binary_frame.pack(fill='x')
        
        tk.Label(binary_frame, text="Binary to Folder", font=('Arial', 12, 'bold')).pack(anchor='w')
        self.binary_entry = tk.Entry(binary_frame, width=50)
        self.binary_entry.pack(side='left', padx=5)
        tk.Button(binary_frame, text="Browse", command=self.browse_binary).pack(side='left')
        tk.Button(binary_frame, text="Convert", command=self.start_binary_conversion).pack(side='left', padx=10)
    
    def browse_folder(self):
        folder = filedialog.askdirectory()
        if folder:
            self.folder_entry.delete(0, tk.END)
            self.folder_entry.insert(0, folder)
    
    def browse_binary(self):
        file = filedialog.askopenfilename(filetypes=[("Binary Files", "*.fbin")])
        if file:
            self.binary_entry.delete(0, tk.END)
            self.binary_entry.insert(0, file)
    
    def start_folder_conversion(self):
        folder_path = self.folder_entry.get()
        if not folder_path:
            messagebox.showerror("Error", "Please select a folder first")
            return
        
        output_file = filedialog.asksaveasfilename(
            defaultextension=".fbin",
            filetypes=[("Folder Binary Files", "*.fbin")]
        )
        
        if output_file:
            # Show loading indicator and start conversion in a thread
            self.show_loading("Converting folder to binary...")
            threading.Thread(target=self.run_folder_conversion, args=(folder_path, output_file), daemon=True).start()
    
    def run_folder_conversion(self, folder_path, output_file):
        try:
            folder_to_binary(folder_path, output_file)
            self.after(0, lambda: messagebox.showinfo("Success", "Folder converted to binary successfully!"))
        except Exception as e:
            self.after(0, lambda: messagebox.showerror("Conversion Error", str(e)))
        finally:
            self.after(0, self.hide_loading)
    
    def start_binary_conversion(self):
        binary_file = self.binary_entry.get()
        if not binary_file:
            messagebox.showerror("Error", "Please select a binary file first")
            return
        
        output_folder = filedialog.askdirectory()
        if output_folder:
            # Show loading indicator and start conversion in a thread
            self.show_loading("Extracting binary to folder...")
            threading.Thread(target=self.run_binary_conversion, args=(binary_file, output_folder), daemon=True).start()
    
    def run_binary_conversion(self, binary_file, output_folder):
        try:
            binary_to_folder(binary_file, output_folder)
            self.after(0, lambda: messagebox.showinfo("Success", "Binary converted to folder successfully!"))
        except Exception as e:
            self.after(0, lambda: messagebox.showerror("Extraction Error", str(e)))
        finally:
            self.after(0, self.hide_loading)
    
    def show_loading(self, message):
        """Create a loading window with an indeterminate progress bar."""
        if self.loading_window is not None:
            return  # Already showing

        self.loading_window = tk.Toplevel(self)
        self.loading_window.title("Please wait...")
        self.loading_window.geometry("450x200")
        self.loading_window.resizable(False, False)
        self.loading_window.grab_set()  # Make the loading window modal

        label = tk.Label(self.loading_window, text=message)
        label.pack(pady=10)

        self.progress = ttk.Progressbar(self.loading_window, mode='indeterminate', length=250)
        self.progress.pack(pady=10)
        self.progress.start(10)  # Speed of the progress bar

        # Disable closing the window manually
        self.loading_window.protocol("WM_DELETE_WINDOW", lambda: None)
    
    def hide_loading(self):
        """Destroy the loading window and stop the progress bar."""
        if self.loading_window:
            self.progress.stop()
            self.loading_window.destroy()
            self.loading_window = None

if __name__ == "__main__":
    app = BinaryConverterApp()
    app.mainloop()

