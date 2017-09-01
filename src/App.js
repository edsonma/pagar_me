import React, { Component } from 'react';
import Transaction from './components/transaction';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1> Pagar-me POC </h1>
        <Transaction> </Transaction>
      </div>
    );
  }
}

export default App;
