import React, { Component } from 'react';
import logo from './logo.svg';
import {Link, Route} from 'react-router-dom'
import './App.css';
import UserHome from './components/HOME/UserHome'
// import NewUser from './components/NewUser'
import Authorization from './components/AUTH/Authorization'
import axios from 'axios'

class App extends Component {
  constructor(){
    super();
    this.state={
      user:''
    }
  }


  setUser= user=>{
    this.setState({user:user})
  }

  logOutUser = () =>{
    console.log('trying to logout')
    axios
    .get('/users/logout')
    .then(res => {
      console.log('user is emply')
      this.setState({
        user: ''
      });
    })
    .catch(err => {
      console.log('errr', err);
    });
};
  

  componentDidMount() {
    console.log('trying to do an axios call')
    const { user } = this.state;
    axios
      .get('/users/getSingleUser')
      
      .then(res => {
        console.log('data', res)
        this.setState({
          user: res.data.user
        });
      })
      .catch(err => {
        console.log(`errrr`, err);
      });
  }

  activeSelection = ()=>{
    console.log('in the active selection portion', this.state.user)
    const {user}= this.state;
    return user ? (<UserHome  logOut={this.logOutUser} setUser={user} />):
    (<Authorization setUser={this.setUser}/>)
  }


  render() {

    const {user}= this.state 
    return (
      <div className="App">
    <this.activeSelection/>
      </div>
    );
  }
}

export default App;
