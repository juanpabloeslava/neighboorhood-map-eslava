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
      // venues stores all the received venues
      venues: [],
      // filteredVenues is a copy from all the venues, the one we modify and use to render
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
        this.setState( { 
          // store in both state.venues and state.filteredVenues, but only state.filteredVenues will be modified
          venues: this.venues,
          filteredVenues: this.venues
        });
        // console.log('App.allMarkers: ', this.allMarkers)
        // console.log('this.venues: ', this.venues)
        // console.log('this.state.venues: ', this.state.venues)
      })
      .catch(error => {
        console.log('Error in initial promises: ', error);
      })
  }

  // METHODS

  // show Markers depending on the search query
  filterMyVenues(searchQuery) {
    // filter venues list on the sidebar
    let filteredVenues =  this.venues.filter( venue => (
      venue.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    // filter markers
    this.allMarkers.forEach(marker => {
      marker.name.toLowerCase().includes(searchQuery.toLowerCase()) ? marker.setVisible(true) : marker.setVisible(false);
    });
    // set state
    this.setState({
      query: searchQuery,
      filteredVenues: filteredVenues
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
            onChange={ event => { this.filterMyVenues(event.target.value) } } />
            {
              // Show a list of all the filtered venues according to the search query
              <ul className="temp-venue-ul">
                {this.state.filteredVenues && this.state.filteredVenues.length > 0 && (
                  this.state.filteredVenues.map( venue => (
                    <li className="temp-venue-li" key={venue.id}>
                      {venue.name}
                    </li>
                  ))
                )}
              </ul>
            }
        </section>
      </div>
    );
  }
}

export default App;
