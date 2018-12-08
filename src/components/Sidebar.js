import React, { Component } from 'react';

class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar" id="sidebar">
                <input
                    value={this.props.query}
                    onChange={event => { this.props.searchForVenues(event.target.value) }} />
            </div>
        );
    }
}

export default Sidebar;