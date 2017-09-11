import React, { Component } from 'react';
import Transaction from './components/transaction';
import ApiKeyForm from './components/apikey-form';
import './App.css';

class App extends Component {
  constructor(props){

  super(props);

    this.state ={
      api_key : 'ak_test_TS9bFUr3GHFoMiMrFzALO7DG6hO3xN',
      enc_key : 'ek_test_O3BDfhxbrXrHTaDujCKP6BqYVyqqNl'
    }

    this.updateKey = this.updateKey.bind(this);
  }

  updateKey(keys){
    this.setState({
      api_key: keys.api_key,
      enc_key: keys.enc_key
    })
  }

  render() {
    return (
      <div>
        <h1> Pagar-me </h1>
        <Transaction />
        <hr></hr>
        <ApiKeyForm handleKey={this.updateKey} api_key={this.state.api_key} enc_key={this.state.enc_key}/>
        <hr></hr>
      </div>
    );
  }
}

export default App;
