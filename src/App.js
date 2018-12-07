import React, { Component } from 'react';
import './css/App.css';
// components
import Map from './components/map'
// utils
import { load_google_maps } from './utils'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
