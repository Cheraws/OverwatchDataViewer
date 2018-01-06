import React, { PropTypes } from 'react';
import {Doughnut,Pie,Bar} from 'react-chartjs-2';
import {RadialChart, Hint} from 'react-vis';
import { DropdownButton, MenuItem,Tab,Tabs } from 'react-bootstrap';
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
  let start = Math.max(0, length - 7);
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
    let mobile = false
    super(props);
    console.log("is the constructor running again?");
    this.state = {graphData: props.data, 
                  title: "All" ,
                  mobile: mobile,
                  graphs: props.graphs
                };
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    // Triggers a re-render
    if (window.outerWidth < 500){
      this.setState({
        mobile: true
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  //Update dimensions when the screen changes size.
  updateDimensions = () =>{
    if (window.outerWidth < 500){
      this.setState({
        mobile: true
      });
    } 
    else{
      this.setState({
        mobile: false
      });
    }
  }
  makeDataDict = (graphData) => {
    let dataDict = {}
    for (let i = 0; i < graphData.labels.length; i++) { 
      dataDict[graphData.labels[i]] = graphData.numbers[i];
    }
    return dataDict;
  }
  handleSelect = (evt) => {
    this.setState((prevState, props) => ({
      title: evt,
    }));
  }
  makeGraph = (graphType,graphData) => {

    let data;
    if (graphData.dataType == "roles"){
       data =  {
        labels: graphData.labels,
        datasets: [{
          data: graphData.numbers,
          backgroundColor: [	'	#6495ED', '	#FF8C00', '	#228B22', '#F08080']
        }]
      };
    }
    else{
        let dataDict = this.makeDataDict(graphData);
        data = specificData(this.state.title,dataDict);
    }
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

    const pieOptions = {
      title: {
        display: true,
        text: graphData.title,
        fontSize: 14
      }
    };
    const barOptions = {
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
      },
      responsive: true,
      maintainAspectRatio: true
    };
    let graph = <div></div>;
    if (graphType == "pie"){
      graph = <Pie data={data}
              legend={pieLegendOpts}
	            options={pieOptions}    
      />
    }
    else{
      graph = <Bar data={data}
              legend={barLegendOpts}
	            options={barOptions}    
            />
    }
    if(this.state.mobile == true){
      console.log("mobile object type");
      if (graphType == "pie"){
        graph = <Pie data={data}
              legend={pieLegendOpts}
	            options={pieOptions}    
              height={400}
              />
      }
      else{
         graph = <Bar data={data}
              legend={barLegendOpts}
	            options={barOptions}    
              height={400}
              />    
      }
        return(
          <div>
          <div></div>
            {graph}
          </div>
        );
    }
    return(
      <div>
      {graph}
      </div>
    );

  }
  comparisonGraph = () => {
    const graphs = this.state.graphs
    let tabs = []
    let graph;
    for(let i = 0; i < this.state.graphs.length; i++){
      graph = this.makeGraph(graphs[i].graphType,graphs[i])
      let tab = {count:i,title:graphs[i].tabTitle,graph:graph}           
      tabs.push(tab) 
      console.log(this.state.graphs.length);
    }
    return (
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      {
        tabs.map(tab => (
          <Tab eventKey={tab.count+1} title={tab.title}>
            <div>{this.roleSelect()}</div>
            <div>{tab.graph}</div>
          </Tab>
        ))
      }
      </Tabs>
    )
  }
  
  roleSelect = () => {
    return(
        <DropdownButton title={this.state.title} id="bg-nested-dropdown" onSelect={this.handleSelect}>
            <MenuItem eventKey="All">All</MenuItem>
            <MenuItem eventKey="DPS">DPS</MenuItem>
            <MenuItem eventKey="Support">Support</MenuItem>
            <MenuItem eventKey="Tanks">Tanks</MenuItem>
        </DropdownButton>
    );
  }

  render() { 
  let normalGraph;
  {
    normalGraph = this.comparisonGraph()
  }
    return (
      <div>
        {normalGraph}
      </div>
  );
  }
}

