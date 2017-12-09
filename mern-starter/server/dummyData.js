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
    
    const content1 = `Hi, I grabbed some data in order to investigate the effect of one tricks and mains on the meta. Some Caveats. \n
                      1. Most of the data I grabbed was from the website overlog.gg; as a result, most of the players in the data are in the PC-kR server. \n
                      2. The data is measured from a maximum of top 500 to mid diamond. \n
                      3. The way that the game measures winrates can create some inaccuracies. 
                      `;
    
    let labels = ['Sombra', 'Reaper', 'Orisa', 'Bastion', 'Torbjörn', 'Symmetra', 'Doomfist', 'Mei', 'Moira', 'Soldier76', 'Pharah', 'Torbjörn', 'Hanzo', 'Zarya', 'Reinhardt', 'Junkrat', 'Widowmaker', 'Roadhog', 'Tracer', 'Winston', 'Zenyatta', 'McCree', 'Ana', 'D.Va', 'Genji', 'Mercy']
    let numbers = [4, 5, 6, 12, 13, 14, 15, 17, 21, 21, 23, 28, 28, 31, 33, 35, 40, 58, 61, 62, 65, 76, 78, 95, 158, 1618]
    let colors = []
    for (let character of labels){
      if (character in characterDictionary){
        colors.push(characterDictionary[character]);
      }
    }
    const text = new Content({text:content1})
    text.graphData.labels = labels;
    text.graphData.numbers = numbers;
    text.graphData.colors = colors;
    text.graphData.title = "One trick percentages";

    const subtext1 = "Running some numbers on one-tricks and mains based on some data"
    const post1 = new Post({ 
      name: 'Cheraws', 
      title: 'One Tricks', 
      slug: 'one-tricks', 
      cuid: 'cikqgkv4q01ck7453ualdn3hd', 
      content: text,
      subtext: subtext1, 
      text: [text],
      });

    Post.create([post1], (error) => {
      if (!error) {
         console.log('starter data created');
      }
    });
  });
}
