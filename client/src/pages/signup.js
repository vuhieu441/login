import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import { withSnackbar } from 'notistack';
class Signup extends Component {
    constructor (props) {
        super(props);
        this.state={
          "name": "",
          "email": "",
          "password": "",
          "cpassword":""
        }
      }
      setParams = (event) =>{
        this.setState({[event.target.id] : event.target.value})
      }  
      Signup = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "name": this.state.name,
          "email": this.state.email,
          "password": this.state.password,
          "cpassword": this.state.cpassword
        });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        var password = this.state.password;
        var cpassword = this.state.cpassword;
        if(password === cpassword){
          return fetch("http://localhost:5000/users", requestOptions)
          .then(response => {
            console.log(response)
            if(response.ok){
              return response.json()
            }
            throw Error(response.status)
          })
          .then(result => {
            console.log(result)
            this.props.enqueueSnackbar('Sign up success.',{variant: 'success',})
          })
          .catch(error =>{ 
            console.log('error', error)
            this.props.enqueueSnackbar('Sign up failed.',{variant: 'error',})
          });
        }
        else{
          this.props.enqueueSnackbar('Password is not the same !',{variant: 'error',})
        }
        
      }
      
  render() {
    return (
      <div className="App">
        <form className="form">
          <CustomInput
              labelText="Name"
              id="name"
              formControlProps={{
                fullWidth: true
              }}
              onChange={this.setParams}
              type="text"
            />
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
            <CustomInput
              labelText="Comfirm Password"
              id="cpassword"
              formControlProps={{
                fullWidth: true
              }}
              onChange={this.setParams}
              type="password"
            />
            <Button type="button" color="primary" className="form__custom-button" onClick={this.Signup}>
              Sign Up
            </Button>
            <Link className="link" to='/'>
              You already have an account?
            </Link>
        </form>
      </div>
    );
  }
} 
export default withSnackbar(Signup);