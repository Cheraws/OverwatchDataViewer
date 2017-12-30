import Post from './models/post';
import Content from './models/content';
import React from 'react';
import {Text} from 'react-native';
export default function () {
  Post.remove(function(err,removed) {
    // where removed is the count of removed documents
  });
  Post.count().exec((err, count) => {
    if (count > 0) {
      console.log("count is greater than 0");
      return;
    }
    console.log("something is being made?");

    //post 1
    let contents = [];
    let text =     "Recently in Overwatch, there has been a long ongoing debate about the effects on ladder from people maining characters," +
      "especially those not in the meta. Maining a character is seen by many as the best way " +
      "to learn a character, while others just enjoy playing the character. A more extreme version would be seen as a one-trick, someone" +
      "who spends at least 80 percent of the time as that character. One tricks are especially seen as problems, particularly those that are " +
      "only useful in specific scenarios like the builders. I was curious as towards the proportion of people maining a character that one trick " +
      "and if specific characters are more likely to be one-tricked relative to being mained. I gathered some data utilizing overlog.gg, marking mains " +
      "as those who spend at least 50 percent playtime and one-tricks as 80 percent play time. \n \n" +
      `Some details about the graphs: 
    1.   Since overlog.gg is based in Korea, most of the players in the data are in the PC-kR server. 
      2.   Rank is not part of the analysis, but the ranks range from Top 500 to diamond. 
      3.   The way that the game measures winrates can create some inaccuracies, given that wins seem to be based on percentage of games played. 
      4.   The playtime is based on number of games played rather than the time spent, given the large variances based on map mode. 
      Now that we covered the basic information, let us first look at the main distribution.`;
    let content = new Content({type:"text", text:text});
    contents.push(content);
   


    let label = ['Bastion', 'Sombra', 'Orisa', 'Reaper', 'Torbjörn', 'Doomfist', 'Mei', 'Symmetra', 'Soldier76', 'Pharah', 'Hanzo', 'Moira', 'Lúcio', 'Reinhardt', 'Zarya', 'Junkrat', 'Roadhog', 'Widowmaker', 'Tracer', 'Winston', 'McCree', 'Zenyatta', 'Ana', 'Genji', 'D.Va', 'Mercy'];
    let number = [15, 16, 27, 28, 40, 44, 46, 62, 83, 90, 118, 119, 128, 156, 174, 252, 262, 296, 360, 402, 462, 504, 547, 654, 711, 2889];
    let graphData = {
      labels: label,
      numbers: number,
      title: "Mains"
    };
    content = new Content({type:"graph",graphData:graphData});
    contents.push(content);

    let title = "Mercy and Ana are the most popular supports to main"
    text =    "Mercy and Zen are considered the meta supports, but there are still " +
      "a good amount of Ana mains. Despite Korea's reputation for playing meta, " +
      "Ana is disproportionally represented relative to her reputation in the meta. " +
      "On the other hand, the supposedly meta-proof Lucio has received a severe drop " +      "in maining due to the rise of Mercy." +
      " Moira doesn't have very many who main her, due to being only a month old "+ 
      " and being outclassed by Mercy."
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);


    title = "Flanker DPS are popular to main, but aren't dominant"
    text =    "Genji has the highest pickrate among DPS, but he isn't significantly " +
      "above the runner up Mccree. Mccree's popularity may be due to zen and mercy " +
      "enabling him to 2 shot 200 hp squishies, providing burst damage in comparison " +
      "to the meta pick in the west, Soldier:76." +
      "Despite all the outcry about junkrat," +
      "it seems like he is only the 5th highest picked DPS. Tracer and widow round" +
      " out the other top picks, with the other picks being niche. "
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    label = ['Bastion', 'Sombra', 'Doomfist', 'Reaper', 'Pharah', 'Soldier76', 'Orisa', 'Torbjörn', 'Zarya', 'Mei', 'Moira', 'Reinhardt', 'Hanzo', 'Winston', 'Symmetra', 'Lúcio', 'Tracer', 'McCree', 'Roadhog', 'Zenyatta', 'Widowmaker', 'Genji', 'Junkrat', 'Ana', 'D.Va', 'Mercy'];
    number = [5, 7, 9, 11, 14, 15, 15, 18, 19, 21, 27, 29, 35, 38, 38, 39, 49, 59, 67, 71, 72, 77, 87, 96, 154, 1543];
    graphData = {
      labels: label,
      numbers: number,
      title: "one tricks"
    };  
    content = new Content({type:"graph",graphData:graphData});
    contents.push(content);

    const subtext1 = "Running some numbers on one-tricks and mains based on some data"
    const post1 = new Post({ 
      name: 'Cheraws', 
      title: 'One Tricks and Mains: Which Characters Are the Most Popular?', 
      slug: 'one-tricks', 
      cuid: 'cikqgkv4q01ck7453ualdn3hd', 
      content: contents,
      subtext: subtext1, 
    });
    Post.create([post1], (error) => {
      if (!error) {
        console.log('starter data created');
      }
      else{
        console.log(error);
        console.log("Data not created properly.");
      }
    });
  });
}
