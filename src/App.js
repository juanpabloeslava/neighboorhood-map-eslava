import React, { Component } from 'react';
import './css/App.css';
// components
import Map from './components/Map'
import Sidebar from './components/Sidebar'
// utils
import { loadGoogleMaps, loadPlaces } from './utils'

class App extends Component {

  constructor(props) {
    super(props);
    // state
    this.state = {
      query: "",
      venues: [],
      filteredVenues: null
    }
  }

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
        
        // Component Properties (venues, map, google, markers, etc)
        this.venues = resp[1].response.venues;
        this.google = google;
        this.infoWindow = new google.maps.InfoWindow();
        this.allMarkers = [];
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          scrollwheel: true,
          // base the center on the venues received
          center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
        });

        // venues
        this.venues.forEach(venue => {
          // create a marker for each venue
          let marker = new google.maps.Marker({
            position: { lat: venue.location.lat, lng: venue.location.lng },
            map: this.map,
            venue: venue,
            id: venue.id,
            name: venue.name,
            animation: google.maps.Animation.DROP
          });
          // show the infoWindows when clicking on a marker
          google.maps.event.addListener(marker, 'click', () => {
            this.infoWindow.setContent(marker.name);
            // this.map.setZoom(13);
            // this.map.setCenter(marker.position);
            this.infoWindow.open(this.map, marker);
            // this.map.panBy(0, -125);
          });
          // re-center map and show infoWindow when double clicking on a marker
          google.maps.event.addListener(marker, 'dblclick', () => {
            // this.infoWindow.setContent(marker.name);
            this.map.setZoom(15);
            this.map.setCenter(marker.position);
            // this.infoWindow.open(this.map, marker);
            this.map.panBy(0, -125);
          });
          // push each marker to the Marker property on the component
          this.allMarkers.push(marker);
        });
        this.setState( { venues: this.venues} );
        // console.log('App.allMarkers: ', this.allMarkers)
        console.log('App.allMarkers: ', this.allMarkers)
        console.log('this.venues: ', this.venues)
        console.log('this.state.venues: ', this.state.venues)
      })
      .catch(error => {
        console.log(error);
      })
  }

  // METHODS

  // show Markers depending on the search query
  searchForVenues(searchQuery) {
    // go through each marker show only those that include the search query in their names and/or 
    this.allMarkers.forEach(marker => {
      marker.name.toLowerCase().includes(searchQuery.toLowerCase()) ? marker.setVisible(true) : marker.setVisible(false);
    });
    // set state
    this.setState({
      query: searchQuery
    });
  }


  // RENDER
  render() {
    return (
      <div className="App">
        <Map />
        {/* Sidebar */}
        <section className="sidebar" id="sidebar">
          <input
            className="search-field"
            placeholder="Search Restaurants by name"
            value={this.state.query}
            onChange={ event => { this.searchForVenues(event.target.value) } } />
            {
              // Show a list of all the venues, that filters according to the search query
              // this.state.venues && this.state.venues.length
            }
        </section>
      </div>
    );
  }
}

export default App;
