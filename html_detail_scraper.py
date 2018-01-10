from bs4 import BeautifulSoup
import requests
import collections
import  time 
import json
import numpy as np

from multiprocessing.dummy import Pool as ThreadPool
from pathlib import Path

def RepresentsInt(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False

'''
Goes through scraped HTMLS and gathers data.
Three termination cases.
    1. player_id has already been inserted.
    2. The player is unranked.
    3. The player hasn't played recently
'''
def scraper(worker):
    game_count = dict()
    data_points = []
    for value in csv_list:
        game_count[value] = "0:0"
    players = 0
    missed = 0
    empty_entries = 0
    entries = 0
    for i in range(10, 14):
        empty_entries = 0
        start_time = time.time()
        print(str(worker) + "," + str(i));
        npy_path = npy + str(worker) + "_" + str(i) + ".npy"
        link_path = Path(npy_path);
        if not link_path.is_file():
            print("invalid " + npy_path);
            continue
        links = np.load(npy_path);
        for link in links:
            player_page = BeautifulSoup(link,"html5lib")
            game_count = dict.fromkeys(game_count,"0:0")
            dates = player_page.find(class_ = 'highcharts-axis-labels highcharts-xaxis-labels')
            player_id = player_page.find('div',id='PlayerLayoutHeader')['data-uid']
            if not dates:
                missed += 1
                continue
            else:
                graph_data_w = player_page.find(class_ = 'highcharts-series highcharts-series-1 highcharts-tracker')
                graph_data_w = graph_data_w.find_all('rect')
                graph_data_l = player_page.find(class_ = 'highcharts-series highcharts-series-2 highcharts-tracker')
                graph_data_l = graph_data_l.find_all('rect')
                played_recently = False
                for x in range(len(dates.text)//11):
                    dates_text = dates.text
                    start = x*11
                    end = start + 6
                    day,month = dates_text[start:start+2],dates_text[start+3:end]
                    wins = graph_data_w[x]
                    losses = graph_data_l[x]
                    if month in ['Dec','Nov']:
                        if int(wins['height']) > 0 or int(losses['height']) > 0:
                            played_recently = True
                if not played_recently:
                    missed += 1
                    continue
            rank = player_page.find('div', class_='SkillRating')
            game_count["rank"] = rank.text.strip().split()[1][0:5].replace(",","")
            if not RepresentsInt(game_count["rank"]):
                missed += 1
                continue
            games = False
            #gathering hero data
            # if 50 consecutive entries then have been blocked. Skip.
            data_points += [player_id]
            players += 1
        end_time = time.time()
        print("takes " + str(end_time - start_time) + " seconds for pool" + str(worker))
    print(str(players) + " players inserted at worker " + str(worker))
    print(str(missed) + " players missed")
    return data_points


file_name = input("Please insert the name of the csv you are creating \n");

path = 'data/' + file_name + '.txt'
link_path = Path(path);
print(path)
if link_path.is_file():
    print("file exists");
    quit()

csv = open(path, "w")
character_list = open("characters","r")
game_count = dict()
data_points = []
columnTitleRow = ""
csv_list = []
for character in character_list:
    csv_list += [character.strip()]

csv_list += ["hours"]
csv_list += ["rank"]
csv_list += ["id"]

starts = [0,1,2,3,4,5,6,7]
pool = ThreadPool(8)
npy = "scraped/try_2/html_file_"
points = pool.map(scraper,starts);
for worker in points:
    data_points += worker
pool.close()

print(len(data_points))
ids = set()
for player in data_points:
    if player in ids:
        continue
    ids.add(player)
    csv.write(player + "\n")

print(len(ids))

