# -*- coding: utf-8 -*-
import csv
import collections
import matplotlib.pyplot as plt
import numpy as np
from collections import namedtuple
from enum import Enum
import math
def combinations_without_replacement(bag,length):
    answer = []
    if length == 0 or len(bag) == 0:
        return []
    for i in range(length,-1, -1):
        start = [bag[0]] * i
        if i == length:
            answer += [start]
        for end in combinations_without_replacement(bag[1:],length - i):
            permutation = start + end
            answer += [permutation]
    return answer


text = str(input("enter the file you want to look at \n"))
path = 'data/' + text + '.csv'

first = True
character_mapping = dict()
mains = collections.defaultdict(int)
one_tricks = collections.defaultdict(int)
most_played = collections.defaultdict(int)
games = 0
no_games = 0
min_ranking = 5000
most_games = -1000
highest_id = ""
DPS = ['Doomfist', 'Genji', 'McCree', 'Pharah', 'Reaper', 'Soldier76', 'Sombra', 'Tracer','Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Torbjörn', 'Widowmaker'];
tanks = ['D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Winston', 'Zarya'];
supports = ['Ana', 'Lúcio', 'Mercy', 'Moira', 'Symmetra', 'Zenyatta'];
role_mains = {"DPS":0 , "Tank": 0, "Support": 0, "Flex": 0}
roles = ["DPS", "Tank","Support"]
role_win_loss = collections.defaultdict(int)
main_win_loss = collections.defaultdict(lambda:[0,0])
secondary_win_loss = collections.defaultdict(lambda:[0,0])
second_role = collections.defaultdict(dict)
for role in role_mains.keys():
    role_win_loss[role] = dict()
    for character_role in roles:
        role_win_loss[role][character_role] = [0,0]
total_players = 0
offrole_win_rates = {}
character_win_loss_by_role = dict()
with open(path, 'r') as csvfile:
    spamreader = csv.reader(csvfile)
    for row_index,row in enumerate(spamreader):
        if first:
            for index, character in enumerate(row):
                if character == "Soldier: 76":
                    character = "Soldier76"
                character_mapping[index] = character
            first = False
            for role in role_mains.keys():
                role_win_loss[role] = dict()
                character_win_loss_by_role[role] = dict()
                for character_role in roles:
                    role_win_loss[role][character_role] = [0,0]
                for index, character in enumerate(row):
                    if index == 26:
                        break
                    character_win_loss_by_role[role][character] = [0,0]
        else:
            hasMain = False
            rank = 0
            score_list = []
            char_games = {}
            ind_win_loss = {}
            games = 0
            count = 0
            count += 1
            ind_role_games = {'DPS': 0, 'Tank': 0, 'Support': 0}
            ind_role_win_loss = {'DPS': [0,0], 'Tank': [0,0], 'Support': [0,0], 'Mercy': [0,0],'Tracer':[0,0]}
            for index, score in enumerate(row):
                character = character_mapping[index]
                if index <= 25:
                    wins, losses = score.split(":")
                    score_total = int(wins) + int(losses)
                    ind_win_loss[character] = [int(wins),int(losses)]
                    char_win_loss = [int(wins),int(losses)]
                    char_games[character] = score_total
                    games += score_total
                    score_list += [score_total]
                    if character in DPS:
                        ind_role_games['DPS'] += score_total
                        total = ind_role_win_loss['DPS']
                        ind_role_win_loss['DPS'] = [x + y for x, y in zip(total, char_win_loss)]
                    if character in supports:
                        ind_role_games['Support'] += score_total
                        total = ind_role_win_loss['Support']
                        ind_role_win_loss['Support'] = [x + y for x, y in zip(total, char_win_loss)]
                    if character in tanks:
                        ind_role_games['Tank'] += score_total
                        total = ind_role_win_loss['Tank']
                        ind_role_win_loss['Tank'] = [x + y for x, y in zip(total, char_win_loss)]
                if index == 27:
                    rank = int(score)
            min_ranking = min(rank, min_ranking)
            if games > most_games:
                most_games = games
                highest_id = row[28]
            most_games = max(most_games,games)
            main_role = max(ind_role_games, key=ind_role_games.get)
            total_players += 1
            #Most_played_char = character_mapping[score_list.index(max((score_list)))]
            #most_played_char = max(char_games, key=char_games.get)
            sorted_chars = sorted(char_games, key=char_games.get)
            most_played_char = sorted_chars[25]
            second_played_char = sorted_chars[24]
            if (char_games[second_played_char] > 0):
                if second_played_char not in second_role[most_played_char]:
                    second_role[most_played_char][second_played_char] = 0
                second_role[most_played_char][second_played_char] += 1
            most_played[most_played_char] += 1
            if max(score_list) >= 0.5 * games:
                hasMain = True
                mains[most_played_char] += 1
                #make sure second role isn't just 0 games
                if max(score_list) >= 0.8 * games:
                    one_tricks[most_played_char] += 1
            for character in ind_win_loss:
                wins = ind_win_loss[character][0]
                losses = ind_win_loss[character][1]
                if character == most_played_char and hasMain:
                    main_win_loss[character][0] += wins
                    main_win_loss[character][1] += losses
                else:
                    secondary_win_loss[character][0] += wins
                    secondary_win_loss[character][1] += losses

            # mark role and add stuff to it.
            if ind_role_games[main_role] > 0.5 * games:
                role_mains[main_role] += 1
            else:
                main_role = 'Flex'
                role_mains['Flex'] += 1

            #recording character win rates by class.
            for character in character_win_loss_by_role[main_role]:
                total = character_win_loss_by_role[main_role][character]
                temp = ind_win_loss[character]
                character_win_loss_by_role[main_role][character] = [x + y for x, y in zip(total, temp)]

            for role in roles:
                total = role_win_loss[main_role][role]
                temp = ind_role_win_loss[role]
                role_win_loss[main_role][role] = [x + y for x, y in zip(total, temp)]

