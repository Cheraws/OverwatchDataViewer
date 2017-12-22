import Post from './models/post';
import Content from './models/content';
import React from 'react';
import {Text} from 'react-native';
export default function () {
  Post.count().exec((err, count) => {
    if (count > 0) {
      console.log("count is greater than 0");
      return;
    }
     
    let characterDictionary = {
      "D.Va":"#FFB6C1",
      "Tracer":"#FFA500",
      "Zenyatta":"#F5DEB3",
      "Roadhog":"#A52A2A",
      "Zarya":"#FF1493",
      "Mercy":"#FAFAD2",
      "McCree":"#FF0000",
      "Genji":"#ADFF2F",
      "Ana":"#0000FF",
      "Junkrat":"	#FF8C00",
      "Widowmaker":"#9370DB",
      "Orisa":"#66CDAA",
      "Soldier76":"#191970",
      "Doomfist":"#FFEBCD",
      "Reaper":"#000000",
      "Reinhardt":"#808080",
      "Torbjörn":"#8B0000",
      "Pharah":"#0000CD",
      "Winston":"	#D3D3D3",
      "Moira":"#BA55D3",
      "Sombra":"#FF00FF",
      "Lúcio":"#9ACD32",
      "Hanzo":"#FFFF00",
      "Mei": "#ADD8E6",
      "Bastion": "#D3D3D3",
      "Symmetra":"#E0FFFF"
    }
    
    const content1 = `Hi, I grabbed some data in order to investigate the effect of one tricks and mains on the meta. Some details about the graphs: \n
                      1.  Most of the data I grabbed was from the website overlog.gg; as a result, most of the players in the data are in the PC-kR server. \n
                      2.  The data is measured from a range of grandmasters to mid diamond. \n
                      3.  The way that the game measures winrates can create some inaccuracies, given that wins seem to be based on percentage of game played. \n
                      4.  The data is based on pure W/L, not taking into game time. \n
                      The percentage of mains is shown below, defined by over a 50 percent playrate.
                      `;

    const content2 =  ` As we can see, while there is a significant number of mercy mains, the number is not more than half. Genji and Dva seem to be the next most popular characters. Winston rounds out as the most popular main tank. In comparison, the number of one tricks, defined as over 80 percent playrate, is shown below.`;


    let label1 = ['Bastion', 'Sombra', 'Orisa', 'Reaper', 'Torbjörn', 'Doomfist', 'Mei', 'Symmetra', 'Soldier76', 'Pharah', 'Hanzo', 'Moira', 'Lúcio', 'Reinhardt', 'Zarya', 'Junkrat', 'Roadhog', 'Widowmaker', 'Tracer', 'Winston', 'McCree', 'Zenyatta', 'Ana', 'Genji', 'D.Va', 'Mercy'];
    let number1 = [15, 16, 27, 28, 40, 44, 46, 62, 83, 90, 118, 119, 128, 156, 174, 252, 262, 296, 360, 402, 462, 504, 547, 654, 711, 2889];

    const text1 = new Content({text:content1});
    text1.graphData.labels = label1;
    text1.graphData.numbers = number1;
    text1.graphData.title = "Mains";

    let label2 = ['Bastion', 'Sombra', 'Doomfist', 'Reaper', 'Pharah', 'Soldier76', 'Orisa', 'Torbjörn', 'Zarya', 'Mei', 'Moira', 'Reinhardt', 'Hanzo', 'Winston', 'Symmetra', 'Lúcio', 'Tracer', 'McCree', 'Roadhog', 'Zenyatta', 'Widowmaker', 'Genji', 'Junkrat', 'Ana', 'D.Va', 'Mercy'];
    let number2 = [5, 7, 9, 11, 14, 15, 15, 18, 19, 21, 27, 29, 35, 38, 38, 39, 49, 59, 67, 71, 72, 77, 87, 96, 154, 1543];

    const text2 = new Content({text:content2});
    text2.graphData.labels = label2;
    text2.graphData.numbers = number2;
    text2.graphData.title = "One Tricks";

    const subtext1 = "Running some numbers on one-tricks and mains based on some data"
    const post1 = new Post({ 
      name: 'Cheraws', 
      title: 'One Tricks', 
      slug: 'one-tricks', 
      cuid: 'cikqgkv4q01ck7453ualdn3hd', 
      content: [text1,text2],
      subtext: subtext1, 
      });

    Post.create([post1], (error) => {
      if (!error) {
         console.log('starter data created');
      }
    });
  });
}
