import React, { Component } from 'react';
import UserHomeNavBar from './UserHomeNavBar';
import CaffeineContainer from './CaffeineContainer'
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import AddBevForm from './AddBevForm'
import LandingPage from '../AUTH/LandingPage';
import QuickLook from './QuickLook'
import '../stylesheets/UserHome.css'
import SingleCaffeine from '../AUTH/SingleCaffeineCheck';
class UserHome extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }

    renderAddBevForm =()=>{
        return(
            <AddBevForm setUser={this.props.setUser} />
        )
    }

    renderCaffeineContainer= () =>{
        return (
            <CaffeineContainer setUser={this.props.setUser} />
        )
    }

    renderQuickLook = () =>{
        return (
            <div className= 'quick-look-route-container'>
            <h2 className='quick-look-headers'> View How much caffeine a drink has within it's different sizes </h2>
            <SingleCaffeine setUser= {this.props.setUser}/>
            <h2 className='quick-look-headers'> Compare caffeine differences </h2>
            <QuickLook setUser= {this.props.setUser} />
            </div>
        )
    }

    render(){
        
        return(
      <div className='home-Container'>
      <UserHomeNavBar logOut={this.props.logOut}/>
        <Route exact path="/" component={this.renderCaffeineContainer} />
        {/* <Route exact path="/profile/" component={this.renderUserContainer} /> */}
        <Route exact path="/addbeverage" component={this.renderAddBevForm} />
        <Route exact path ="/quicklook" component = {this.renderQuickLook}/>

      </div> 

        )
    }
}

export default UserHome;