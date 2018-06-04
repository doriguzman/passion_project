import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      firstName: '',
      password: '',
      retypePassword: '',
      message: null,
      photo_url:''
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      username,
      firstName,
      password,
      retypePassword, 
      photo_url
    } = this.state;

    if (password.length < 6) {
      this.setState({
        message: 'Password too short'
      });
    } else if (password !== retypePassword) {
      this.setState({
        message: 'Passwords do not match'
      });
    } else {

      axios
        .post('/users/newuser', {
          username: username,
          firstName: firstName,
          password: password,
          photo_url: photo_url
        })
        .then(() => {
          axios
            .post('/users/login', {
              username: username,
              password: password
            })
            .then(res => {
              this.props.setUser(res.data)
            })
            .catch(err => {
              console.log(err);
              this.setState({
                message: 'Error logging in'
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            username: '',
            password: '',
            message: 'Error registering'
          });
        });
    }
  };

 

  render() {
    const {
      username,
      firstName,
      password,
      retypePassword,
      message, 
      photo_url
    } = this.state;
    const errorMessage = message ? <p>{message}</p> : null;

    return (
      <div className="signup-user-container " >
        <form onSubmit={this.handleSubmit}>
          {errorMessage}
       
            <input
              placeholder="First name"
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleInput}
              required
            />
            <input
            placeholder="Email"
            type="email"
            value={username}
            name="username"
            onChange={this.handleInput}
            required
          />

          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Retype password"
            type="password"
            name="retypePassword"
            value={retypePassword}
            onChange={this.handleInput}
            required
          />
           <input
            placeholder="ya pic"
            type="text"
            name="photo_url"
            value={photo_url}
            onChange={this.handleInput}
            
          />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignupForm
