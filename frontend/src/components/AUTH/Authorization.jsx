import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import LandingPage from './LandingPage.jsx';
// import '../../stylesheets/top-nav.css';




class Authorization extends React.Component{
    constructor(){
        super();
        this.state={
            formType:'default'
        }
    }


displayComponent = (props)=>{
    if (props.formType === 'default'){
        return(<LandingPage  setUser={this.props.setUser} setForm={this.setForm}/>)
    }
    if (props.formType === 'login'){
        return(<LoginForm setUser={this.props.setUser}/>)
    }
    if(props.formType === 'signup'){
        return(<SignupForm setUser={this.props.setUser}/>)
    }
}

setForm= (e)=>{
    this.setState({
    formType:e.target.id
    })
}


render(){
    const {formType}=this.state;
    return(
        <div className='authorization'>
     <div className="auth-container">
        <nav className="top-navigation">
          <div className="top-navigation-left">
          <h3 onClick = {this.setForm} id ='default'>
          Caffeine Tracker
          </h3>
            {/* <img
              onClick={this.setForm}
              id="default"
              src="https://i.imgur.com/JdYm85w.png"
              alt="elevate"
            /> */}
          </div>
          <div className="top-navigation-right">
            <h3 onClick={this.setForm} id="login">
              LOGIN
            </h3>
            <h3 onClick={this.setForm} id="signup">
              SIGN UP
            </h3>
          </div>
        </nav>
        <this.displayComponent formType={formType} />

      </div>
      <img src={require('../images/twitter.png')}/>
      </div>
      )}
      }

      export default Authorization;