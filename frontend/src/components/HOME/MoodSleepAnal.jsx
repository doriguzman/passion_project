import React, { Component } from "react";
import axios from "axios";

class MoodSleepAnalysis extends React.Component {
  constructor() {
    super();
    this.state = {
      retrievedData: "",
      analysis: ""
    };
  }

  renderAllCaffeine = () => {
      console.log('retrieving all data for anaylsis')
      
    axios.get("/users/getAllCaffeineIntake").then(data => {
      this.setState({
        retrievedData: data.data.apps
      });
      if (this.state.retrievedData){
      console.log('trying to see if we reach here ')
      this.getCaffeineToCompare();
      }
    });
  };

  //comparing an element of the caffeine intake with the one they are inputting from props//

  getCaffeineToCompare = () => {
      console.log('this.props.caffeine', this.props.caffeine)
      console.log('in the compare ish')
    let caffeine = this.props.caffeine;
    const { retrievedData } = this.state;

    //matched is going to be an array of objects
    let matched = retrievedData.filter(elem => elem.caffeine === caffeine);
    console.log('matched' , matched);
    //getting only one value back
    if (matched.length === 1) {
      console.log('one matched')
      this.setState({
        analysis: matched[0].sleep
      });
    }
    //second part is if there is more than one thing that is going to be returned

    if (matched.length > 1) {
      console.log('more than one')
      //want to get an array of all values of the hours of sleep
      let hours = matched
        .map(elem => elem.sleep)
        .reduce((acc, curr) => acc + curr);
      let average = Math.floor(hours / matched.length);

      this.setState({
        analysis: average
      });
    }
  };

  componentDidMount() {
    this.renderAllCaffeine();
// this.props.caffeine

    
  
  }
 

  render() {
      const {retrievedData, analysis}= this.state
    console.log("retreived data", this.state.retrievedData);

    console.log('anaylsis', analysis)
    console.log(
      this.props.caffeine,
      "this is how much caffeine is being passed in "
    );

return(
    <div className='analysis'>
    {analysis ? <div>Your average amount of sleep when <br/>consuming this much caffeine is: {analysis} hour(s)</div>:''}

</div>)
  
}
}

export default MoodSleepAnalysis;
