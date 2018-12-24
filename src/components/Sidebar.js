import React, { Component } from 'react';
// components
import ListVenueItem from './ListVenueItem'

class Sidebar extends Component {

    // componentDidMount () {
    //     this.displayStyle = this.props.sideBarShow ? 'flex' : 'none';
    // }

    render() {
        let sidebarStyle = this.props.sideBarShow ? "flex" : "none";
        return (
            <section className="sidebar" id="sidebar" style={{ display: sidebarStyle }}>
                <input
                    className="search-field"
                    placeholder="Search Restaurants by name"
                    aria-label="Search Restaurants"
                    value={this.props.query}
                    onChange={event => { this.props.filterMyVenues(event.target.value) }} />
                {
                    // Show a list of all the filtered venues according to the search query
                    <ul className="venue-list">
                        {this.props.filteredVenues && this.props.filteredVenues.length > 0 && (
                            this.props.filteredVenues.map(venue => (
                                // Venue Item
                                <ListVenueItem
                                    venue={venue}
                                    key={venue.id}
                                    // methods
                                    venueClick={this.props.venueClick}
                                    venueDoubleclick={this.props.venueDoubleclick}
                                />
                            ))
                        )}
                    </ul>
                }
            </section>
        );
       
    }
}

export default Sidebar;