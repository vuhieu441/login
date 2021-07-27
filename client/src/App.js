import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router , Route , Switch  } from 'react-router-dom';
import Login from './components/login'; 
import Signup from './components/signup';


class App extends Component {
  

  render() {
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/signup' exact component={Signup}/>
         
          </Switch>
        </Router>
        
      </div> 
    )
  }
};

export default App;