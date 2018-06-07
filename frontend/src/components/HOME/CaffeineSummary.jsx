import React, { Component } from "react";
import axios from "axios";
// import TableSummary from "./Table";

class CaffeineSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      retrievedData: []
    };
  }

  quicksort = (arr)=>{
    if (arr.length <1){
      return arr
    }
  
    let pivot = arr.splice(Math.floor(arr.length/2), 1)
    let pivotDate= pivot[0].intake_date
    let left = []
    let right= []
  
    arr.forEach(elem =>{
      new Date(elem.intake_date) < new Date(pivotDate)? left.push(elem) :right.push(elem)
    })
    return [...this.quicksort(left),...pivot, ...this.quicksort(right)]
  }


  renderCaffeineSummary = ()=>{
    axios.get("/users/getAllCaffeineIntake").then(data => {
        this.setState({
          retrievedData: this.quicksort(data.data.apps).reverse()
        });
      });

  }


  renderDeleteIntake = (e, intake_id)=>{
    //e.preventDefault();
  axios.delete(`/users/deleteCaffeine/${intake_id}`)
  .then( response =>{
      console.log('just deleted the intake, should rerender', response)
      this.renderCaffeineSummary();
      this.props.getAllCaffeine()
  })
  //needing to rerender the graph as well, so 

}
  componentDidMount() {
      this.renderCaffeineSummary();

  }
  render() {
    const { retrievedData } = this.state;
    console.log(retrievedData)

    if (retrievedData === []) {
      return <div> </div>;
    } else {
      return (
        <div className="table-div">
        <div className='table-inputs'>
        <table >
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
              console.log('getting the individual elem', elem)
            return (
              <tr>
                <td className="intake_date">
                  {" "}
                  {new Date(elem.intake_date).toDateString().substring(4, 10)}
                </td>
                <td className="beverage"> {elem.beverage}</td>
                <td className="size">{elem.size} </td>
                <td className="caffeine"> {elem.caffeine}</td>
                <td className="intake_time"> {elem.intake_time}</td>
                <td className="mood"> {elem.mood}</td>
                <td className="sleep"> {elem.sleep} <button  id='delete'onClick={e =>
                        this.renderDeleteIntake(e, elem.intake_id)}>
                        x</button></td>
                {/* <td className='delete'> <button  onClick={e =>
                        this.renderDeleteIntake(e, elem.intake_id)}>
                        x</button></td> */}
              </tr>
            );
          })}
        </table>
        <div className='home-page-image'>
        {/* <img src = {require('../images/home-coffee.jpg') }/> */}
        </div>
        </div>
      </div>
      );
    }
  }
}

export default CaffeineSummary;

