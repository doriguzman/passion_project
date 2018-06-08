import React, { Component } from "react";

class DisplaySummary extends Component {
  render() {
    let retrieved = this.props.data;
    console.log(retrieved);

    return('')
    for (const key in retrieved) {
      console.log(key);

      retrieved[key].map(elem => {
          return(
        <div>
          {" "}
          <span>{elem.intake_time} </span>
          <span> {elem.beverage} </span>
          <span> {elem.caffeine}</span>
        </div>
          )
        }
      );
    }
  }
}


export default DisplaySummary;
