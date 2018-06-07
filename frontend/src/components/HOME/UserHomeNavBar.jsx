import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
import '../stylesheets/HomeNavBar.css'


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
         
          <div>  <Link to ='/'> <img onClick={this.setForm} id="default" src= {require('../images/coffee-logo.png')} /></Link> </div>
           <div> <h3><Link to="/">HOME</Link></h3></div>
           <div>  <h3><Link to="/addbeverage"> ADD BEVERAGE</Link></h3> </div>
            <div><h3><Link to="/quicklook">QUICK LOOK</Link></h3></div>
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