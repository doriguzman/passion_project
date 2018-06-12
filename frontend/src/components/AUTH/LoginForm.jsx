import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import '../stylesheets/login.css'
// import Profile from './Profile'
// import './stylesheets/login.css'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      passwordInput: '',
      message: '',
      loggedIn: false
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  

  submitForm = e => {
    e.preventDefault()
    const { email, passwordInput, loggedIn } = this.state
      axios
        .post('/users/login', {
          username: email,
          password: passwordInput
        })
        .then(res => {
          console.log(res.data)
          this.props.setUser(res.data)
        })
        .catch(err => {
          this.setState({
            email: '',
            passwordInput: '',
            message: 'incorrect username/password'
          })
        })
  }

  render() {
    const { email, passwordInput, message, loggedIn } = this.state
    console.log(this.state)

    return (
      <div className='login-user-container' id='loginsection'>


          <form onSubmit={this.submitForm}>
         <p> <h1>LOGIN </h1></p>
            <input
              placeholder='email'
              type='email'
              name='email'
              value={email}
              onChange={this.handleInput}
              required />
            <input
              placeholder='Password'
              type='password'
              name='passwordInput'
              value={passwordInput}
              onChange={this.handleInput}
              required />
            <input type='submit' value='Log in' />
            {/* <input type='button' value='Guest' onClick={this.handleGuestLogin} /> */}
            <p className='message'>{message}</p>
            <a className= 'redirect' href='#home'> <p>Back To Top </p></a>
          </form>


         

      
      </div>
    );
  }
}

export default LoginForm;
