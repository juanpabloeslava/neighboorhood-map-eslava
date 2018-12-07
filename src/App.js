import React, { Component } from 'react';
import './css/App.css';
// components
import Map from './components/map'
// utils
import { loadGoogleMaps, loadPlaces } from './utils'

class App extends Component {

  componentDidMount () {
    // get the map and locations
    let google_map_promise = loadGoogleMaps();
    let places_promise = loadPlaces();

    // wait till it resolves all the following promises before actually doing anything
    Promise.all([
      google_map_promise,
      places_promise
    ])
      .then( resp => {
        console.log (resp);
      })
      .catch( error => {
        console.log (error);
      })
  }

  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
