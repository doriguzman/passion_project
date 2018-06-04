import React, { Component } from 'react';
// Components
import UserHomeNavBar from './UserHomeNavBar';
import CaffeineContainer from './CaffeineContainer'
// import UserContainer from '../user/UserContainer.jsx';
// import UserInfo from '../user/account/UserInfo.jsx';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import AddBevForm from './AddBevForm'
import LandingPage from '../AUTH/LandingPage';
import QuickLook from './QuickLook'
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
            <QuickLook setUser= {this.props.setUser} />
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