import requests
from bs4 import BeautifulSoup

def fetch_description(word):
    # Define a helper function to generate the cleaned URL
    def construct_url(term):
        return f"https://medlineplus.gov/{term.lower().strip().replace(' ', '').replace('_', '')}.html"
    
    # Try the initial URL
    url = construct_url(word)
    response = requests.get(url)
    
    # If the initial URL is not valid, try splitting the word and trying each part
    if response.status_code != 200:
        # Split 'word' into parts based on underscores or spaces
        parts = word.replace('_', ' ').split()
        for part in parts:
            url = construct_url(part)
            response = requests.get(url)
            if response.status_code == 200:
                return f"Description found for: {part}\nURL: {url}"
        
        # If no valid URL is found
        return "No description found for this illness."
    
    # Return success for the initial URL
    return f"Description found for: {word}\nURL: {url}"



def scrape_summary(word):
    # Use the fetch_description function to get a valid URL or an error message
    description = fetch_description(word)
    
    # Check if the description contains an error message
    if "No description found" in description:
        return description
    
    # Extract the valid URL from the description
    url = description.split("URL: ")[1]
    
    # Send GET request to the valid URL
    response = requests.get(url)
    
    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Locate id "topic-summary" and class "syndicate"
    summary_section = soup.find('div', id='topic-summary', class_='syndicate')
    if not summary_section:
        return "No summary found in the topic-summary section."
    
    # Extract all text within the summary section
    results = ""
    print(f"Summary for {word}:\n")
    for content in summary_section.stripped_strings:
        results += '\n'
        results += content
    return results
