import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      "email": "",
      "password": ""
       
    }
  }
  
  setParams = (event) =>{
    this.setState({[event.target.name] : event.target.value})
  }
  Login = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/users/login", requestOptions)
      .then(response => {
        console.log(response)
        if(response.ok){
          return response.json()
        }
        throw Error(response.status)
      })
      .then(result => {
        console.log(result)
        alert("Login success")
      })
      .catch(error =>{ 
        console.log('error', error)
        alert("UserName , PassWord Wrong")
      });
  }
  render() {
    return (
      <div className="App">
      <header className="App-header">     
          <form >
            <h2>Sign in to account</h2>            
            <div className="info">          
              <input name="email" type="text" onChange={this.setParams} placeholder="  Email..."></input>
            </div>
            <div className="info">          
              <input name="password" type="password" onChange={this.setParams} placeholder="  PassWord..."></input>
            </div>        
            <button onClick={this.Login}>Sign in</button>
            <Link to='/signup'>
              <button>Sign up</button> 
            </Link>           
          </form>     
      </header>
    </div>
    );
  }
} 
export default Login;