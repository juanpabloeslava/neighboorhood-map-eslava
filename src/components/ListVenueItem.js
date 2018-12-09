import React, { Component } from 'react';

class ListVenueItem extends Component {

    render() {
        return (
            <li
                className="temp-venue-li"
                // methods
                onClick={() => { this.props.venueClick(this.props.venue) }}
                onDoubleClick={() => { this.props.venueDoubleclick(this.props.venue) }} 
            >
                <div>
                    {this.props.venue.name}
                </div>
            </li>
        );
    }
}

export default ListVenueItem;