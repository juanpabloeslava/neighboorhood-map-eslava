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
        // create a google map instance
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
          // MARKER CLICK: show the infoWindows when clicking on a marker
          google.maps.event.addListener(marker, 'click', () => {
            // handle animation: if there's any animation going on, stop it. If not, just animate
            if (marker.getAnimation() !== null) { 
              marker.setAnimation(null); 
            } else { 
              marker.setAnimation(google.maps.Animation.BOUNCE); 
            }
            setTimeout(() => { marker.setAnimation(null) }, 1000);
            // set content for info window and open it
            this.infoWindow.setContent(marker.name);
            this.infoWindow.open(this.map, marker);
          });

          // MARKER DOUBLE CLICK: re-center map and show infoWindow when double clicking on a marker
          google.maps.event.addListener(marker, 'dblclick', () => {
            // handle animation: if there's any animation going on, stop it. If not, just animate
            if (marker.getAnimation() !== null) { 
              marker.setAnimation(null); 
            } else { 
              marker.setAnimation(google.maps.Animation.BOUNCE); 
            }
            setTimeout(() => { marker.setAnimation(null) }, 1000);
            // focus on clicked infoWindow
            this.map.setZoom(15);
            this.map.setCenter(marker.position);
            this.map.panBy(-100, -100);
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
  filterMyVenues = (searchQuery) => {
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

  // click on a venue on the list
  venueClick = (venue) => {
    // get clicked marker as the only/first result of a filtered array
    let clickedMarker = this.allMarkers.filter( marker => {
      return marker.id === venue.id
    })[0];
    // Open the venue's infowindow and animate the marker
    // handle animation: if there's any animation going on, stop it. If not, just animate
    if (clickedMarker.getAnimation() !== null) { 
      clickedMarker.setAnimation(null); 
    } else { 
      clickedMarker.setAnimation(this.google.maps.Animation.BOUNCE); 
    }
    setTimeout(() => { clickedMarker.setAnimation(null) }, 1000);
    // set content for info window and open it
    this.infoWindow.setContent(clickedMarker.name);
    this.infoWindow.open(this.map, clickedMarker);
  }
  // doubleclick on a venue on the list
  venueDoubleclick = (venue) => {
    // get clicked marker as the only/first result of a filtered array
    let clickedMarker = this.allMarkers.filter( marker => {
      return marker.id === venue.id
    })[0];
    // Open the venue's infowindow and animate the marker
    // handle animation: if there's any animation going on, stop it. If not, just animate
    if (clickedMarker.getAnimation() !== null) { 
      clickedMarker.setAnimation(null); 
    } else { 
      clickedMarker.setAnimation(this.google.maps.Animation.BOUNCE); 
    }
    setTimeout(() => { clickedMarker.setAnimation(null) }, 1000);
    // focus on clicked infoWindow
    this.map.setZoom(15);
    this.map.setCenter(clickedMarker.position);
    this.map.panBy(-100, -100);
  }

  // RENDER
  render() {
    return (
      <div className="App">

        <Map />
        {/* Sidebar */}
        <Sidebar
          // state
          query={this.state.query}
          filteredVenues={this.state.filteredVenues}
          // methods
          filterMyVenues={this.filterMyVenues}
          venueClick={this.venueClick}
          venueDoubleclick={this.venueDoubleclick}
        />
      </div>
    );
  }
}

export default App;
