import React, { Component } from "react";
import CaffeineSummary from './CaffeineSummary';
import {Link, Route} from 'react-router-dom'


// import CustomLineDot from "./CustomLineDot";
// import { changeNumberOfData } from "./utils";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceDot,
  Tooltip,
  CartesianGrid,
  Legend,
  Brush,
  ErrorBar,
  AreaChart,
  Area,
  Label,
  LabelList
} from "recharts";
import { scalePow, scaleLog } from "d3-scale";
import axios from "axios";

class CaffeineGraph extends React.Component {
  constructor() {
    super();
    this.state = {
      graphedData: [],
      retrievedData: ""
    };
  }



  getAllCaffeine = () =>{
    axios
    .get("/users/getAllCaffeineIntake")
    .then(data => {
      let { graphedData } = this.state;
      let loggedCaffeine = data.data.apps;
      // this.setState({
      //     retrievedData: data.data.apps
      // });
      // console.log('we have this fetched data', this.state.retrievedData, data.data.apps)
      //have to make an an array of objects that have the date and caffeine intake amounts for the
      //next 10 days and with that we can loop through the apps to plot the data;
      // { date: , caffeine: } *10 in the array

      for (var i = 0; i < 10; i++) {
        var firstDay = new Date();
        var previousDay = firstDay;
        previousDay.setDate(firstDay.getDate() - i);

        //making 10 objects with the date and the caffeine amts
        let DateAndCaffeineObj = {};
        DateAndCaffeineObj.Date = previousDay.toDateString().substring(4, 10);
        DateAndCaffeineObj.Caffeine = 0;
        DateAndCaffeineObj["Max Amount of Caffeine"] = 400;
        DateAndCaffeineObj["Hours of Sleep Night Prior"] = null;

        graphedData.push(DateAndCaffeineObj);
      }

      //graphDate should now be an array of 10 objects;
      //next is to add the caffeine amounts in each of these objects
      //retrieved data is just an array of objects with the logged info
      loggedCaffeine.forEach(logged => {
        // console.log(this.state.retrievedData)
        let logDate = new Date(logged.intake_date)
          .toDateString()
          .substring(4, 10);
        let foundDate = graphedData.filter(logged => logged.Date === logDate);
        //             let foundIndex = graphedData.findIndex(logged =>logged.date ===foundDate[0].date )
        //             //returns an array with one date or if not found an empty array
        // console.log('found Date', foundDate, foundDate[0], '//////',
        // graphedData, foundIndex)
        if (foundDate.length > 0) {
          let foundIndex = graphedData.findIndex(
            logged => logged.Date === foundDate[0].Date
          );
          //returns an array with one date or if not found an empty array
        
          graphedData[foundIndex].Caffeine += logged["caffeine"];
          if (logged.sleep) {
            graphedData[foundIndex]["Hours of Sleep Night Prior"] =
              logged["sleep"];
          }
        }
      });

      this.setState({
        graphedData: graphedData.reverse()
      });
   
    })

    .catch(err => console.log("errrrr", err));

  }

  componentDidMount() {
    this.getAllCaffeine();

  }

  // the graph itself is taking in an array of objects with the keys inside of it
  render() {
    const { graphedData } = this.state;
    console.log("grapheddata ", graphedData);
    return graphedData.length > 0 ? (
      <div>
        <div className="caffeine-graph-wrapper">
          <h1 className='caffeine-graph-header'> Caffeine Diary </h1>
          <ResponsiveContainer height={400}>
            <LineChart
              width={400}
              height={400}
              data={graphedData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <YAxis
                type="number"
                orientation="left"
                yAxisId={0}
                domain={[0, 800]}
                dataKey="Caffeine"
              />
              <YAxis
                type="number"
                orientation="right"
                yAxisId={1}
                domain={[0, 18]}
                dataKey="Hours of Sleep Night Prior"
              />
              <XAxis dataKey="Date" />
              <Tooltip position={{ y: 200 }} />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />

              <Line
                type="monotone"
                dataKey="Caffeine"
                yAxisId={0}
                stroke="#3a99d8"
              />
              <Line
                type="monotone"
                dataKey="Max Amount of Caffeine"
                yAxisId={0}
                stroke="red"
              />
              <Line
                type="monotone"
                dataKey="Hours of Sleep Night Prior"
                yAxisId={1}
                stroke="green"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <CaffeineSummary setUser={this.props.setUser}  getAllCaffeine={this.getAllCaffeine}  />
      </div>
    ) : (
      <div>    
      <div className="caffeine-graph-wrapper">
      <h1 className='empty-graph-add'> Your Caffeine Graph is currently empty! 
      <br/>
      <Link to="/addbeverage"  className='empty-graph-add'>Start <u>logging</u> your intake to view your habits. </Link>
      </h1> 

    </div>
    </div>
    );
  }
}

export default CaffeineGraph;
