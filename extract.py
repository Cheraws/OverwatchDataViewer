import requests
from bs4 import BeautifulSoup

r = requests.get("https://overlog.gg/detail/overview/163212231225118187078138")
c = r.content
soup = BeautifulSoup(c)
heroes = soup.find_all('td', class_="ContentCell ContentCell-Hero")
for hero in heroes:
    parent = hero.parent
    for attribute in parent.find_all('td'):
        print str(attribute.text.strip())
