import Post from './models/post';
import Content from './models/content';
import Graph from './models/graph';
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
    let graphs = [];
    //information for graph
    let label;
    let number;
    let graphData;
    let title;
    //putting in the object
    let content;
    let graph;
    //text object
    let text;
  
    graphs = []
    label = ['Tank','Support', 'DPS','Flex']
    number = [7820, 9869, 17393, 8751]
    graphData = {
      labels: label,
      numbers: number,
      title: "Mains",
      type: "roles",
      tabTitle :"All",
      graphType : "bar",
      dataType : 'roles'
    };
    graphs.push(graphData);
    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);


    text =     "Recently in Overwatch, there has been a long ongoing debate about the effects on ladder from people maining characters," +
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
    content = new Content({type:"text", text:text});
    contents.push(content);
   

    label = ['Bastion', 'Sombra', 'Orisa', 'Reaper', 'Torbjörn', 'Doomfist', 'Mei', 'Symmetra', 'Soldier76', 'Pharah', 'Lúcio', 'Moira', 'Hanzo', 'Zarya', 'Reinhardt', 'Junkrat', 'Widowmaker', 'Roadhog', 'Winston', 'Tracer', 'Zenyatta', 'McCree', 'Ana', 'D.Va', 'Genji', 'Mercy']
    number = [27, 27, 27, 44, 47, 59, 62, 63, 95, 131, 138, 172, 195, 244, 299, 306, 316, 372, 408, 418, 497, 619, 787, 869, 943, 3928]
    graphs = [];
    graphData = {
      labels: label,
      numbers: number,
      title: "Mains",
      tabTitle :"Bar",
      graphType : "bar",
      dataType : 'content'
    };
    graph = new Graph(graphData)
    graphs.push(graph)
    graphData = Object.assign({}, graphData)
    graphData.tabTitle = "Pie"
    graphData.graphType = "pie"
    graph = new Graph(graphData)
    graphs.push(graph)
    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);

    title = "Mercy and Ana are the most popular supports to main"
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

    graphs = []
    label = ['Bastion', 'Sombra', 'Doomfist', 'Reaper', 'Orisa', 'Torbjörn', 'Soldier76', 'Zarya', 'Mei', 'Pharah', 'Symmetra', 'Winston', 'Lúcio', 'Reinhardt', 'Moira', 'Tracer', 'Hanzo', 'Widowmaker', 'McCree', 'Roadhog', 'Zenyatta', 'Junkrat', 'Genji', 'Ana', 'D.Va', 'Mercy']
    number = [9, 10, 12, 14, 14, 18, 19, 24, 24, 27, 29, 30, 37, 46, 47, 59, 65, 68, 76, 76, 80, 90, 92, 116, 222, 1973]
    graphData = {
      labels: label,
      numbers: number,
      title: "One tricks",
      type: "multi"
    };
    graphData = Object.assign({}, graphData)
    graphData.tabTitle = "Bar"
    graphData.graphType = "bar"
    graphData.dataType = 'content'
    graph = new Graph(graphData)
    graphs.push(graph)

    graphData = Object.assign({}, graphData)
    graphData.tabTitle = "Pie"
    graphData.graphType = "pie"
    graphData.dataType = 'content'
    graph = new Graph(graphData)
    graphs.push(graph)
    content = new Content({type:"graph",graphs:graphs});
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

    contents = [];
    graphs = []

    //graph about play percentages.
    label = ['Tank','Support', 'DPS','Flex']
    number = [7820, 9869, 17393, 8751]
    graphData = {
      labels: label,
      numbers: number,
      title: "Role Mains",
      type: "roles",
      tabTitle :"All Ranks",
      graphType : "pie",
      dataType : 'roles'
    };
    graphs.push(graphData);
    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);

    graphs = [];
    label = ['Good', 'Bad', 'Decent']
    number = [0.36728552352565674, 0.10704715751308157, 0.5256673189612618]
    graphData = {
      labels: label,
      numbers: number,
      title: "Probability of getting a good comp",
      type: "extra",
      tabTitle :"All",
      graphType : "pie",
      dataType : 'variety'
    };
    graphs.push(graphData);
    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);


    graphs = [];
    label = ['Support','Tank', 'DPS']
    number = [7820, 9869, 17393, 8751]
    let labels = ['As Support','As Tank','As Flex','As DPS']
    let barNumbers = [[53.9, 47.8, 39.9],[48.7, 54.7, 41.6],[52.5, 53.6, 48.1],[49.4, 51.9, 52.6]]
    let bars = [];
    for(let i = 0; i< 4; i++){
      let numberObj = {
        barLabel: labels[i],
        numbers: barNumbers[i]
      }
      bars.push(numberObj);
    }

    graphData = {
      labels: label,
      numbers: number,
      data: bars,
      title: "Winrate on roles based on Main",
      type: "roles",
      tabTitle :"All",
      graphType : "bar",
      dataType : 'roles'
    };
    graphs.push(graphData);
    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);

    const post2 = new Post({ 
      name: 'Cheraws', 
      title: 'A look into Role Flexibility', 
      slug: 'role-flexibility', 
      cuid: 'cikqgkv4q01ck4453fbldn3hd', 
      content: contents,
      subtext: subtext1, 
    });



    Post.create([post2], (error) => {
      console.log("post 2 created");
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
