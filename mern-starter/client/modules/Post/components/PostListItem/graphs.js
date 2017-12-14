import React, { PropTypes } from 'react';
import {Doughnut,Pie,Bar} from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function renderGraph(graphData){
  const data = {
    labels: graphData.labels,
    datasets: [{
      label: 'Overlog data',
      data: graphData.numbers,
      backgroundColor:graphData.colors
    }]
  };

  const legendOpts = {
    display: true,
    position: 'right',
    fullWidth: true,
    reverse: false,
  };
  const options = {
    scales: {
      yAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: 'Value'
          }
      }]
    }
  };
  return (
       <Tabs>
          <TabList>
            <Tab >Bar</Tab>
            <Tab >Doughnut</Tab>
          </TabList >
          <TabPanel >
            <Bar data={data}
             legend={legendOpts}
             options={options} />
          </TabPanel>
          <TabPanel>
            <Doughnut data={data}
             legend={legendOpts}/>
          </TabPanel>
        </Tabs>
  )
}

