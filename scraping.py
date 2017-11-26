import requests
from bs4 import BeautifulSoup

r = requests.get("https://overlog.gg/detail/overview/163212231225118187078138")
#r = requests.get("https://overlog.gg/detail/overview/200255058205177114211055")
c = r.content
soup = BeautifulSoup(c)
table_body=soup.find('tbody')
rows = table_body.find_all('tr')
for row in rows:
    cols=row.find_all('td')
    cols=[str(x.text.strip()) for x in cols]
    cols[2] = "".join(cols[2].split())
    cols[3] = "".join(cols[3].split())
    print cols
    print "intermission"
