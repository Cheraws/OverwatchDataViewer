import React, { PropTypes } from 'react';
import {Doughnut,Pie,Bar} from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

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
let DPS = ['Doomfist', 'Genji', 'McCree', 'Pharah', 'Reaper', 'Soldier76', 'Sombra', 'Tracer','Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Torbjörn', 'Widowmaker'];
let Tanks = ['D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Winston', 'Zarya'];
let Supports = ['Ana', 'Lúcio', 'Mercy', 'Moira', 'Symmetra', 'Zenyatta'];

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

function specificData(key,dataDict){
  let characters = [];
  let numbers = [];
  console.log(DPS);
  switch(key) {
    case "All":
      for (let character in dataDict){
        characters.push(character);
        numbers.push(dataDict[character]);
      }
      break;
    case "DPS":
      for (let character of DPS){
        console.log(character);
        characters.push(character);
        numbers.push(dataDict[character]);
      }
      break;
    case "Tanks":
      for (let character of Tanks){
        characters.push(character);
        numbers.push(dataDict[character]);
      }
      break;
    case "Support":
      for (let character of Supports){
        characters.push(character);
        numbers.push(dataDict[character]);
      }
      break;
  }
  const data = {
    labels: characters,
    datasets: [{
      data: numbers,
      backgroundColor:colorAssignment(characters)
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
  let dataDict = {}
  for (let i = 0; i < graphData.labels.length; i++) { 
    dataDict[graphData.labels[i]] = graphData.numbers[i];
  }
  console.log(dataDict);
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
          <DropdownButton title="all" id="bg-nested-dropdown">
            <MenuItem eventKey="DPS">DPS</MenuItem>
            <MenuItem eventKey="Support">Support</MenuItem>
            <MenuItem eventKey="Tanks">Tanks</MenuItem>
          </DropdownButton>
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

export class Graph extends React.Component {
  
  constructor(props) {
    console.log(props);
    console.log("props above me");
    super(props);
    let dataDict = {}
    for (let i = 0; i < props.data.labels.length; i++) { 
      dataDict[props.data.labels[i]] = props.data.numbers[i];
    }
    const graphData = props.data;
    const data = {
      labels: graphData.labels,
      datasets: [{
        data: graphData.numbers,
        backgroundColor:colorAssignment(graphData.labels)
      }]
    };
    this.state = {data:data, graphData: props.data, dataDict: dataDict, title: "All" };
  }
  handleSelect = (evt) => {
    console.log(evt)
    console.log(this);
    console.log("material below");
    let data = specificData(evt,this.state.dataDict);
    console.log(data);
    this.setState({title: evt, data: data});
  }

  render() {
  let graphData = this.state.graphData;
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
          <DropdownButton title={this.state.title} id="bg-nested-dropdown" onSelect={this.handleSelect}>
            <MenuItem eventKey="All">All</MenuItem>
            <MenuItem eventKey="DPS">DPS</MenuItem>
            <MenuItem eventKey="Support">Support</MenuItem>
            <MenuItem eventKey="Tanks">Tanks</MenuItem>
          </DropdownButton>
          <Bar data={this.state.data}
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
  );
  }
}

