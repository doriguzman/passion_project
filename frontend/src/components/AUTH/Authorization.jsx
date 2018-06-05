import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import LandingPage from './LandingPage.jsx';
import '../stylesheets/NavBar.css'




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
     <div className='navigation-backdrop'>
        <nav className="top-navigation">
          <div className="top-navigation-left">
          <h3 onClick={this.setForm} id="login"> LOGIN </h3>
            </div>
            <div className='top-navigation-middle'>
                 <img onClick={this.setForm} id="default" src= {require('../images/coffee-logo.png')} /></div>


          <div className="top-navigation-right">
            
            <h3 onClick={this.setForm} id="signup">
              SIGN UP
            </h3>
          </div>
        </nav>
        <h1 id='nav-intro'> Welcome to 
        <br/>the Caffeine Intake Tracker </h1>
        </div>
        <this.displayComponent formType={formType} />
       
      

      </div>
      {/* <img src={require('../images/twitter.png')}/> */}
      </div>
      )}
      }

      export default Authorization;