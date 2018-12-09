import React, { Component } from 'react';
// utils
import { loadPreviewImage } from '../utils'

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
                <div>
                    <img
                        className="middlr"
                        alt={this.props.venue.name}
                        src={loadPreviewImage(this.props.venue)}/>
                </div>
            </li>
        );
    }
}

export default ListVenueItem;