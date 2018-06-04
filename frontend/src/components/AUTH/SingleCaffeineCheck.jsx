import React, { Component } from "react";
import axios from "axios";
import coffeesapi from "../coffeesapi";

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
      caffeineCards:''
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
        size: "",
        caffeine: ""
      });
    }
    if (e.target.name === 'beverage'){
        console.log('trying to see beverage', this.state.beverage)
        this.handleCards(this.state.beverage)
    }
  }
  
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

  handleCards = (beverage) => {
    console.log("handleCards");
    const { brand, beverage } = this.state;
    if (brand === "Starbucks") {
      if (beverage) {
        this.setState({
            caffeineCards:coffeesapi.AllDunkinBevInfo(beverage)
        }) 
      } else {
        return [];
      }
    } else if (brand === "Dunkin Donuts") {
      if (beverage) {
        this.setState({
            caffeineCards:coffeesapi.AllDunkinBevInfo(beverage)
        }) 
      } else {
        return [];
      }
    }
  };

  componentDidMount(){
      this.handleCards()
  }
  render() {
    const { brand, beverage, size, caffine, suggestedSizes } = this.state;

    console.log("getting single drink caffeine", this.state);
    return (
      <div id="single-Caffeine-Container">
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


        <div id ='bev-cards' >


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