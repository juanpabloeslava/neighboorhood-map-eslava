import React, { Component } from 'react';
import './css/App.css';
// components
import Map from './components/Map2'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
// utils
import * as utils from './utils'

class App extends Component {

  constructor(props) {
    super(props);
    // state
    this.state = {
      query: "",
      sideBarShow: true,
      // venues stores all the received venues
      venues: [],
      // filteredVenues is a copy from all the venues, the one we modify and use to render
      filteredVenues: null
    }
  }

  componentDidMount() {
    // get the map and locations
    let google_map_promise = utils.loadGoogleMaps();
    let places_promise = utils.loadPlaces();
    // let places_promise = utils.loadGooglePlaces();

    // wait till it resolves all the following promises before actually doing anything
    Promise.all([
      google_map_promise,
      places_promise,
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
          // TEST FOR HOURS
          // utils.getVenueHours(venue)
          //   .then( (hoursResp) => {
          //     console.log ('Hours: ', hoursResp);
          //   });

          // create a marker for each venue
          let marker = new google.maps.Marker({
            position: { lat: venue.location.lat, lng: venue.location.lng },
            map: this.map,
            venue: venue,
            id: venue.id,
            name: venue.name,
            animation: google.maps.Animation.DROP
          });
          // infowindow content
          let infoWindowContent = `<div>
                                    <h4>${venue.name}</h4>
                                    <img class="li_venue_img" alt=${venue.name} src=${utils.loadPreviewImage(venue)}/>
                                    <p  class="li_venue_info text-strong">${venue.location.formattedAddress.join(' <br> ')}</p>                                     
                                    <a target="_blank" class="li_venue_info_link venue-name text-strong" id="li_venue_address" href="https://www.google.com/search?q${venue.name}">Search on Google</a>
                                  </div>`;
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
            this.infoWindow.setContent(infoWindowContent);
            this.map.setZoom(14);
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
            this.map.panBy(0, -100);
          });
          // push each marker to the Marker property on the component
          this.allMarkers.push(marker);
        });
        this.setState({
          // store in both state.venues and state.filteredVenues, but only state.filteredVenues will be modified
          venues: this.venues,
          filteredVenues: this.venues
        });
      })
      .catch(error => {
        console.log('Error in initial promises: ', error);
      })
  }

  // METHODS

  // search venue on google
  googleSearchVenue = (venue) => {
    window.open("https://www.google.com/search?q=" +
      venue.name + ' ' +
      venue.location.formattedAddress[venue.location.formattedAddress.length - 2], '_blank')
  }

  // show Markers depending on the search query
  filterMyVenues = (searchQuery) => {
    // filter venues list on the sidebar
    let filteredVenues = this.venues.filter(venue => (
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
    let infoWindowContent = `<div>
                              <h4>${venue.name}</h4>
                              <img class="li_venue_img" alt=${venue.name} src=${utils.loadPreviewImage(venue)}/>
                              <p  class="li_venue_info text-strong" id="li_venue_address">${venue.location.formattedAddress.join(' <br> ')}</p>                                     
                              <a target="_blank" class="li_venue_info_link venue-name text-strong" id="li_venue_address" href="https://www.google.com/search?q${venue.name}">Search on Google</a>
                            </div>`;
    // get clicked marker as the only/first result of a filtered array
    let clickedMarker = this.allMarkers.filter(marker => {
      return marker.id === venue.id
    })[0];
    // Open the venue's infowindow and animate the marker
    // if there's any animation going on, stop it. If not, just animate
    if (clickedMarker.getAnimation() !== null) {
      clickedMarker.setAnimation(null);
    } else {
      clickedMarker.setAnimation(this.google.maps.Animation.BOUNCE);
    }
    setTimeout(() => { clickedMarker.setAnimation(null) }, 1000);
    // set content for info window and open it

    // this.infoWindow.setContent(clickedMarker.name);
    this.infoWindow.setContent(infoWindowContent);
    this.infoWindow.open(this.map, clickedMarker);
  }
  // doubleclick on a venue on the list
  venueDoubleclick = (venue) => {
    // get clicked marker as the only/first result of a filtered array
    let clickedMarker = this.allMarkers.filter(marker => {
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
    this.map.panBy(0, -100);
  }

  toogleSidebar = () => {
    this.setState(state => (
      { sideBarShow: !state.sideBarShow })
    );
    console.log('sideBarShow: ', this.state.sideBarShow);
  }

  // RENDER
  render() {
    return (
      <div className="App">
        <Navbar
          // state
          sideBarShow={this.state.sideBarShow}
          // methods
          toogleSidebar={this.toogleSidebar}
        />
        <main>
          <Sidebar
            // state
            query={this.state.query}
            filteredVenues={this.state.filteredVenues}
            sideBarShow={this.state.sideBarShow}
            // methods
            filterMyVenues={this.filterMyVenues}
            venueClick={this.venueClick}
            venueDoubleclick={this.venueDoubleclick}
          />
          <Map />
        </main>
      </div>
    );
  }
}

export default App;
