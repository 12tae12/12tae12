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
CRAWL_LIMIT = 100000
MAX_DEPTH = 1  # Adjust max depth as needed

# ------------------------------
# Helper functions for caching
# ------------------------------

def load_cache(cache_file):
    """Load the crawl cache from a JSON file."""
    default_cache = {
        'crawled': {},
        'queue': [],
        'crawl_count': 0
    }
    if os.path.exists(cache_file):
        try:
            with open(cache_file, 'r', encoding='utf-8') as f:
                loaded = json.load(f)
                # Ensure all keys are present
                for key in default_cache:
                    if key not in loaded:
                        loaded[key] = default_cache[key]
                return loaded
        except Exception as e:
            print(f"Error loading cache: {e}")
            return default_cache
    return default_cache.copy()

def save_cache(cache, cache_file):
    """Save the crawl cache to a JSON file."""
    try:
        with open(cache_file, 'w', encoding='utf-8') as f:
            json.dump(cache, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving cache: {e}")

# ------------------------------
# Page extraction
# ------------------------------

def get_page_title_and_first_sentence(html):
    """Extract title and first sentence from HTML."""
    soup = BeautifulSoup(html, 'html.parser')
    title = "No Title"
    if soup.title and soup.title.string:
        title = soup.title.string.strip()
    
    first_sentence = "No content found."
    for p in soup.find_all('p'):
        text = p.get_text().strip()
        if text:
            sentence_match = re.search(r'(.+?[.!?])(\s|$)', text)
            if sentence_match:
                first_sentence = sentence_match.group(1).strip()
            else:
                first_sentence = text[:100].strip()
            break
    return title, first_sentence

# ------------------------------
# Main crawling logic
# ------------------------------

def process_url(url, current_depth, output_dir, cache):
    """Process a single URL and return extracted links."""
    normalized_url = url.rstrip('/')
    print(f"Processing: {normalized_url} (Depth: {current_depth})")

    try:
        response = requests.get(normalized_url, timeout=10)
        if response.status_code != 200:
            print(f"Failed to retrieve: {normalized_url} (Status code: {response.status_code})")
            return []
        html = response.text
    except Exception as e:
        print(f"Error fetching {normalized_url}: {e}")
        return []

    title, first_sentence = get_page_title_and_first_sentence(html)
    
    # Create or reuse folder
    if normalized_url in cache['crawled']:
        folder_name = cache['crawled'][normalized_url]['folder']
    else:
        folder_name = str(uuid.uuid4())
        folder_path = os.path.join(output_dir, folder_name)
        os.makedirs(folder_path, exist_ok=True)
        
        # Write info file
        info_file = os.path.join(folder_path, "info.txt")
        try:
            with open(info_file, "w", encoding="utf-8") as f:
                f.write(f"Website URL: {normalized_url}\n")
                f.write(f"Random Folder Name: {folder_name}\n")
                f.write(f"Page Title: {title}\n")
                f.write(f"First Sentence: {first_sentence}\n")
        except Exception as e:
            print(f"Error writing info.txt: {e}")

    # Extract links
    soup = BeautifulSoup(html, 'html.parser')
    links = set()
    for link in soup.find_all('a', href=True):
        href = urljoin(normalized_url, link['href']).rstrip('/')
        if href.startswith('http'):
            links.add(href)
    
    # Update cache entry
    cache['crawled'][normalized_url] = {
        'folder': folder_name,
        'title': title,
        'depth': current_depth,
        'links': list(links)
    }
    
    return list(links)

# ------------------------------
# Zipping function
# ------------------------------

def zip_output_folder(output_dir, zip_filename):
    """Compress the output directory into a zip file."""
    print(f"Compressing {output_dir} to {zip_filename}...")
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(output_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, output_dir)
                zipf.write(file_path, arcname)
    print("Compression complete.")

# ------------------------------
# Main function
# ------------------------------

def main():
    # Configuration
    output_dir = "crawled_data"
    cache_file = os.path.join(output_dir, "cache.json")
    seed_file = "urls_to_crawl.txt"
    zip_filename = "crawled_data.zip"
    
    os.makedirs(output_dir, exist_ok=True)
    cache = load_cache(cache_file)
    
    # Initialize from seed URLs if queue is empty
    if not cache['queue']:
        if os.path.exists(seed_file):
            with open(seed_file, 'r') as f:
                seeds = [line.strip() for line in f if line.startswith('http')]
                cache['queue'] = [{'url': url, 'depth': 0} for url in seeds]
        else:
            print(f"Seed file {seed_file} not found!")
            return

    # Main processing loop
    while cache['queue'] and cache['crawl_count'] < CRAWL_LIMIT:
        item = cache['queue'].pop(0)
        url = item['url']
        current_depth = item['depth']
        
        if current_depth > MAX_DEPTH:
            continue
        
        normalized_url = url.rstrip('/')
        cached_entry = cache['crawled'].get(normalized_url)
        
        # Skip if already crawled at sufficient depth
        if cached_entry and cached_entry['depth'] >= current_depth:
            continue
        
        # Process the URL
        links = process_url(url, current_depth, output_dir, cache)
        cache['crawl_count'] += 1
        
        # Enqueue new links
        for link in links:
            cache['queue'].append({'url': link, 'depth': current_depth + 1})
        
        # Periodic cache save
        if cache['crawl_count'] % 50 == 0:
            save_cache(cache, cache_file)
            print(f"Progress: {cache['crawl_count']}/{CRAWL_LIMIT}")
        
        time.sleep(0.5)  # Politeness delay
    
    # Final cache save and zipping
    save_cache(cache, cache_file)
    zip_output_folder(output_dir, zip_filename)
    print(f"Crawling complete. Total crawled: {cache['crawl_count']}")

if __name__ == "__main__":
    main()
