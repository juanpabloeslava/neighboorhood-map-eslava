import React, { Component } from 'react';
// utils
import { loadPreviewImage, getVenueHours } from '../utils'

class ListVenueItem extends Component {

    render() {
        return (
            <li
                className="venue-listitem"
                // methods
                onClick={() => { this.props.venueClick(this.props.venue) }}
                onDoubleClick={() => { this.props.venueDoubleclick(this.props.venue) }}
            >
                <h4 className="venue-name" alt={this.props.venue.name} label={this.props.venue.name}>
                    {this.props.venue.name}
                </h4>

                <img
                    className="li_venue_img"
                    alt={this.props.venue.name}
                    src={loadPreviewImage(this.props.venue)}
                />
                <p className="li_venue_info" label="address" id="li_venue_address">
                    {
                        // map each element of the address array into their own span, and add linebreaks if needed
                        this.props.venue.location.formattedAddress.map( (address, index) => {
                            return this.props.venue.location.formattedAddress.length === 1 ?
                            <span key={index}>{address}</span> :
                            <span key={index}>{address}<br/></span> 
                        })
                    }
                </p>
                <p className="li_venue_info_link venue-name"
                    onClick={ () => { 
                        window.open("https://www.google.com/search?q=" + this.props.venue.name + ' ' + this.props.venue.location.formattedAddress[this.props.venue.location.formattedAddress.length - 2], '_blank') 
                    }}
                    onKeyPress={ event => { 
                        this.linkspanKeyEnter(event, this.props.venue) 
                    }}
                >
                    Search on Google
                </p>
                {/* <p className="li_venue_info" id="li_venue_phone">Phone</p> */}
                {/* <p className="li_venue_info" id="li_venue_hours">Hours: </p> */}

            </li>
        );
    }
}

export default ListVenueItem;