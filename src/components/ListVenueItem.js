import React, { Component } from 'react';
// utils
import { loadPreviewImage, stringArray } from '../utils'

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

                <img
                    className="li_venue_img"
                    alt={this.props.venue.name}
                    src={loadPreviewImage(this.props.venue)}
                />
                {/* <p  className="li_venue_info" id="li_venue_address"><a>Address:</a> {this.props.venue.location.formattedAddress.toString()}</p> */}
                <p className="li_venue_info" id="li_venue_address">Address: {stringArray(this.props.venue.location.formattedAddress)}</p>
                <p className="li_venue_info" id="li_venue_phone">Phone: </p>
                <p className="li_venue_info" id="li_venue_hours">Hours: </p>

            </li>
        );
    }
}

export default ListVenueItem;