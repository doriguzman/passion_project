import React, { Component } from "react";
import axios from "axios";
// import TableSummary from "./Table";
import DisplaySummary from './DisplaySummary'
import moment from 'moment';


class CaffeineSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      retrievedData: [], 
      newRetrievedData:[]
    };
  }

  quicksort = arr => {
    if (arr.length < 1) {
      return arr;
    }

    let pivot = arr.splice(Math.floor(arr.length / 2), 1);
    let pivotDate = pivot[0].intake_date;
    let left = [];
    let right = [];

    arr.forEach(elem => {
      new Date(elem.intake_date) < new Date(pivotDate)
        ? left.push(elem)
        : right.push(elem);
    });
    return [...this.quicksort(left), ...pivot, ...this.quicksort(right)];
  };

  renderCaffeineSummary = () => {
    const { retrievedData } = this.state;
    axios.get("/users/getAllCaffeineIntake").then(data => {
      let newData = this.quicksort(data.data.apps).reverse();
      console.log(newData, 'this is the quicksorted data')
      this.setState({
        retrievedData: newData
      });

      // let display = {};
      // console.log("helllooo", display, newData);
      // for (var i = 1; i <= newData.length; i++) {
      //   let date = new Date(newData[i - 1].intake_date)
      //     .toDateString()
      //     .substring(4, 10);
      //   display[date] = [];
      //   // display[date]=newData[i-1]
      // }

      // for (var j = 1; j < newData.length; j++) {
      //   console.log("newData", newData);
      //   if (newData[j - 1].intake_date === newData[j].intake_date) {
      //     console.log("truuueeeee", newData[j - 1].intake_date);
      //     let matchedDate = new Date(newData[j - 1].intake_date)
      //       .toDateString()
      //       .substring(4, 10);

      //     display[matchedDate].push(newData[j - 1]);
      //     console.log("display", display);
      //   } else {
      //     let noMatch = new Date(newData[j].intake_date)
      //       .toDateString()
      //       .substring(4, 10);
      //     display[noMatch].push(newData[j]);
      //     console.log("nomatch", noMatch);
      //   }
      // }

      // console.log('FINAL DISPLAY', display)
      // for (const key in display) {
      //   console.log(`display ${key}` , key);
      //   console.log(display[key])
      
      // }

      // this.setState({
      //   newRetrievedData: display
      // });

    });
  };



  // renderDisplay= ()=>{
  //   return(<DisplaySummary data={this.state.newRetrievedData}/>)
  // }

  renderDeleteIntake = (e, intake_id) => {
    //e.preventDefault();
    axios.delete(`/users/deleteCaffeine/${intake_id}`).then(response => {
      console.log("just deleted the intake, should rerender", response);
      this.renderCaffeineSummary();
      this.props.getAllCaffeine();
    });
  };
  componentDidMount() {
    this.renderCaffeineSummary();
  }

  render() {
    const { retrievedData } = this.state;
    console.log(this.state);



     

    if (retrievedData === []) {
      return <div> </div>;
    } else {
      return (
        <div className="table-div">
          <div className="table-inputs">
            <table>
              <tr>
                <th> Date </th>
                <th> Beverage </th>
                <th> Size </th>
                <th> Caffeine </th>
                <th> Time </th>
                <th> Mood </th>
                <th> Hours of Sleep Night Prior</th>
              </tr>

              {retrievedData.map(elem => {
                console.log("getting the individual elem", elem);
                return (
                  <tr>
                    <td className="intake_date">
                      {" "}
                      {new Date(elem.intake_date)
                        .toDateString()
                        .substring(4, 10)}
                    </td>
                    <td className="beverage"> {elem.beverage}</td>
                    <td className="size">{elem.size} </td>
                    <td className="caffeine"> {elem.caffeine}</td>
                    <td className="intake_time"> {moment(elem.intake_time, 'HH:mm').format('h:mmA')}</td>

                    <td className="mood"> {elem.mood}</td>
                    <td className="sleep">
                      {" "}
                      {elem.sleep}{" "}
                      <button
                        id="delete"
                        onClick={e =>
                          this.renderDeleteIntake(e, elem.intake_id)
                        }
                      >
                        x
                      </button>
                    </td>
                    {/* <td className='delete'> <button  onClick={e =>
                        this.renderDeleteIntake(e, elem.intake_id)}>
                        x</button></td> */}
                  </tr>
                );
              })}
            </table>


            {/* starting the object div */}


              {this.state.newRetrievedData !== {}? <DisplaySummary data= {this.state.newRetrievedData}/> :'' }
               {/* console.log('FINAL DISPLAY', display)
      for (const key in display) {
        console.log(`display ${key}` , key);
        console.log(display[key])
      
      } */}
            <div className="home-page-image">
              {/* <img src = {require('../images/home-coffee.jpg') }/> */}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CaffeineSummary;
