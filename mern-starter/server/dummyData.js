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

    const content2 =  ` As we can see, while there is a significant number of mercy mains, the number is not more than half. Genji and Dva seem to be \n
                        be the next most popular characters. Winston rounds out as the most popular main tank. \n
                        In comparison, the number of one tricks, defined as over 80 percent playrate, is shown below.
                      `;

    let number1 = [13, 18, 19, 26, 38, 41, 49, 50, 51, 76, 91, 110, 133, 164, 184, 241, 243, 246, 351, 368, 454, 461, 566, 662, 695, 3047]
    let label1 = ['Sombra', 'Reaper', 'Bastion', 'Orisa', 'Doomfist', 'Torbjörn', 'Symmetra', 'Moira', 'Mei', 'Soldier76', 'Pharah', 'Lúcio', 'Hanzo', 'Zarya', 'Reinhardt', 'Widowmaker', 'Roadhog', 'Junkrat', 'Tracer', 'Winston', 'Zenyatta', 'McCree', 'Ana', 'D.Va', 'Genji', 'Mercy']
    let color1 = []
    for (let character of label1){
      if (character in characterDictionary){
        color1.push(characterDictionary[character]);
      }
    }

    const text1 = new Content({text:content1})
    text1.graphData.labels = label1;
    text1.graphData.numbers = number1;
    text1.graphData.colors = color1;
    text1.graphData.title = "Main percentages";

    let label2 = ['Bastion', 'Sombra', 'Reaper', 'Doomfist', 'Moira', 'Orisa', 'Soldier76', 'Pharah', 'Mei', 'Torbjörn', 'Zarya', 'Reinhardt', 'Symmetra', 'Lúcio', 'Winston', 'Tracer', 'Hanzo', 'Roadhog', 'Widowmaker', 'McCree', 'Zenyatta', 'Junkrat', 'Genji', 'Ana', 'D.Va', 'Mercy']
    let number2 = [4, 5, 6, 12, 13, 14, 15, 17, 21, 21, 23, 28, 28, 31, 33, 35, 40, 58, 61, 62, 65, 76, 78, 95, 158, 1618]
    let color2 = []
    for (let character of label2){
      if (character in characterDictionary){
        color2.push(characterDictionary[character]);
      }
    }
    const text2 = new Content({text:content2})
    text2.graphData.labels = label2;
    text2.graphData.numbers = number2;
    text2.graphData.colors = color2;
    text2.graphData.title = "One Trick percentages";

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
