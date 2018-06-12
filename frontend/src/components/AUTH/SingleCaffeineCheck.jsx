import React, { Component } from "react";
import axios from "axios";
import coffeesapi from "../coffeesapi";
import CaffeineCards from './caffeineCards'

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

class SingleCaffeine extends React.Component {
  constructor() {
    super();
    this.brandValues = ["Starbucks", "Dunkin Donuts", "other"];
    this.StarbsBevs = coffeesapi.starbsBevs();
    this.DunkinBevs = coffeesapi.dunkinBevs();
    this.state = {
      brand: "",
      beverage: "",
      caffeineCards: ""
      //   suggestedSizes: "",
      //   size: "",
      //   caffeine: ""
    };
  }
  handleSelectChange = e => {
    console.log("handleSelected");
    this.setState({
      [e.target.name]: e.target.value
    });

    if (e.target.name === "brand") {
      console.log("selecting brand , should clear state");
      this.setState({
        beverage: "",
        caffeine: "", 
        caffeineCards:''
      });
    }
    if (e.target.name === "beverage") {
      console.log("trying to see beverage", e.target.value);
      this.handleCards(e.target.value);
    }
  };

  handleBeverages = () => {
    console.log("this.handleValues", this.state);
    const { brand } = this.state;
    if (brand === "Starbucks") {
      return this.StarbsBevs;
    } else if (brand === "Dunkin Donuts") {
      return this.DunkinBevs;
    } else {
      return [];
    }
  };

  handleCards = beverage => {
    console.log("handleCards");
    const { brand } = this.state;
    if (brand === "Starbucks") {
      this.setState({
        caffeineCards: coffeesapi.AllStarbsBevInfo(beverage)
      });
    } else if (brand === "Dunkin Donuts") {
      this.setState({
        caffeineCards: coffeesapi.AllDunkinBevInfo(beverage)
      });
    }
  };



  render() {
    const { brand, beverage, caffeineCards } = this.state;

    return (
      <div id="single-Caffeine-Container">
      {/* <div classname='single-caffeine-selecters'> */}
        <p className='caffeine-input'><span>Brand*  </span>{'  '}
       
          <Select
            name="brand"
            values={this.brandValues}
            selectedValue={brand}
            handleChange={this.handleSelectChange}
          />
        
        </p>


        <p className='caffeine-input' > <span>Beverage* </span>
        <Select
          name="beverage"
          values={this.handleBeverages()}
          selectedValue={beverage}
          handleChange={this.handleSelectChange}
        />
            </p>
        <div id="bev-cards" >
       {caffeineCards ? <CaffeineCards beverage ={beverage} cards={caffeineCards}/>:''}

        </div>
        {/* <p>Size*</p>
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
        {brand && beverage && size ? this.state.caffeine : ""} */}
      </div>
    );
  }
}

export default SingleCaffeine;
