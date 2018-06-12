import React, {Component } from 'react';
import axios from "axios"
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

class QuickLook extends React.Component{
    constructor(){
        super();
        this.brandValues = ["Starbucks", "Dunkin Donuts", "other"];
        this.StarbsBevs = coffeesapi.starbsBevs();
        this.DunkinBevs = coffeesapi.dunkinBevs();
        this.state={
            brand1:'', 
            brand2:'', 
            beverage1:'', 
            beverage2:'', 
            suggestedSizes:'', 
            size1:'', 
            size2:'', 
            caffeine1:'', 
            caffeine2:''
        }
    }
    handleSelectChange = e => {
        const {brand1,brand2, beverage1, beverage2}= this.state
        console.log("handleSelected");
        this.setState({
          [e.target.name]: e.target.value
        })
        if (brand1 ==='Starbucks' && e.target.name ==='size1'){
            console.log(e.target.value )
            this.setState({
                caffeine1: coffeesapi.getStarbsCaffeine(beverage1, e.target.value)
            })
        } else if (brand1=== 'Dunkin Donuts' && e.target.name === 'size1'){
          console.log(e.target.value)
          this.setState({
            caffeine1:coffeesapi.getDunkinCaffeine(beverage1, e.target.value)
          })
        }else if(this.state.brand2 ==='Starbucks' && e.target.name ==='size2'){
            this.setState({
                caffeine2: coffeesapi.getStarbsCaffeine(beverage2, e.target.value)
            })
        }else if (this.state.brand2 ==='Dunkin Donuts' && e.target.name ==='size2'){
            this.setState({
                caffeine2:coffeesapi.getDunkinCaffeine(beverage2, e.target.value)
            })
        }
      };
    


  handleBeverages1 = () => {
    const { brand1, brand2 } = this.state;

    
    if (brand1 === "Starbucks" ) {
      return this.StarbsBevs;
    } else if(brand1 === 'Dunkin Donuts' ){
      return this.DunkinBevs;
    }
    else {
      return [];
    }
  };
  handleBeverages2 = () => {
    console.log("this.handleValues", this.state);
    const { brand1, brand2 } = this.state;
    if (brand2 ==='Starbucks') {
      return this.StarbsBevs;
    } else if(brand2 ==='Dunkin Donuts'){
      return this.DunkinBevs;
    }
    else {
      return [];
    }
  };
  handleSizes1 = () => {
    console.log("in the handleSizes function");
    const { brand1, beverage1 } = this.state;
    if (brand1 === "Starbucks") {
      if (beverage1) {
          console.log('bev1', beverage1)
        return coffeesapi.getStarbsSize(beverage1);
      } else {
        return [];
      }
    } else if(brand1 === 'Dunkin Donuts'){
      if(beverage1){
        return coffeesapi.getDunkinSize(beverage1);
      }else {
        return []
      }
    }
  };
  handleSizes2 = () => {
    console.log("in the handleSizes function");
    const { brand2, beverage2 } = this.state;
    if (brand2 === "Starbucks") {
      if (beverage2) {
        return coffeesapi.getStarbsSize(beverage2);
      } else {
        return [];
      }
    } else if(brand2 === 'Dunkin Donuts'){
      if(beverage2){
        return coffeesapi.getDunkinSize(beverage2);
      }else {
        return []
      }
    }
  };

  handleSizes1 = () => {
    console.log("in the handleSizes function");
    const { brand1, beverage1 } = this.state;
    if (brand1 === "Starbucks") {
      if (beverage1) {
        return coffeesapi.getStarbsSize(beverage1);
      } else {
        return [];
      }
    } else if(brand1 === 'Dunkin Donuts'){
      if(beverage1){
        return coffeesapi.getDunkinSize(beverage1);
      }else {
        return []
      }
    }
  };
  handleSizes2 = () => {
    console.log("in the handleSizes function");
    const { brand2, beverage2 } = this.state;
    if (brand2 === "Starbucks") {
      if (beverage2) {
        return coffeesapi.getStarbsSize(beverage2);
      } else {
        return [];
      }
    } else if(brand2 === 'Dunkin Donuts'){
      if(beverage2){
        return coffeesapi.getDunkinSize(beverage2);
      }else {
        return []
      }
    }
  };



render(){
    const {
        
        brand1,
        brand2, 
        beverage1,
        beverage2, 
        suggestedBeverages,
        suggestedSizes,
        size1,
        size2, caffeine1, caffeine2
       
      } = this.state;
    return(
        // <div> 
              <div className='quicklook-Container'> 
              <div className='quicklook-1'>
              <img className='quicklook-image' src={require('../images/coffee6.jpeg')} />
              <div className='quick-look-text'>
              <p className='caffeine-quicklook-input-top' ><span>Brand* {' '} </span>
                <Select
                  name="brand1"
                  values={this.brandValues}
                  selectedValue={brand1}
                  handleChange={this.handleSelectChange}
                />
                </p>
              
              <p className='caffeine-quicklook-input'><span>Beverage* {' '} </span>
              <Select
                name="beverage1"
                values={this.handleBeverages1()}
                selectedValue={beverage1}
                handleChange={this.handleSelectChange}
              />
                  </p>
            
              <p className='caffeine-quicklook-input'><span>Size* {' '} </span>
              {beverage1 &&brand1 ? (
                <Select
                  name="size1"
                  values={this.handleSizes1()}
                  selectedValue={size1}
                  handleChange={this.handleSelectChange}
                />
                ) : (
                <Select
                  name="size1"
                  values={suggestedSizes}
                  selectedValue={size1}
                  handleChange={this.handleSelectChange}
                />
              )}
              </p>
              
              
             {brand1 &&beverage1 &&size1  ? <p> Caffeine: {caffeine1}mg </p>: ''}
              </div>
              </div>

             <div className='quicklook-2'>
             <img className='quicklook-image' src={require('../images/coffee7.jpeg')} /> 
             <div className='quick-look-text'>
          
                 <p className='caffeine-quicklook-input-top'><span>Brand* {' '} </span>
                <Select
                  name="brand2"
                  values={this.brandValues}
                  selectedValue={brand2}
                  handleChange={this.handleSelectChange}
                />
              </p>
           
             
                <p className='caffeine-quicklook-input'><span>Beverage* </span>
              <Select
                name="beverage2"
                values={this.handleBeverages2()}
                selectedValue={beverage2}
                handleChange={this.handleSelectChange}
              />
              </p>
         
  
        
              <p className='caffeine-quicklook-input'><span> Size* </span>
              {beverage2 && brand2? (
                <Select
                  name="size2"
                  values={this.handleSizes2()}
                  selectedValue={size2}
                  handleChange={this.handleSelectChange}
                />
              ) : (
                <Select
                  name="size2"
                  values={suggestedSizes}
                  selectedValue={size2}
                  handleChange={this.handleSelectChange}
                />
              )}

              </p>
              
             {brand2 &&beverage2 &&size2  ? <p> Caffeine: {caffeine2}mg</p>: ''}
                  </div>

            </div>
            </div>
        
    )
}



}

export default QuickLook;