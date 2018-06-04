import React, { Component } from 'react';
import CaffeineGraph from './CaffeineGraph';
import CaffeineSummary from './CaffeineSummary';

class CaffeineContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="caffeine-container">
        {/* <div className="logged-caffeine-container"> */}
          <CaffeineGraph setUser={this.props.setUser} />
          {/* <CaffeineSummary setUser={this.props.setUser} /> */}
        {/* </div> */}
      </div>
    );
  }
}

export default CaffeineContainer;