print(str(no_games) + " players with no games" )
print(total_players )
mains_total = sum(mains.values())
one_tricks_total = sum(one_tricks.values())
most_played_total = sum(most_played.values())

'''
for character in sorted(mains,key=most_played.get):
    wins = ain_win_loss[character][0]
    losses = main_win_loss[character][1]
    main_winrate = float(wins)/(wins+losses)
    wins = secondary_win_loss[character][0]
    losses = secondary_win_loss[character][1]
    secondary_winrate = float(wins)/(wins+losses)
    difference = str((main_winrate - secondary_winrate) * 100)[:4]
    print (character + "," + str(most_played[character]) + " players")
    print ("winrate of main is " + str(main_winrate) + " vs nonmain at " + str(secondary_winrate))
    print ("mains have a " + difference + " percent higher winrate")
'''

print ("number of people who main someone is " + str(mains_total))
print ("percent of mains is " + str(mains_total/float(total_players)) + " percent")

#values of one tricks a
print (sorted(one_tricks,key=one_tricks.get))
print (sorted(one_tricks.values()))

#values of mains 
print (sorted(mains,key=mains.get))
print (sorted(mains.values()))

print (one_tricks_total)
print (role_mains)

print("Min rank is {0}".format(min_ranking))
print("Most games is {0} from id {1}".format(most_games,highest_id))

#calculate winrates of players based on main role and actual role played
for main_role in role_win_loss.keys():
    print("For winrates in the {0} class".format(main_role))
    winrate_dict = role_win_loss[main_role]
    role_list = []
    role_values = []
    for secondary_role in winrate_dict.keys():
        role_list += [secondary_role]
        wins,losses = winrate_dict[secondary_role]
        ratio = int(wins/(wins+losses) * 1000)/10
        role_values += [ratio]
        print('Player winrate on {0} role is {1}'.format(secondary_role, ratio))
    print( role_list, role_values)


for main_role in role_win_loss.keys():
    print("For winrates in the {0} class by character".format(main_role))
    winrate_dict = character_win_loss_by_role[main_role]
    for character in winrate_dict.keys():
        wins,losses = winrate_dict[character]
        ratio = int(wins/(wins+losses) * 1000)/10
        print('Player winrate on character {0} is {1}'.format(character, ratio))

role_percentages = {}
for role in role_mains:
    role_percentages[role] = role_mains[role]/total_players
print(list(role_mains.keys()))
possibilities = combinations_without_replacement(list(role_mains.keys()),6)
print("Number of possibilities is {0}".format(len(possibilities)))


comp_quality = {"good": 0, "bad": 0 , "decent": 0}
class Roles(Enum):
    DPS = 0
    SUPPORT = 1
    TANK = 2

total_prob = 0
max_prob = -1
most_common = []
for comp in possibilities:
    total_prob 
    character_roles = [0,0,0]
    flexes = 0
    comp_prob = 1
    combinations = math.factorial(6)
    for role in comp:
        comp_prob = comp_prob * role_percentages[role]
        if role == 'DPS':
            character_roles[Roles.DPS.value] += 1
        elif role == 'Support':
            character_roles[Roles.SUPPORT.value] += 1
        elif role == 'Tank':
            character_roles[Roles.TANK.value] += 1
        else:
            flexes += 1
    for number in character_roles:
        combinations /= math.factorial(number)
    combinations /= math.factorial(flexes)
    comp_prob *= combinations
    if comp_prob > max_prob:
        max_prob = comp_prob
        most_common = comp
    while(min(character_roles) < 2 and flexes > 0):
        needed_role = character_roles.index(min(character_roles))
        character_roles[needed_role] += 1
        flexes -= 1
    worst_role = min(character_roles)
    if worst_role == 0:
        comp_quality['bad'] += comp_prob
    elif worst_role == 1:
        comp_quality['decent'] += comp_prob
    else:
        comp_quality['good'] += comp_prob

print(role_percentages)
print(most_common)
print(comp_quality)

for role in second_role:
    other_chars = second_role[role]
    secondary = max(other_chars, key=other_chars.get)
    #print(sum(other_chars.values()), mains[role]) 
    print("Prefered second role of {0} is {1}".format(role,secondary))
    #for character in sorted(other_chars,key=other_chars.get):
        #print("{0} has {1} players playing as {2}".format(role,other_chars[character],character))

'''
for character in sorted(mains,key=mains.get):
    print character + "," + str(mains[character]) + " players"
print "number of people who onetrick is " + str(one_tricks_total)
for character in sorted(one_tricks,key=one_tricks.get):
    print character + "," + str(one_tricks[character]) + " players"
    print "percentage is " + str((float(one_tricks[character])/one_tricks_total))

#graphing number of mains
fig1, ax1 = plt.subplots()
labels = ["God1","god2"]
keys = map(lambda x:unicode(x,"utf-8") ,mains.keys())
sorted_mains = sorted(mains, key=mains.__getitem__)
keys = map(lambda x:unicode(x,"utf-8") ,sorted_mains)
y_pos = np.arange(len(sorted_mains))
plt.bar(y_pos,sorted(mains.values()),0.5,alpha = 1, align = 'center')
plt.xticks(y_pos,keys)
plt.xticks(rotation=90)
plt.tight_layout()
plt.show()
'''
