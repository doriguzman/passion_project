import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
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

  // Handle input change
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // // Handle guest login button 
  // handleGuestLogin = () => {
  //   this.setState({
  //     email: 'guest',
  //     passwordInput: '123456'
  //   })
  // }

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
      <div className='login-user-container'>
        <div className='login-box'>
          <h1 className='sitefont'>Caffeine Tracker</h1>

          <form onSubmit={this.submitForm}>
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
          </form>

          <p className='login-message'>{message}</p>

        </div> {/* End login-box */}
      </div>
    );
  }
}

export default LoginForm;
