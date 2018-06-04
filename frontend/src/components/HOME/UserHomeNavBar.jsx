import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom'
import axios from 'axios'

class UserHome extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
          
        <div className="home-nav-bar">
          <div className="home-nav-left">
         

            <h3><Link to="/">HOME</Link></h3>
            <h3><Link to="/addbeverage"><i class="fas fa-plus"></i> ADD BEVERAGE</Link></h3>
            <h3><Link to="/quicklook">QUICK LOOK</Link></h3>
            {/* <h3><Link to="/community">COMMUNITY</Link></h3> */}
          </div>
          <div className="home-nav-right">
           <h3><Link to ='/' onClick={this.props.logOut}> LOG OUT</Link> </h3>
          </div>
        </div>
        // {/* End nav bar web browser */}

        )
    }
}

export default UserHome;