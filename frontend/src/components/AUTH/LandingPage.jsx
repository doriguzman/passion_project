import React, { Component } from "react";
import QuickLook from "../HOME/QuickLook";
import SingleCaffeine from "./SingleCaffeineCheck";
import "../stylesheets/LandingPage.css";

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      expandSingle: false,
      expandCompare: false
    };
  }

  handleSingleExpand = e => {
    this.setState({
      expandSingle: !this.state.expandSingle,
      expandCompare: false
    });
  };
  handleCompareExpand = e => {
    this.setState({
      expandCompare: !this.state.expandCompare,
      expandSingle: false
    });
  };
  render() {
    const { expandSingle, expandCompare } = this.state;
    console.log("expanding state", this.state);
    return (
      <div className="Landing-Divs">
        {/* <div className="top-Landing-Div">
          <p>
            {" "}
           WELCOME TO THE CAFFEINE INTAKE TRACKER
           SOME QUICK CAFFEINE FACTS ****HEREEEEE****
          </p>
          <button id="signup" onClick={this.props.setForm}>
            sign up
          </button>{" "}
          to track your caffeine intake! Already have an account?
          <button id="login" onClick={this.props.setForm}>
            Login
          </button>
        </div> */}

        <div className="middle-Landing-Div">
          <h2> Caffeine 101</h2>
          <h3> Did you know?</h3>
          <p className="caffeine-facts">
            {" "}
            The average amount of caffeine a person consumes ~ 200 mg takes 40
            hours to be completely metabolized. <br />
            <b> BUT </b> the greatest effects from caffeine are experienced
            within the first 4-6 hours of consumption
            <br />
          </p>
          <p className="caffeine-facts">
            {" "}
            <b>40 hours </b> seems like a lot of time, but factors such as
            caffeine tolerance and certain drugs and food can influence the
            metabolism of caffeine.
          </p>

       
        </div>
        <div className="bottom-Landing-Div">
        <p className="expand" onClick={this.handleSingleExpand}>
            {" "}
            Click <b>Here </b> to check a beverage's caffeine{" "}
            <hr className="horizontal-rule-landing" width="10%" />
          </p>

          {expandSingle ? <SingleCaffeine /> : ""}

          <p className="expand" onClick={this.handleCompareExpand}>
            {" "}
            Click <b>Here </b> to compare caffeine of two beverages
            <hr className="horizontal-rule-landing" width="10%" />
          </p>
          {expandCompare ? <QuickLook /> : ""}
        </div>
      </div>
    );
  }
}

export default LandingPage;
