import React, { Component } from 'react';
// components
import ListVenueItem from './ListVenueItem'

class Sidebar extends Component {

    constructor(props) {
        super(props);
        // state
        this.state = {
            sideBarOpen: true
        }
    }

    componentDidMount () {
        console.log ('Sidebar mounted correctly');
    }

    render() {
        return (
            <section className="sidebar" id="sidebar">
                <input
                    className="search-field"
                    placeholder="Search Restaurants by name"
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