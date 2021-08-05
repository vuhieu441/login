import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Profile  from './profile';
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import { withSnackbar } from "notistack";
class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      "email": "",
      "password": "",
       isLogin: localStorage.getItem("token") != null
    }
  }
  setParams = (event) =>{
    this.setState({[event.target.id] : event.target.value})
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
        this.props.enqueueSnackbar('Logged in successfully.',{variant: 'success',})
        localStorage.setItem("token", result.token)
        this.setState({isLogin: true})
      })
      .catch(error =>{ 
        console.log('error', error)
        this.props.enqueueSnackbar('Username or password incorrect.',{variant: 'error',})
      });
  }
  onLogoutSuccess = ()=>{
    this.setState({isLogin: false})
  }
  render() {
    return (
      
      <div className="App">
        {this.state.isLogin ?
          <Profile key={this.state.isLogin} onLogoutSuccess={this.onLogoutSuccess} /> : 
          <form className="form">
            <CustomInput
              labelText="Email"
              id="email"
              formControlProps={{
                fullWidth: true
              }}
              onChange={this.setParams}
              type="text"
            />
            <CustomInput
              labelText="Password"
              id="password"
              formControlProps={{
                fullWidth: true
              }}
              onChange={this.setParams}
              type="password"
            />
            <Button type="button" color="primary" className="form__custom-button" onClick={this.Login}>
              Sign In
            </Button>
            <Link className="link" to='/signup'>
              Create a new account !
            </Link>          
          </form>
  }
      </div>    
    );
  }
} 
export default withSnackbar(Login);