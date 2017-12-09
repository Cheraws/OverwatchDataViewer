# -*- coding: utf-8 -*-
import csv
import collections
import matplotlib.pyplot as plt
import numpy as np
import unicodedata
from collections import namedtuple

first = True
category = []
WL =  open('data/WL.csv', 'w')
count = 0
with open('data/data.csv', 'r') as csvfile:
    spamreader = csv.reader(csvfile)
    category = []
    for row in spamreader:
        if first:
            for index, character in enumerate(row):
                if index <= 25:
                    character = character.replace(':', '')
                    character = character.replace(' ', '')
                    category += [character+"W",character+"L"]
            category += ["rank"]
            print(category)
            WL.write(",".join(category)+"\n")
            first = False
        else:
            values = []
            games = 0
            count += 1
            if count % 1000 == 0:
                print("1000 entries");
            for index, score in enumerate(row):
                if index <= 25:
                    wins, losses = score.split(":")
                    values += [wins]
                    values += [losses]
            values += [row[28]]
            WL.write(",".join(values)+"\n")
