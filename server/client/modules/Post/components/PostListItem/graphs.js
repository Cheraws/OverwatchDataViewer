import React, { PropTypes } from 'react';
import {Doughnut,Pie,Bar} from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

let colorDictionary = {
  "D.Va":"#FFB6C1",
  "Tracer":"#FFA500",
  "Zenyatta":"#F5DEB3",
  "Roadhog":"#A52A2A",
  "Zarya":"#FF1493",
  "Mercy":"#F0E68C",
  "McCree":"#FF0000",
  "Genji":"#ADFF2F",
  "Ana":"#0000FF",
  "Junkrat":"	#FFA500",
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
  "Symmetra":"#E0FFFF",
  "Other":"#E6E6FA"
}

function simplifyPieData(graphData){
  const characters = graphData.labels.slice(21,26);
  const numbers = graphData.numbers.slice(21,26);
  characters.push("Other");
  const remainder = graphData.numbers.slice(0,21);
  let remainderValue = 0;
  for(let i = 0; i < 21; i++){
    remainderValue += parseInt(remainder[i]);
  }
  console.log(remainderValue);
  console.log("remainder value above");
  numbers.push(remainderValue);
  const colors = colorAssignment(characters);
  const data =  {
    labels: characters,
    datasets: [{
      data: numbers,
      backgroundColor: colors
    }]
  };
  return data;
}


function colorAssignment(characters){
  let colors = [];
  for (let character of characters){
    if (character in colorDictionary){
      colors.push(colorDictionary[character]);
    }
  }
  return colors;
}
  
export default function renderGraph(graphData){
  const data = {
    labels: graphData.labels,
    datasets: [{
      data: graphData.numbers,
      backgroundColor:colorAssignment(graphData.labels)
    }]
  };
  const pieData = simplifyPieData(graphData);
  const barLegendOpts = {
    display: false,
    position: 'right',
    reverse: false,
  };
  const pieLegendOpts = {
    display: true,
    position: 'bottom',
    fullWidth: true,
    reverse: false,
  };
  const options = {
    scales: {
      yAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: 'Number of Players'
          }
      }],
      xAxes: [{
        ticks: {
          autoSkip: false
        }
      }]
    },
    title: {
      display: true,
      text: graphData.title,
      fontSize: 14
    }
  };

  const pieOptions = {
    title: {
      display: true,
      text: graphData.title,
      fontSize: 14
    }
  };

  return (
       <Tabs>
          <TabList>
            <Tab >Bar</Tab>
            <Tab >Pie</Tab>
            <Tab>Full Pie</Tab>
          </TabList >
          <TabPanel >
            <Bar data={data}
             legend={barLegendOpts}
             options={options} />
          </TabPanel>
          <TabPanel>
            <Pie data={pieData}
             legend={pieLegendOpts}
             options={pieOptions}/>
          </TabPanel>
          <TabPanel>
            <Pie data={data}
             legend={pieLegendOpts}
             options={pieOptions}/>
          </TabPanel>
        </Tabs>
  )
}

