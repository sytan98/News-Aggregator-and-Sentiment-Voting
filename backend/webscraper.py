from bs4 import BeautifulSoup
from urllib import request 
import re

def get_page(url):
    # response = requests.get(url)
    # if response.status_code == 200:
    #     return response.content
    # else:
    #     return []
    """Returns html soup.
    """
    req = request.Request(url,headers={'User-Agent': 'Mozilla/5.0'})
    html = request.urlopen(req).read()
    soup = BeautifulSoup(html, "html.parser")
    return(soup)

def get_cna_headlines():
    soup = get_page("https://www.channelnewsasia.com/")
    div_container = soup.find('div', class_="section__content is-idle")

    headlines = []
    links = []
    for headline in div_container.find_all('a', class_='teaser__title'):
        headlines.append(headline.get_text()) 
        links.append('https://www.channelnewsasia.com' + headline['href'])
    
    return headlines, links

def get_mothership_headlines():
    soup = get_page("https://mothership.sg/")

    regex = re.compile('ind-article.*')
    section_container = soup.find('div', {'id':"latest-news"})  
    articles = section_container.find_all('div', class_=regex)  
    
    headlines = []
    links = []
    for div in articles:
        links.append(div.find('a')['href'])
        headlines.append(div.find('h1').get_text())

    return headlines, links

def get_straits_times():
    soup = get_page("https://www.straitstimes.com/container/custom-landing-page/breaking-news")
    
    div = soup.find("div", class_="region-inner")
    span = div.find_all("span", class_="story-headline")
    
    headlines = []
    links = []
    for headline in span:
        links.append('https://www.straitstimes.com' + headline.find('a')['href'])
        headlines.append(headline.find('a').get_text())
    
    return headlines, links

if __name__ == "__main__":
    print(get_cna_headlines())
    