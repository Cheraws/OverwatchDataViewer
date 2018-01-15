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
    //subtext
    let subtext;
  



    text =     "Recently in Overwatch, there has been a long ongoing debate about the effects on ladder from people maining characters," +
      " especially those not in the meta. Maining a character is seen by many as the best way" +
      " to learn a character, while others just enjoy playing the character. A more extreme version would be seen as a one-trick, someone" +
      " who spends at least 80" +"%" +" of the time as that character." + 
      ` 

      ` +
      "One tricks are seen as problems for the game, particularly those who are" +
      " only useful in specific scenarios like the builders. I was curious about the correlation between mains and the meta. I also wanted to see" +
      " if certain characters are more likely to be one tricked out of those who are mained.. I gathered some data utilizing overlog.gg, marking mains" +
      " as those who spend at least 50 percent playtime on a character and one-tricks as 80 percent play time. \n \n" +
      `Some details about the graphs: 
    1.   Since overlog.gg is based in Korea, most of the players in the data are in the PC-kR server. 
      2.   Rank is not part of the analysis, but the ranks range from Top 500 to diamond. 
      3.   The way that the game measures winrates can create some inaccuracies, given that wins seem to be based on percentage of games played. 
      4.   The playtime is based on number of games played rather than the time spent, given the large variances based on map mode. 
      Now that we covered the basic information, let us first look at the distribution among character mains.`;
    content = new Content({type:"text", text:text});
    contents.push(content);
   

    label = ['Bastion', 'Sombra', 'Orisa', 'Reaper', 'Torbjörn', 'Doomfist', 'Mei', 'Symmetra', 'Soldier76', 'Pharah', 'Lúcio', 'Moira', 'Hanzo', 'Zarya', 'Reinhardt', 'Junkrat', 'Widowmaker', 'Roadhog', 'Winston', 'Tracer', 'Zenyatta', 'McCree', 'Ana', 'D.Va', 'Genji', 'Mercy']
    number = [27, 27, 27, 44, 47, 59, 62, 63, 95, 131, 138, 172, 195, 244, 299, 306, 316, 372, 408, 418, 497, 619, 787, 869, 943, 3928]
    graphs = [];
    graphData = {
      labels: label,
      numbers: number,
      x_axis: "Character",
      y_axis: "numbers",
      title: "Mains",
      tabTitle :"All",
      graphType : "bar",
      dataType : 'content'
    };
    graph = new Graph(graphData)
    graphs.push(graph)
    //for GMS
    label = ['Bastion', 'Sombra', 'Hanzo', 'Torbjörn', 'Mei', 'Zarya', 'Reaper', 'Orisa', 'Soldier76', 'Symmetra', 'Doomfist', 'Reinhardt', 'Lúcio', 'Pharah', 'Moira', 'Ana', 'Widowmaker', 'Junkrat', 'McCree', 'Roadhog', 'Winston', 'Tracer', 'Genji', 'Zenyatta', 'D.Va', 'Mercy']
    number = [1, 3, 4, 4, 6, 6, 7, 7, 8, 9, 9, 14, 14, 14, 19, 28, 40, 54, 60, 60, 80, 87, 97, 156, 205, 477]
    graphData.tabTitle = "GM"
    graphData.labels = label
    graphData.numbers = number
    graph = new Graph(graphData)
    graphs.push(graph)

    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);

    title = "Mercy is the Most Popular Support to Main by Far"
    text =    "Mercy and Zen are considered the meta supports, but there are still " +
      " an odd number of Ana mains in general. Many players especially in the KR servers" +
      " seem to enjoy maining Ana. Unfortunately for these Ana mains, most of them disappear" +
      " by GM rank, being largely replaced by Zen mains. Lucio doesn't seem to provide enough" +
      " utility in the meta, while Moira is largely outclassed by Mercy."
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    title = "Mccree is Popular in Lower Ranks But Gets Overtaken by Tracer"
    text =    "Genji has the highest pickrate among DPS overall, but he isn't significantly " +
              " above the others for all ranks. Mccree and Tracer happen to be the runner ups. " +
              " Notably, Soldier 76 is very unpopular in Korea, not making top 5 in mained character in the DPS category." + 
              " If we limit our sample size to only GM players, Tracer becomes a more popular" +
              " character to main than Mccree, signifying she is indeed a character that scales well with skill." 
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    title = "Dva is Popular with Reinhardt Zarya Falling Out of Favor"
    text = "Dva is the clear favorite among tanks for all ranks, with Winston as the runner up." +
           " Her overall mobility and damage potential make her a good choice to main in most scenarios." +
           " As the rank goes up, Reinhardt mains and Zarya mains fall off from the meta. This may be" +
           " because in higher elos, the coordination of dive overwhelms the reliability of static tank strats." +
           " Hog seems to be the oddball out, maintaining a relatively steady main rate among all the ranks. " +
           " His independence from other tanks makes him a decent tank to main in the chaos of solo queue."
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    graphs = []
    label = ['Bastion', 'Sombra', 'Doomfist', 'Reaper', 'Orisa', 'Torbjörn', 'Soldier76', 'Zarya', 'Mei', 'Pharah', 'Symmetra', 'Winston', 'Lúcio', 'Reinhardt', 'Moira', 'Tracer', 'Hanzo', 'Widowmaker', 'McCree', 'Roadhog', 'Zenyatta', 'Junkrat', 'Genji', 'Ana', 'D.Va', 'Mercy']
    number = [9, 10, 12, 14, 14, 18, 19, 24, 24, 27, 29, 30, 37, 46, 47, 59, 65, 68, 76, 76, 80, 90, 92, 116, 222, 1973]
    graphData = {
      labels: label,
      numbers: number,
      title: "One tricks",
      x_axis: "Character",
      y_axis: "Numbers",
    };
    graphData = Object.assign({}, graphData)
    graphData.tabTitle = "All"
    graphData.graphType = "bar"
    graphData.dataType = 'content'
    graph = new Graph(graphData)
    graphs.push(graph)
    label = ['Hanzo', 'Zarya', 'Torbjörn', 'Sombra', 'Ana', 'Doomfist', 'Reinhardt', 'Lúcio', 'Pharah', 'Reaper', 'Orisa', 'Mei', 'Moira', 'Winston', 'Symmetra', 'McCree', 'Widowmaker', 'Roadhog', 'Zenyatta', 'Genji', 'Tracer', 'Junkrat', 'D.Va', 'Mercy']
    number = [1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 7, 8, 8, 11, 15, 16, 19, 22, 45, 287]
    graphData.tabTitle = "GM"
    graphData.labels = label
    graphData.numbers = number
    graph = new Graph(graphData)
    graphs.push(graph)

    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);

    subtext = "Running some numbers on one-tricks and mains based on some data"
    const post1 = new Post({ 
      name: 'Cheraws', 
      title: 'One Tricks and Mains: Which Characters Are the Most Popular?', 
      slug: 'one-tricks', 
      cuid: 'cikqgkv4q01ck7453ualdn3hd', 
      content: contents,
      subtext: subtext, 
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

    //Post 2 about percentage of who mains what
    contents = [];
    graphs = []

    
    text = 'While watching some of my favorite streamers,' +
      ' I noticed that a good amount of players were forced to play off roles' +
      ' that they were not very comfortable with . ' +
      ' Curious about their winrates on these offroles, I checked their profiles to' +
      ' investigate their winrates, trying to see some trend. I noticed a sizable' +
      ' decrease in winrate, even among the players famous for being flex players.'+
    `

    ` +
    'I decided to investigate a dataset of over 40,000 players to figure out how' +
    ' many mains there are of each role, where main is defined as over 50 percent' +
    ' played in the role. If a player did not fit this category, I categorized the player' +
    ' as a flex player. An overall distribution can be found below for all ranks'  +
    ' and GM. Data is primarily sourced from Overlog and is limited to Season 7.'

    content = new Content({type:"text", text:text});
    contents.push(content);
    //graph about play percentages.
    label = ['Tank Mains','Support Mains', 'DPS Mains','Flex']
    number = [7820, 9869, 17393, 8751]
    graphData = {
      labels: label,
      numbers: number,
      title: "Role Mains",
      type: "roles",
      x_axis: "roles",
      y_axis: "Number",
      tabTitle :"All",
      graphType : "pie",
      dataType : 'roles'
    };

    graphs.push(graphData);
    //creating a GM value
    graphData = Object.assign({}, graphData)
    number = [1059,1205,1986,727]
    graphData.numbers = number
    graphData.tabTitle = "GM"
    graphData.labels = label
    graph = new Graph(graphData)
    graphs.push(graph)

    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);

    title = "DPS is the most common category at all ranks"
    text = 'Close to 40 percent of people main DPS, and this does not seem to change' +
            ' as the ranks go up. This suggests that most of the people who main DPS' +
            ' stick to DPS while attempting to climbing ranks.'
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    title = "Flex players decrease as rank rises"
    text = 'In the overall graph, flex players make around 20' + '%' +
          ' of the population; however, in Grandmaster, the percentage falls to 15' +
          '%. Those who do stop flexing seem to become specialists in either Support or Tank' + 
          ' roles.'
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    title = 'So what does this mean for getting a good comp?'
    text = 'Normally a good' +
            ' comp is defined as having 2 tanks,2 DPS, and 2 support. In the graph below,' +
            ' I classified the 84 different possible comps from the 4 main types as three' +
            ' categories. Good means there are 2 players per role, Decent means that the most unfilled' +
            ' role is 1, while Bad means there is a role that is filled by 0 people. Flexes can fill' + 
            ' as any role in this example.'
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);



    graphs = [];
    label = ['Good', 'Bad', 'Decent']
    number = [0.36728552352565674, 0.10704715751308157, 0.5256673189612618]
    graphData = {
      labels: label,
      numbers: number,
      title: "Probability of Getting a Good Comp",
      x_axis: "Quality",
      y_axis: "Percentage",
      type: "extra",
      tabTitle :"All",
      graphType : "pie",
      dataType : 'variety'
    };
    graphs.push(graphData);


    graphData = Object.assign({}, graphData)
    number = [0.30697220801355185,0.1364173520667251,0.5566104399197233]
    graphData.tabTitle = "GM"
    graphData.labels = label
    graphData.numbers = number
    graph = new Graph(graphData)
    graphs.push(graph)

    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);
    
    title = 'Most comps are workable'
    text = 'The chance of a comp with a role completely unfilled is very low at 10 percent.' +
           ' While a slightly suboptimal comp is fairly common, the most common is 3 DPS, ' + 
           ' a support, a flex, and a tank player, making a very workable comp if the DPS player flexes. '
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    title = 'Higher Ranks Can Produce Worse Comps'
    text = 'With less flexes in higher ranks, compositions can be slightly less optimal.' +
           ' More people specialize, increasing the odds of getting suboptimal comps like 6 supports on the same' +
           ' team.'

    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    title = "So what happens when players play their offrole?"
    text = 'In over 50 percent of the comps, at least one player has to play an offrole. I calculated the overall win' +
           ' percentage by recording wins and total games for each player by role and then checking to see what role a player mained.' +
           ' Once I gathered all player info, I divided the total number of wins over games played for each main type playing a role.' +
            ' For example, I would check' +
           ' the winrate of supports mains when they play the tank category by adding their total games together. The results are shown below.'
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);
    graphs = [];
    label = ['Support','Tank', 'DPS']
    number = [7820, 9869, 17393, 8751]
    let labels = ['Support Mains','Tank Mains','Flex','DPS Mains']
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
      x_axis: "Role Being Played by Main",
      y_axis: "Percentage",
      title: "Winrate on Roles Based on Main",
      tabTitle :"All",
      graphType : "bar",
      dataType : 'roles'
    };
    graphs.push(graphData);
    graphData = Object.assign({}, graphData)
    barNumbers = [[54.0, 47.8, 39.1],[48.7, 55.1, 41.7],[53.1, 54.5, 49.7],[49.7, 52.6, 54.1]]
    bars = [];
    for(let i = 0; i< barNumbers.length; i++){
      let numberObj = {
        barLabel: labels[i],
        numbers: barNumbers[i]
      }
      bars.push(numberObj);
    }
    graphData.data = bars
    graphData.tabTitle = "GM"
    graphs.push(graphData);
    content = new Content({type:"graph",graphs:graphs});
    contents.push(content);
    subtext = "Examining how classes are mained and the effect on the game"

    title = 'Supports and Tank mains suffer most from playing DPS'
    text = 'When support and tank mains have to play DPS, their winrates are abysmal,' +
          ' sitting at around a 40 percent winrate for both. This suggests to me that DPS is the role that' +
          ' emphasizes specialization. Mechanics learned from support and tank do not replace putting in hours' +
          ' into DPS. There is no easy DPS for players to fill as, with all the winrates for them being below 50 percent.' +
          ' Oddly enough, despite Junkrat being known as an easy pick, he only has a 40 percent winrate when support mains play him.'

    content = new Content({type:"text", text:text,title:title});
    contents.push(content);
 
    title = 'DPS mains seem to be much more flexible'
    text = 'On the other hand, while DPS players have slightly worse winrates overall on their mains, they' +
           ' do not suffer nearly as much for flexing. DPS mains enjoy good winrates on Roadhog, Zarya, and' +
           ' Zenyatta, being able to transfer their aim fundamentals. DPS mains tend to have much worse winrates on' +
           ' Mercy, having a 48 percent winrate in comparison to 55 percent for support mains.'
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

 
    title = 'Flex mains have good winrates on Tank and Support with slightly worse winrates on DPS'
    text = 'True to their names, flex players tend to be able to play any role, having a much less drastic' +
           ' loss in winrate on DPS in comparison to Support and Tank mains. Meanwhile, they are able to maintain' +
           ' winrates in Support and Tank very close to those who main them.'

    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    title = 'Final Thoughts'
    text = 'Looking at these numbers, I do not think a role queue is drastically needed. Most of the time, a good comp' +
           ' can be obtained within matchmaking. What I worry more about is the ability of supports and tank mains to flex to' +
           ' DPS. For most of these mains, in order to learn DPS, they have to either severely tank their SR or create a smurf' +
           ' that is DPS only, hampering groups of people either way. Introducing more mechanically intensive supports and tanks' +
           ' could potentially alleviate this issue, but there is no easy solution.'
    content = new Content({type:"text", text:text,title:title});
    contents.push(content);

    subtext = "Examining how classes are mained and the effect on ranked"
    const post2 = new Post({ 
      name: 'Cheraws', 
      title: 'A Look into Role Flexibility and how It Affects Ranked', 
      slug: 'role-flexibility', 
      cuid: 'cikqgkv4q01ck4453fbldn3hd', 
      content: contents,
      subtext: subtext 
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
