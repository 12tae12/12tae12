import os
import uuid
import requests
import re
import json
import time
import zipfile
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# Global counter to limit the total number of crawled URLs.
CRAWL_LIMIT = 10000
crawl_count = 0  # This counter is incremented each time a URL is successfully crawled.

# ------------------------------
# Helper functions for caching
# ------------------------------

def load_cache(cache_file):
    """Load the crawl cache from a JSON file."""
    if os.path.exists(cache_file):
        try:
            with open(cache_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading cache: {e}")
    return {}

def save_cache(cache, cache_file):
    """Save the crawl cache to a JSON file."""
    try:
        with open(cache_file, 'w', encoding='utf-8') as f:
            json.dump(cache, f, indent=2)
    except Exception as e:
        print(f"Error saving cache: {e}")

# ------------------------------
# Page extraction
# ------------------------------

def get_page_title_and_first_sentence(html):
    """
    Given HTML text, return the page title and the first sentence of the first non-empty <p> tag.
    """
    soup = BeautifulSoup(html, 'html.parser')
    
    # Get title if available
    title = "No Title"
    if soup.title and soup.title.string:
        title = soup.title.string.strip()
    
    # Find the first paragraph that has text.
    first_paragraph = ""
    for p in soup.find_all('p'):
        text = p.get_text().strip()
        if text:
            first_paragraph = text
            break

    # Use regex to capture the first sentence (ends with . ! or ?)
    first_sentence = ""
    if first_paragraph:
        sentence_match = re.search(r'(.+?[.!?])(\s|$)', first_paragraph)
        if sentence_match:
            first_sentence = sentence_match.group(1).strip()
        else:
            # If no sentence ending punctuation is found, take a snippet
            first_sentence = first_paragraph[:100].strip()
    else:
        first_sentence = "No content found."
    
    return title, first_sentence

# ------------------------------
# The crawler function
# ------------------------------

def crawl(url, visited, cache, output_dir, cache_file, max_depth=2, current_depth=0):
    """
    Crawl the given URL if not visited and save its data in a random folder.
    Recursively crawl linked pages up to max_depth.
    Stops if the global crawl_count reaches CRAWL_LIMIT.
    """
    global crawl_count
    if crawl_count >= CRAWL_LIMIT:
        return

    if current_depth > max_depth:
        return

    # Normalize the URL (remove trailing slashes, etc.)
    normalized_url = url.rstrip('/')
    if normalized_url in visited or normalized_url in cache:
        return

    print(f"{'  ' * current_depth}Crawling: {normalized_url}")
    
    try:
        response = requests.get(normalized_url, timeout=10)
        if response.status_code != 200:
            print(f"{'  ' * current_depth}Failed to retrieve: {normalized_url} (Status code: {response.status_code})")
            return
        html = response.text
    except Exception as e:
        print(f"{'  ' * current_depth}Error fetching {normalized_url}: {e}")
        return

    # Process the page
    title, first_sentence = get_page_title_and_first_sentence(html)
    
    # Generate a random folder name using UUID.
    folder_name = str(uuid.uuid4())
    folder_path = os.path.join(output_dir, folder_name)
    os.makedirs(folder_path, exist_ok=True)
    
    # Write the information to a text file.
    info_file = os.path.join(folder_path, "info.txt")
    try:
        with open(info_file, "w", encoding="utf-8") as f:
            f.write(f"Website URL: {normalized_url}\n")
            f.write(f"Random Folder Name: {folder_name}\n")
            f.write(f"Page Title: {title}\n")
            f.write(f"First Sentence: {first_sentence}\n")
    except Exception as e:
        print(f"{'  ' * current_depth}Error writing info.txt for {normalized_url}: {e}")
    
    # Update the cache and visited sets.
    cache[normalized_url] = {"folder": folder_name, "title": title}
    visited.add(normalized_url)
    crawl_count += 1
    save_cache(cache, cache_file)
    
    # Stop if we've reached the crawl limit.
    if crawl_count >= CRAWL_LIMIT:
        print("Reached maximum crawl limit.")
        return

    # Parse and crawl links found on the page.
    soup = BeautifulSoup(html, 'html.parser')
    links = soup.find_all('a', href=True)
    
    for link in links:
        if crawl_count >= CRAWL_LIMIT:
            break
        href = link.get('href')
        # Resolve relative URLs.
        full_url = urljoin(normalized_url, href)
        # Only consider http(s) URLs.
        if full_url.startswith("http"):
            # Optionally, you could restrict to the same domain:
            # if urlparse(full_url).netloc != urlparse(normalized_url).netloc:
            #     continue
            # Respect polite crawling: add a short delay.
            time.sleep(0.5)
            crawl(full_url, visited, cache, output_dir, cache_file, max_depth, current_depth + 1)

# ------------------------------
# Zipping the output folder
# ------------------------------

def zip_output_folder(output_dir, zip_filename):
    """
    Compress the entire output_dir into a zip file.
    """
    print(f"Compressing the output folder '{output_dir}' into '{zip_filename}'...")
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(output_dir):
            for file in files:
                # Create complete filepath of file in directory.
                filepath = os.path.join(root, file)
                # Write the file into the zip, preserving the folder structure.
                arcname = os.path.relpath(filepath, os.path.dirname(output_dir))
                zipf.write(filepath, arcname)
    print("Compression complete.")

# ------------------------------
# Main function
# ------------------------------

def main():
    # Read seed websites from 'urls_to_crawl.txt'
    seed_file = "urls_to_crawl.txt"
    if not os.path.exists(seed_file):
        print(f"Seed file '{seed_file}' not found. Please create a file with seed URLs, one per line.")
        return

    with open(seed_file, "r", encoding="utf-8") as f:
        seed_websites = [line.strip() for line in f if line.strip() and line.strip().startswith("http")]

    if not seed_websites:
        print("No valid seed URLs found in the seed file.")
        return

    # Set up the output directory and cache file.
    output_dir = "crawled_data"
    os.makedirs(output_dir, exist_ok=True)
    cache_file = os.path.join(output_dir, "cache.json")
    cache = load_cache(cache_file)
    
    # Use a set to track visited URLs during this run.
    visited = set()
    
    # Start crawling from each seed website.
    for website in seed_websites:
        if crawl_count >= CRAWL_LIMIT:
            break
        crawl(website, visited, cache, output_dir, cache_file, max_depth=1)  # Adjust max_depth as desired

    # After crawling, compress the output folder.
    zip_filename = "crawled_data.zip"
    zip_output_folder(output_dir, zip_filename)

if __name__ == "__main__":
    main()

