import csv
import collections
first = True
character_mapping = dict()
mains = collections.defaultdict(int)
one_tricks = collections.defaultdict(int)
most_played = collections.defaultdict(int)
j = 0
with open('data.csv', 'r') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        if first:
            for index, i in enumerate(row):
                character_mapping[index] = i
            first = False
        else:
            j += 1
            score_list = []
            games = 0
            for index, score in enumerate(row):
                if index <= 25:
                    wins, losses = score.split(":")
                    score_total = int(wins) + int(losses)
                    games += score_total
                    score_list += [score_total]
            most_played_char = character_mapping[score_list.index(max((score_list)))]
            most_played[most_played_char] += 1
            if max(score_list) >= 0.5 * games:
                mains[most_played_char] += 1
            if max(score_list) >= 0.8 * games:
                one_tricks[most_played_char] += 1
mains_total = sum(mains.values())
one_tricks_total = sum(one_tricks.values())
most_played_total = sum(most_played.values())
print most_played_total
for character in sorted(mains,key=most_played.get):
    print character + "," + str(most_played[character]) + " players"
print "number of people who main someone is " + str(mains_total)
print "percent is " + str(mains_total/float(j)) + " percent"
print j
for character in sorted(mains,key=mains.get):
    print character + "," + str(mains[character]) + " players"
print "number of people who onetrick is " + str(one_tricks_total)
for character in sorted(one_tricks,key=one_tricks.get):
    print character + "," + str(one_tricks[character]) + " players"
    print "percentage is " + str((float(one_tricks[character])/one_tricks_total))
    

