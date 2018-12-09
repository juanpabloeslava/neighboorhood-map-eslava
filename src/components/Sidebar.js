import React, { Component } from 'react';

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
                    <ul className="temp-venue-ul">
                        {this.props.filteredVenues && this.props.filteredVenues.length > 0 && (
                            this.props.filteredVenues.map(venue => (
                                <li
                                    className="temp-venue-li"
                                    key={venue.id}
                                    onClick={() => { this.props.venueClick(venue) }}
                                    onDoubleClick={() => { this.props.venueDoubleclick(venue) }} >
                                    {venue.name}
                                </li>
                            ))
                        )}
                    </ul>
                }
            </section>
        );
    }
}

export default Sidebar;