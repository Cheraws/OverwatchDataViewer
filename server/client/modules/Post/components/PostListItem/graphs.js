import React, { PropTypes } from 'react';
import {Doughnut,Pie,Bar} from 'react-chartjs-2';
import {RadialChart, Hint} from 'react-vis';
import { DropdownButton, MenuItem,Tab,Tabs } from 'react-bootstrap';
import styles from './PostListItem.css'
import 'bootstrap/dist/css/bootstrap.css'

let characterColors = {
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

let roleColors = {
  "DPS Mains":'rgba(114,147,203,1)',
  "Tank Mains":'rgba(225,151,76,1)',
  "Flex":'rgba(132,186,91,1)',
  "Support Mains":'rgba(211,94,96,1)',
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
  const colors = colorAssignment(newCharacters,'characters');
  const data =  {
    labels: newCharacters,
    datasets: [{
      data: newNumbers,
      backgroundColor: colors,
      hoverBackgroundColor: colors,
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


function colorAssignment(characters,dataType){
  let colors = [];
  let colorDictionary;
  if (dataType == 'characters'){
    colorDictionary = characterColors;
  }
  else{
    colorDictionary = roleColors;
  }
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
    //initial graph type
    let graphType = props.graphs[0].graphType 

    this.state = { title: "All" ,
                  mobile: mobile,
                  graphs: props.graphs,
                  graphType: graphType
                };
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    // Triggers a re-render
    if (window.outerWidth < 500){
      this.setState({
        mobile: true,
        width: window.outerWidth
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

  handleRoleSelect = (evt) => {
    this.setState((prevState, props) => ({
      title: evt,
    }));
  }
  handleGraphSelect = (evt) => {
    this.setState((prevState, props) => ({
      graphType: evt,
    }));
  }
  makeGraph = (graphType,graphData) => {

    let data;
    let datasets = [];
    if (graphData.dataType == "roles"){
       data =  {
        labels: graphData.labels,
        datasets: [{
          data: graphData.numbers,
          backgroundColor:colorAssignment(graphData.labels, "role"),
          hoverBackgroundColor: colorAssignment(graphData.labels, "role")
        }]
      };
    }
    else if (graphData.dataType == "variety"){
        data = {
          labels: graphData.labels,
        datasets: [{
          data: graphData.numbers,
          backgroundColor: [	'	#6495ED', '	#FF8C00', '	#228B22', '#F08080'],
          hoverBackgroundColor:[	'	#6495ED', '	#FF8C00', '	#228B22', '#F08080']
        }]
        }
    }
    else{
        //charaacter based.
        let dataDict = this.makeDataDict(graphData);
        data = specificData(this.state.title,dataDict);
    }
    
    if (graphData.data.length > 0){
      let barLabels = []
      for(let i = 0; i<graphData.data.length; i++){
        barLabels.push(graphData.data[i].barLabel[0])
      }
      let colors = colorAssignment(barLabels, "role")
      for(let i = 0; i < graphData.data.length; i++){
        let barColor = colors[i]
        let dataset = {data:graphData.data[i].numbers, 
          backgroundColor: colors[i],
          hoverBackgroundColor:  colors[i],
          label:graphData.data[i].barLabel}
        datasets.push(dataset);
      }
       data =  {
        labels: graphData.labels,
        datasets: datasets
      };
    }
    const barLegendOpts = {
      display: true,
      position: 'right',
      reverse: false,
    };
    if(this.state.mobile){
      barLegendOpts.position = 'bottom'
    }
    if(graphData.data.length == 0){
      barLegendOpts.display = false
    }
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
                labelString: graphData.y_axis
            }
        }],
        xAxes: [{
          display: true,
          ticks: {
            autoSkip: false
          },
          scaleLabel: {
              display: true,
              labelString: graphData.x_axis
          }
        }],
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
      //truncating the graph and turning it into a percentage.
      let oldNumbers = data.datasets[0].data
      let total = 0
      for(let i = 0; i< oldNumbers.length; i++){
        total += parseFloat(oldNumbers[i])
      }
      const numbers = data.datasets[0].data.map(x => Math.floor(x/total*1000)/1000);
      data.datasets[0].data = numbers
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
    let queues = []
    let graph;
    for(let i = 0; i < this.state.graphs.length; i++){
      let graphType = graphs[i].graphType
      let roleButton = ""
      let graphButton = ""
      if(graphs[i].data.length == 0){
        graphType = this.state.graphType
        graphButton = this.graphSelect()

      }
      graph = this.makeGraph(graphType,graphs[i])
      if(graphs[i].dataType == "content"){
        roleButton = (this.roleSelect())
      }

      let tab = {count:i,
                 title:graphs[i].tabTitle,
                 graph:graph,
                 roleButton:roleButton,
                 graphButton:graphButton
                }
      tabs.push(tab)
    }
    return (
    <Tabs defaultActiveKey={1} >
      {
        tabs.map(tab => (
          <Tab eventKey={tab.count+1} title={tab.title}>
            <div className={styles['button-left']}>{tab.roleButton}</div>
            <div className={styles['button-right']}>{tab.graphButton}</div>
            <div>{tab.graph}</div>
          </Tab>
        ))
      }
      </Tabs>
    )
  }

  graphSelect = () => {
    return(
        <DropdownButton title={this.state.graphType} id="bg-nested-dropdown" onSelect={this.handleGraphSelect}>
            <MenuItem eventKey="pie">pie</MenuItem>
            <MenuItem eventKey="bar">bar</MenuItem>
        </DropdownButton>
    );
  }

  roleSelect = () => {
    return(
        <DropdownButton title={this.state.title} id="bg-nested-dropdown" onSelect={this.handleRoleSelect}>
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

