import React, { Component } from "react";
// import Autosuggest from 'react-autosuggest';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import coffeesapi from "../coffeesapi";
import MoodSleepAnalysis from './MoodSleepAnal'

class Select extends React.Component {
  render() {
    const { name, values, selectedValue, handleChange } = this.props;
    const displayValues = ["", ...values];

    return (
      <select name={name} value={selectedValue} onChange={handleChange}>
        {displayValues.map(value => <option value={value}> {value} </option>)}
      </select>
    );
  }
}

class AddBevForm extends React.Component {
  constructor() {
    super();
    this.brandValues = ["Starbucks", "Dunkin Donuts", "other"];
    this.StarbsBevs = coffeesapi.starbsBevs();
    this.DunkinBevs = coffeesapi.dunkinBevs();
    this.timeOfDay = ['am', 'pm']
    this.hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
    this.mood= ['happy', 'sad', 'angry', 'tired', 'team no sleep', 'exhausted', 'frustrated', 'excited', 'lit', 'trying to party and need energy']
    this.state = {
      date_consumed: "",
      brand: "",
      beverage: "",
      suggestedSizes: "",
      size: "",
      caffeine: "",
      time: "", 
      sleep:"", 
      mood:"", 
      submitted:false,
      expand:false
    };
  }

  handleSelectChange = e => {
    console.log("handleSelected");
    this.setState({
      [e.target.name]: e.target.value
    });

    if (e.target.name ==='brand'){
      console.log('selecting brand , should clear state')
      this.setState({
        beverage:'', 
        size:'', 
        caffeine:''
      })
    }else if(e.target.name=== 'beverage'){
      console.log('selecting the beverage input')
      this.setState({
        size:'', 
        caffeine:''
      })
     } else if (this.state.brand ==='Starbucks' && this.state.brand && e.target.name ==='size'){
        console.log(e.target.value )
        this.setState({
            caffeine: coffeesapi.getStarbsCaffeine(this.state.beverage, e.target.value)
        })
    } else if (this.state.brand === 'Dunkin Donuts' && this.state.brand && e.target.name === 'size'){
      console.log(e.target.value)
      this.setState({
        caffeine:coffeesapi.getDunkinCaffeine(this.state.beverage, e.target.value)
      })
    }else if (e.target.name === 'brand'){
      this.setState({
        beverage:''
      })
   
    }
    
  };


  handleBeverages = () => {
    console.log("this.handleValues", this.state);
    const { brand } = this.state;
    if (brand === "Starbucks") {
      return this.StarbsBevs;
    } else if(brand === 'Dunkin Donuts'){
      return this.DunkinBevs;
    }
    else {
      return [];
    }
  };

  handleSizes = () => {
    console.log("in the handleSizes function");
    const { brand, beverage } = this.state;
    if (brand === "Starbucks") {
      if (beverage) {
        return coffeesapi.getStarbsSize(beverage);
      } else {
        return [];
      }
    } else if(brand === 'Dunkin Donuts'){
      if(beverage){
        return coffeesapi.getDunkinSize(beverage);
      }else {
        return []
      }
    }
  };

  handleDateSelection = date => {
    moment(date).utcOffset(-240).format("YYYY-MM-DD")
    this.setState({ date_consumed: date });
  };


handleExpand = (e)=>{
  e.preventDefault();
  this.setState({
    expand:!this.state.expand
  })


}

handleSubmit =(e)=>{
  console.log(this.state)

  
    e.preventDefault();
    axios
      .post('/users/trackCaffeineIntake', {
        brand: this.state.brand, 
        beverage: this.state.beverage, 
        size:this.state.size, 
        caffeine: this.state.caffeine, 
        intake_date:this.state.date_consumed, 
        intake_time:this.state.time, 
        sleep:this.state.sleep, 
        mood: this.state.mood
      })
      .then(data => {
        console.log('data getting back', data)
        this.setState({
            submitted:true, 
        });
        console.log('submitteeddd' . this.state.submitted)
      })
      .catch(err => {
        console.log(err);
      });
   
  }


  render() {
    const {
      date_consumed,
      brand,
      beverage,
      suggestedBeverages,
      suggestedSizes,
      size,
      time, 
      sleep, 
      mood, 
      submitted, 
      expand
    } = this.state;
    console.log('//////////')
    console.log('this.state' , this.state);
    console.log("this.state.brand", this.state.brand);
    if (submitted) {
        return <Redirect to="/" />;
      }
    return (
      <div id="beverage-form-container">
        <div className="add-bev-info">
          <form onSubmit={this.handleSubmit}>
            <h1> Caffeine Intake Logger</h1>
            <div className="add-bev-inputs">
              {/* {this.selectUpdate()} */}
              <div id='date/time'> 
              <p>Date*</p>
              <Calendar onChange={this.handleDateSelection} value={date_consumed}/>
                 
              <p>Time*</p>
              <input
          type="time"
          name='time'
          value={time}
          placeholder="Time"
          onChange={this.handleSelectChange}
        />
        </div>
              

              <p>Brand*</p>
              <div className="brand-search-input">
                <Select
                  name="brand"
                  values={this.brandValues}
                  selectedValue={brand}
                  handleChange={this.handleSelectChange}
                />
              </div>
              <p>Beverage*</p>
              <Select
                name="beverage"
                values={this.handleBeverages()}
                selectedValue={beverage}
                handleChange={this.handleSelectChange}
              />
              <p>Size*</p>
              {beverage ? (
                <Select
                  name="size"
                  values={this.handleSizes()}
                  selectedValue={size}
                  handleChange={this.handleSelectChange}
                />
              ) : (
                <Select
                  name="size"
                  values={suggestedSizes}
                  selectedValue={size}
                  handleChange={this.handleSelectChange}
                />
              )}
              <p> Caffeine:</p>
             {brand &&beverage &&size  ? this.state.caffeine: ''}

              <p>  {this.state.caffeine?  <MoodSleepAnalysis caffeine={this.state.caffeine}/>: ''} </p>
              
        <p onClick={this.handleExpand}> Click <b>Here </b>to record your sleep last night and mood today!</p>

              {expand  ?
           <div>
            <p> Hours of Sleep you got the night before:</p>
         
                <Select
                  name="sleep"
                  values={this.hours}
                  selectedValue={sleep}
                  handleChange={this.handleSelectChange}
                />

                <p> Mood: </p>

                  <Select
                  name="mood"
                  values={this.mood}
                  selectedValue={mood}
                  handleChange={this.handleSelectChange}
                />
                <br/>
              <p>  {this.state.caffeine?  <MoodSleepAnalysis caffeine={this.state.caffeine}/>: ''} </p>

             </div> :''}
        <br/>
        {brand && beverage && size &&date_consumed &&time ?
       <button type='submit'> Submit </button >:  <button type='submit' disabled> Submit </button>}

            </div>
          </form>
        </div>

       
      </div>
    );
  }
}

export default AddBevForm;
