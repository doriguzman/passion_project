import React, { Component } from "react";
import QuickLook from "../HOME/QuickLook";
import SingleCaffeine from "./SingleCaffeineCheck";

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
      expandSingle: !this.state.expandSingle
    });
  };
  handleCompareExpand = e => {
    this.setState({
      expandCompare: !this.state.expandCompare
    });
  };
  render() {
    const { expandSingle, expandCompare } = this.state;
    console.log("expanding state", this.state);
    return (
      <div className="Landing-Divs">
        <div className="top-Landing-Div">
          <p>
            {" "}
            this is where the short intro to the page is going to be and about
            what it does
          </p>
          <button id="signup" onClick={this.props.setForm}>
            sign up
          </button>{" "}
          to track your caffeine intake! Already have an account?
          <button id="login" onClick={this.props.setForm}>
            Login
          </button>
        </div>

        <div className="middle-Landing-Div">
          <p onClick={this.handleSingleExpand}>
            {" "}
            Click <b>Here </b> to check a beverage's caffeine{" "}
          </p>

          {expandSingle ? <SingleCaffeine /> : ""}
        </div>
        <div className="bottom-Landing-Div">
          <p onClick={this.handleCompareExpand}>
            {" "}
            Click <b>Here </b> to compare caffeine of two beverages
          </p>
          {expandCompare ? <QuickLook /> : ""}
        </div>
      </div>
    );
  }
}

export default LandingPage;
