import React, { Component } from 'react';
// utils
import { loadPreviewImage } from '../utils'

class ListVenueItem extends Component {

    render() {
        return (
            <li
                className="venue-listitem"
                // methods
                onClick={() => { this.props.venueClick(this.props.venue) }}
                onDoubleClick={() => { this.props.venueDoubleclick(this.props.venue) }} 
            >
                <h4 className="venue-name" alt={this.props.venue.name}>
                    {this.props.venue.name}
                </h4>
                <div>
                    <img
                        className="middlr"
                        alt={this.props.venue.name}
                        src={loadPreviewImage(this.props.venue)}/>
                </div>
                <p>Address</p>
                <p>Phone</p>
                <p>Hours</p>
            </li>
        );
    }
}

export default ListVenueItem;