import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Pagar Me PoC</h2>
        </div>
        <p className="App-intro">
          Creating a form and post it!
        </p>
      </div>
    );
  }
}

export default App;
