import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';



class Signup extends Component {
    constructor (props) {
        super(props);
        this.state={
          "name": "",
          "email": "",
          "password": ""
        }
      }
    
      
    
      setParams = (event) =>{
        this.setState({[event.target.name] : event.target.value})
      }
    
      Signup = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "name": this.state.name,
          "email": this.state.email,
          "password": this.state.password
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:5000/users", requestOptions)
        .then(response => {
          console.log(response)
          if(response.ok){
            return response.json()
          }
          throw Error(response.status)
        })
        .then(result => {
          console.log(result)
          alert(" Signup success")
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
            <h2>Sign up to account</h2>
            <div className="info">
            
              <input name="name" type="text" onChange={this.setParams} placeholder="  Name..."></input>
            </div>
            <div className="info">
              
              <input name="email" type="text" onChange={this.setParams} placeholder="  Email..."></input>
            </div>
            <div className="info">
              
              <input name="password" type="password" onChange={this.setParams} placeholder="  PassWord..."></input>
            </div>
            <Link to='/'>
            <button>Sign in</button> 
          </Link>
            <button onClick={this.Signup}>Sign Up</button>
            
          </form>
        </header>
      </div>
    );
  }
} 
export default Signup;