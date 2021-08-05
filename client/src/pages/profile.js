
import React, { useEffect } from 'react';
import '../App.css';
import {fetchUsers} from '../actions/usersActions';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
export function Profile ({ userData, fetchUsers }) {
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
  const Logout = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")); 
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };   
    fetch("localhost:5000/users/me/logout", requestOptions)
      .then(response => {
        console.log(response)
        if(response.ok){
          return response.json()
        }
        throw Error(response.status)
      })
      .then(result => console.log(result)) 
      .catch(error => console.log('error', error));
    localStorage.removeItem("token")
    window.location.reload()
  }
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <div className="app">
        <h2>Hello , i'm {userData &&
          userData.users &&
          userData.users.name}</h2>
        <Button type="button" color="primary" onClick={Logout}>Log Out</Button>
        
      </div>
      
    </div>
  )
}
const mapStateToProps = state => {
  return {
    userData: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
} 
export default connect(mapStateToProps,mapDispatchToProps)(Profile)