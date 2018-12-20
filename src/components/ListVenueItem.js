import React, { Component } from 'react';
// utils
import { loadPreviewImage, showAddress } from '../utils'

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
                <p className="li_venue_info" label="address" id="li_venue_address">
                    {
                        this.props.venue.location.formattedAddress.map( address => {
                            return this.props.venue.location.formattedAddress.length === 1 ?
                            <span key={this.props.venue.id}>{address}</span> :
                            <span key={this.props.venue.id}>{address}<br/></span> 
                        })
                    }
                </p>
                <p className="li_venue_info" id="li_venue_phone">Phone: </p>
                <p className="li_venue_info" id="li_venue_hours">Hours: </p>

            </li>
        );
    }
}

export default ListVenueItem;