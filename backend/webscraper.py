from bs4 import BeautifulSoup
import requests
import re

def get_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.content
    else:
        return []

def get_cna_headlines():
    soup = BeautifulSoup(get_page("https://www.channelnewsasia.com/"), 'html.parser')
    div_container = soup.find('div', class_="section__content is-idle")

    headlines = []
    links = []
    for headline in div_container.find_all('a', class_='teaser__title'):
        headlines.append(headline.get_text()) 
        links.append('https://www.channelnewsasia.com' + headline['href'])
    
    return headlines, links

def get_mothership_headlines():
    soup = BeautifulSoup(get_page("https://mothership.sg/"), 'html.parser') 

    regex = re.compile('ind-article.*')
    section_container = soup.find('div', {'id':"latest-news"})  
    articles = section_container.find_all('div', class_=regex)  
    
    headlines = []
    links = []
    for div in articles:
        links.append(div.find('a')['href'])
        headlines.append(div.find('h1').get_text())

    return headlines, links

if __name__ == "__main__":
    print(get_cna_headlines())
    