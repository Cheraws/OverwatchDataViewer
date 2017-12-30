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

function cleanData(characters,numbers){
  let length =  characters.length;
  let start = Math.max(0, length - 10);
  let newCharacters = [];
  let newNumbers = [];
  for(let j = start; j < length; j++){
    newCharacters.push(characters[j]);
    newNumbers.push(numbers[j]);
  }
  let remainder = 0;
  for(let k = 0; k < start; k++){
    remainder += parseInt(numbers[k]);
  }
  if(remainder > 0){
    newCharacters.push("Other");
    newNumbers.push(remainder);
  }
  const colors = colorAssignment(newCharacters);
  const data =  {
    labels: newCharacters,
    datasets: [{
      data: newNumbers,
      backgroundColor: colors
    }]
  };
  return data;
}

function specificData(key,dataDict){
  let characters = [];
  let number = [];
  switch(key) {
    case "All":
      for (let character in dataDict){
        characters.push(character);
        number.push(dataDict[character]);
      }
      break;
    case "DPS":
      for (let character in dataDict){
        if (DPS.includes(character)){
          characters.push(character);
          number.push(dataDict[character]);
        }
      }
      break;
    case "Tanks":
      for (let character in dataDict){
        if (Tanks.includes(character)){
          characters.push(character);
          number.push(dataDict[character]);
        }
      }
      break;
    case "Support":
      for (let character in dataDict){
        if (Supports.includes(character)){
          characters.push(character);
          number.push(dataDict[character]);
        }
      }
      break;
  }
  /*
  let data = {
    labels: characters,
    datasets: [{
      data: number,
      backgroundColor:colorAssignment(characters)
    }]
  };*/
  return cleanData(characters,number);
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
  

export class Graph extends React.Component {
  
  constructor(props) {
    super(props);
    console.log("is the constructor running again?");
    let dataDict = {}
    let graphData = props.data;
    for (let i = 0; i < props.data.labels.length; i++) { 
      dataDict[props.data.labels[i]] = props.data.numbers[i];
    }
    const data = {
      labels: props.data.labels.slice(),
      datasets: [{
        data: props.data.numbers.slice(),
        backgroundColor:colorAssignment(graphData.labels)
      }]
    };
   let pieData = {
      labels: props.data.labels.slice(),
      datasets: [{
        data: props.data.numbers.slice(),
        backgroundColor:colorAssignment(graphData.labels)
      }]
    };
    this.state = {graphData: props.data, dataDict: dataDict, title: "All" };
  }
  handleSelect = (evt) => {
    this.setState((prevState, props) => ({
      title: evt,
    }));
  }

  render() {
  console.log(window.height);
  console.log("height above me");
  const data = specificData(this.state.title,this.state.dataDict);
  const pieData = cleanData(this.state.graphData.labels,this.state.graphData.numbers);
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
      text: this.state.graphData.title,
      fontSize: 14
    },
    maintainAspectRatio: false
  };
  
  const pieOptions = {
    title: {
      display: true,
      text: this.state.graphData.title,
      fontSize: 14
    },
    responsive: true,
    maintainAspectRatio: true
  };

    return (
     <Tabs>
        <TabList>
          <Tab >Bar</Tab>
          <Tab>Pie</Tab>
        </TabList >
        <TabPanel >
          <DropdownButton title={this.state.title} id="bg-nested-dropdown" onSelect={this.handleSelect}>
            <MenuItem eventKey="All">All</MenuItem>
            <MenuItem eventKey="DPS">DPS</MenuItem>
            <MenuItem eventKey="Support">Support</MenuItem>
            <MenuItem eventKey="Tanks">Tanks</MenuItem>
          </DropdownButton>
          <Bar data={data}
           legend={barLegendOpts}
           options={options} />
        </TabPanel>

        <TabPanel>
          <DropdownButton title={this.state.title} id="bg-nested-dropdown" onSelect={this.handleSelect}>
            <MenuItem eventKey="All">All</MenuItem>
            <MenuItem eventKey="DPS">DPS</MenuItem>
            <MenuItem eventKey="Support">Support</MenuItem>
            <MenuItem eventKey="Tanks">Tanks</MenuItem>
          </DropdownButton>
          <Pie data={data}
           legend={pieLegendOpts}
           options={pieOptions}/>
        </TabPanel>
      </Tabs>
  );
  }
}

