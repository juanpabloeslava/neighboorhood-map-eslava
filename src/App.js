import React, { Component } from 'react';
import './css/App.css';
// components
import Map from './components/Map'
import Sidebar from './components/Sidebar'
// utils
import { loadGoogleMaps, loadPlaces } from './utils'

class App extends Component {

  componentDidMount() {
    // get the map and locations
    let google_map_promise = loadGoogleMaps();
    let places_promise = loadPlaces();

    // wait till it resolves all the following promises before actually doing anything
    Promise.all([
      google_map_promise,
      places_promise
    ])
      .then(resp => {
        console.log('All promises were resolved on Component Mount: ', resp)
        // store each returned promise into its own variable
        let google = resp[0];
        let venues = resp[1].response.venues;

        // Component Properties (map, google, markers, etc)
        this.google = google;
        this.infoWindow = new google.maps.InfoWindow();
        this.markers = [];
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          scrollwheel: true,
          // base the center on the venues received
          center: { lat: venues[0].location.lat, lng: venues[0].location.lng }
        });

        // venues
        venues.forEach(venue => {
          // create a marker for each venue
          let marker = new google.maps.Marker({
            position: { lat: venue.location.lat, lng: venue.location.lng },
            map: this.map,
            venue: venue,
            id: venue.id,
            name: venue.name,
            animation: google.maps.Animation.DROP
          });
          // push each marker to the Marker property on the component
          this.markers.push(marker);
        });
        console.log ('those markers', this.markers)
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <Map />
        <Sidebar />
      </div>
    );
  }
}

export default App;
