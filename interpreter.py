# -*- coding: utf-8 -*-
import csv
import collections
import matplotlib.pyplot as plt
import numpy as np
from collections import namedtuple

first = True
character_mapping = dict()
mains = collections.defaultdict(int)
one_tricks = collections.defaultdict(int)
most_played = collections.defaultdict(int)
j = 0
main_win_loss = collections.defaultdict(lambda:[0,0])
secondary_win_loss = collections.defaultdict(lambda:[0,0])
with open('data/december_18_2017.csv', 'r') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        if first:
            for index, i in enumerate(row):
                if i == "Soldier: 76":
                    i = "Soldier76"
                character_mapping[index] = i
            first = False
        else:
            hasMain = False
            j += 1
            score_list = []
            ind_win_loss = {}
            games = 0
            for index, score in enumerate(row):
                character = character_mapping[index]
                if index <= 25:
                    wins, losses = score.split(":")
                    score_total = int(wins) + int(losses)
                    ind_win_loss[character] = [int(wins),int(losses)]
                    games += score_total
                    score_list += [score_total]
            most_played_char = character_mapping[score_list.index(max((score_list)))]
            most_played[most_played_char] += 1
            if max(score_list) >= 0.5 * games:
                hasMain = True
                mains[most_played_char] += 1
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

mains_total = sum(mains.values())
one_tricks_total = sum(one_tricks.values())
most_played_total = sum(most_played.values())
print most_played_total
for character in sorted(mains,key=most_played.get):
    wins = main_win_loss[character][0]
    losses = main_win_loss[character][1]
    main_winrate = float(wins)/(wins+losses)
    wins = secondary_win_loss[character][0]
    losses = secondary_win_loss[character][1]
    secondary_winrate = float(wins)/(wins+losses)
    difference = str((main_winrate - secondary_winrate) * 100)[:4]
    print character + "," + str(most_played[character]) + " players"
    print "winrate of main is " + str(main_winrate) + " vs nonmain at " + str(secondary_winrate)
    print "mains have a " + difference + " percent higher winrate"
print "number of people who main someone is " + str(mains_total)
print "percent of mains is " + str(mains_total/float(j)) + " percent"

print sorted(one_tricks,key=one_tricks.get)
print sorted(one_tricks.values())


print sorted(mains,key=mains.get)
print sorted(mains.values())

print one_tricks_total
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
