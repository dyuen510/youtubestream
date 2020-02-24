import React, { Component } from 'react';
import './App.css';
import { _signUp, _login } from './components/AuthService';
import Chat from './components/Chat.js'
import Youtube from './components/Youtube.js'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
    console.log(this.state.userinfo)
  }

  getToken = () => {
    return localStorage.getItem('token');
  }


  signUp = (event) => {
    event.preventDefault();

    let inputs = event.target.children;
    let username = inputs[0].value;
    let password = inputs[1].value;
    let passwordConf = inputs[2].value;

    if (password == passwordConf){

      return _signUp(username, password).then(res => {
        console.log(res);
        alert(res.message)
      });

    }else{
      alert('your password and password confirmation have to match!')
    }

  }

    login = (event,props) => {
    event.preventDefault();


    let inputs = event.target.children;

    let username = inputs[0].value;
    let password = inputs[1].value;

    this.setState({
      userinfo: username
    })


    

    return _login(username, password).then(res => {
      if (res.token){
        this.setState({logged_in: true}, function(){
          localStorage.setItem('token', res.token);
          console.log(username) 
        });

      }else{
        alert('you were not logged in')
      }
    });
  }

  logout = (event) => {
    event.preventDefault();
    
    this.setState({logged_in: false}, function(){
      localStorage.removeItem('token');
    });
  }


  render() {
    
    return (
      
      <div className="App">
        <header>

          {!this.state.logged_in && 
          
          <div className="container">
            <h1 id ='head'>Utube</h1>
            <h2>Sign Up</h2>
            <form>
            <input className="form-input" type="text" name="firstname" placeholder="First Name" />
              <input className="form-input" type="text" name="lastname" placeholder="Last Name" />
            </form>
            <form id="signUpForm" onSubmit={this.signUp}>
              <input className="form-input" type="text" name="username" placeholder="put in a username" />
              <input className="form-input" type="password" name="password" placeholder="put in a password" />
              <input className="form-input" type="password" name="password" placeholder="confirm your password" />

              <button className="submitButton">Sign Up</button>
              {/* <a href='/login' >have an account</a> */}
            </form>
            {/* < signin /> */}
            <h2>Log In</h2>

            <form id="logInForm" onSubmit={this.login}>
              <input class="form-input" type="text" name="username" placeholder="put in a username" />
              <input class="form-input" type="password" name="password" placeholder="put in a password" />

              <button class="submitButton">Log In</button>
            </form>

            <br /><br /><br />
          </div>}

          {this.state.logged_in && 
            // < home />
          <div>
            <div id="youtube-logo">
              {/* {console.log(this.state.userinfo)} */}
              uTUBE
            </div>
            <div>
            <form id="logOutForm" onSubmit={this.logout}>
              <button class="logoutButton">Log Out</button>
            </form>
            </div>
            <div>
              <h1 id = 'welcome'> Hi {this.state.userinfo}</h1>
            </div>
            <div>
            <Youtube />
            </div>
            <div>
              <Chat userinfo = {this.state.userinfo}/>
            </div>


          </div>
          }

        </header>
      </div>
    );
  }
}

export default App

