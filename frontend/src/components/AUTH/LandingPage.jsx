import React, { Component } from "react";
import QuickLook from "../HOME/QuickLook";
import SingleCaffeine from "./SingleCaffeineCheck";
import '../stylesheets/LandingPage.css'

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
      expandCompare:false
    });
  };
  handleCompareExpand = e => {
    this.setState({
      expandCompare: !this.state.expandCompare, 
      expandSingle:false
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
        </div>

        <div className="middle-Landing-Div">
          <p className='expand' onClick={this.handleSingleExpand}>
            {" "}
            Click <b>Here </b> to check a beverage's caffeine{" "}
            <hr width="10%"/>
          </p>
         

          {expandSingle ? <SingleCaffeine /> : ""}
        </div>
        <div className="bottom-Landing-Div">
          <p className='expand' onClick={this.handleCompareExpand}>
            {" "}
            Click <b>Here </b> to compare caffeine of two beverages
            <hr width="10%"/>
          </p>
          {expandCompare ? <QuickLook /> : ""}
        </div>
      </div>
    );
  }
}

export default LandingPage;
