import React, { Component } from "react";
// import Autosuggest from 'react-autosuggest';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import coffeesapi from "../coffeesapi";
import MoodSleepAnalysis from "./MoodSleepAnal";
import "../stylesheets/beverageform.css";

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

class Sizes extends React.Component {
  render() {
    const {
      brand,
      beverage,
      values,
      name,
      selectedValue,
      handleChange
    } = this.props;
    let sizes = [];
    if (brand === "Starbucks") {
      sizes = coffeesapi.getStarbsSize(beverage);
    } else if (brand === "Dunkin Donuts") {
      sizes = coffeesapi.getDunkinSize(beverage);
    }
    if (sizes[0]) {
      return (
        <div>
          {sizes.map(elem => {
            return (
              <button
                className="size-button"
                value={elem}
                onClick={handleChange}
                name="size"
              >
                {" "}
                {elem}{" "}
              </button>
            );
          })}
        </div>
      );
    }
  }
}

class AddBevForm extends React.Component {
  constructor() {
    super();
    this.brandValues = ["Starbucks", "Dunkin Donuts", "other"];
    this.StarbsBevs = coffeesapi.starbsBevs();
    this.DunkinBevs = coffeesapi.dunkinBevs();
    this.timeOfDay = ["am", "pm"];
    this.hours = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24
    ];
    this.mood = [
      "happy",
      "sad",
      "angry",
      "tired",
      "team no sleep",
      "exhausted",
      "frustrated",
      "excited",
      "lit",
      "trying to party and need energy"
    ];
    this.state = {
      date_consumed: "",
      brand: "",
      beverage: "",
      suggestedSizes: "",
      size: "",
      caffeine: "",
      time: "",
      sleep: "",
      mood: "",
      submitted: false,
      expand: false,
      clicked: false
    };
  }

  handleSelectChange = e => {
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
    if (e.target.name === "beverage") {
      this.setState({
        size: "",
        caffeine: ""
      });
    }

    

    if (
      (this.state.brand === "Starbucks"  &&this.state.beverage && this.state.caffeine && e.target.name === "size") ||
      (!this.state.caffeine && e.target.name === "size" && this.state.brand === "Starbucks")
    ) {
      let targetValue = e.target.value;
      this.setState(
        {
          caffeine: ""
        },
        () => {
          this.setState({
            caffeine: coffeesapi.getStarbsCaffeine(
              this.state.beverage,
              targetValue
            )
          });
        }
      );
    }
    if (
      (this.state.brand === "Dunkin Donuts"  &&this.state.beverage && this.state.caffeine && e.target.name === "size") ||
      (!this.state.caffeine && e.target.name === "size" && this.state.brand === "Dunkin Donuts")
    ) {
      let targetValue = e.target.value;
      console.log(targetValue)
      this.setState(
        {
          caffeine: ""
        },
        () => {
          this.setState({
            caffeine: coffeesapi.getDunkinCaffeine(
              this.state.beverage,
              targetValue
            )
          });
        }
      );
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


  handleDateSelection = date => {
    moment(date)
      .utcOffset(-240)
      .format("YYYY-MM-DD");
    this.setState({ date_consumed: date });
  };

  handleExpand = e => {
    e.preventDefault();
    this.setState({
      expand: !this.state.expand
    });
  };

  handleSubmit = e => {
    console.log(this.state);

    e.preventDefault();
    axios
      .post("/users/trackCaffeineIntake", {
        brand: this.state.brand,
        beverage: this.state.beverage,
        size: this.state.size,
        caffeine: this.state.caffeine,
        intake_date: this.state.date_consumed,
        intake_time: this.state.time,
        sleep: this.state.sleep,
        mood: this.state.mood
      })
      .then(data => {
        console.log("data getting back", data);
        this.setState({
          submitted: true
        });
        console.log("submitteeddd".this.state.submitted);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
      expand,
      caffeine
    } = this.state;
    console.log("//////////");
    console.log("this.state", this.state);
    console.log("this.state.brand", this.state.brand);
    if (submitted) {
      return <Redirect to="/" />;
    }
    return (
      <div id="add-beverage-form-container">
        <form onSubmit={this.handleSubmit}>
          <h1> Caffeine Intake Logger</h1>
          <div className="beverage-form">
            {/* {this.selectUpdate()} */}
            <div id="date/time">
              <p>Date*</p>
              <Calendar
                onChange={this.handleDateSelection}
                value={date_consumed}
              />

              <p>Time*</p>
              <input
                type="time"
                name="time"
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
              <Sizes
                name="size"
                brand={brand}
                beverage={beverage}
                selectedValue={size}
                handleChange={this.handleSelectChange}
              />
            ) : (
              ""
            )}

            {brand && beverage && size ? (
              <p className="caffeine-label"> Caffeine: {caffeine} mgs</p>
            ) : (
              ""
            )}
            <p>
              {" "}
              {this.state.caffeine && this.state.size ? (
                <MoodSleepAnalysis caffeine={this.state.caffeine} />
              ) : (
                ""
              )}{" "}
            </p>

            <p onClick={this.handleExpand } className='mood-sleep-div'>
              {" "}
              Click <b>Here </b>to record your sleep 
              <br/>last night and mood today!
              <hr className='horizontal-rule-mood-sleep' width='20%'/> 
            </p>

            {expand ? (
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
                <br />
              </div>
            ) : (
              ""
            )}
            <br />
            {brand && beverage && size && date_consumed && time ? (
              <button type="submit"> Submit </button>
            ) : (
              <button type="submit" disabled>
                {" "}
                Submit{" "}
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default AddBevForm;
