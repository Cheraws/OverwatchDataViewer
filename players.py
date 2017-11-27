from bs4 import BeautifulSoup
import requests
import collections
import  time 
import json

start_time = time.time()
file = open("players", "w")
mains = collections.defaultdict(int)
character_list = open("characters","r")
game_count = dict()
csv_list = []
for character in character_list:
    game_count[character.strip()] = "0:0"
    csv_list += [character.strip()]
csv_list += ["hours"]
csv_list += ["rank"]
csv = open("players.csv", "w")
columnTitleRow = ""
for key in csv_list:
    columnTitleRow += key + ","
csv.write(columnTitleRow[:-1]+"\n")
for i in range(1, 300):
    print(str(i) + " page opened")
    leaderboard = requests.get("https://overlog.gg"
                               "/leaderboards/global/rank/" + str(i))
    leaderboard = BeautifulSoup(leaderboard.content,"html5lib")
    for link in leaderboard.find_all('a'):
        player = link.get('href')
        if player.startswith('/detail/'):
            player_page = requests.get("https://overlog.gg" + str(player))
            player_page = BeautifulSoup(player_page.content,"html5lib")
            table_body = player_page.find('tbody')
            rows = table_body.find_all('tr')
            #game_count = collections.defaultdict(int)
            game_count = dict.fromkeys(game_count,"0:0")
            '''
            for row in rows:
                count = 0
                # getting player information.
                cols = row.find_all('td')
                cols = [str(x.text.strip()) for x in cols][0:3]
                #cols[2] = ",".join(cols[2].split())
                for value in cols[2].split():
                    if value[~0] == 'W' or value[~0] == 'L':
                        count += int(value[0:len(value)-1])
                cols[2] = ",".join(cols[2].split())
                game_count[cols[0]] = count
            '''
            hours = player_page.find('div', class_='LastUpdated')
            game_count["hours"] = hours.text.strip()
            rank = player_page.find('div', class_='SkillRating')
            game_count["rank"] = rank.text.strip().split()[1][0:5].replace(",","")
            rank.text.strip().split()[1][0:5]
            heroes = player_page.find_all('td', class_="ContentCell ContentCell-Hero")
            for hero in heroes:
                attributes = []
                parent = hero.parent
                for attribute in parent.find_all('td'):
                    attributes += [attribute.text.strip()]
                game_count[attributes[0]] = attributes[1] + ":" + attributes[2]
            row = ""
            for key in csv_list:
                row += game_count[key] + ","
            csv.write(row[:-1]+"\n")
            #mains[max(game_count,key=game_count.get)] += 1
#print (mains)
print("--- %s seconds ---" % (time.time() - start_time))
