import React, { Component } from 'react';
// components
import MaterialIcon from 'react-google-material-icons'

class Navbar extends Component {

    render() {
        return (
            <nav role="navigation" className="navbar">
                <div className="nav-icon" tabIndex="0"
                    onClick={() => {
                        this.props.toogleSidebar()
                    }}
                    onKeyPress={() => {
                        this.props.toogleSidebar()
                    }}
                >
                    { 
                        this.props.sideBarShow ? 
                        <MaterialIcon icon="menu" size={36}/> :
                        <MaterialIcon icon="clear" size={36}/> 
                    }
                </div>
                <div className="nav-title">
                    <h1  tabIndex="0" className="homeTitle" aria-label="Saarbruecken Bars">Saarbrücken Bars</h1>
                </div>
            </nav>
        );
    }
}

export default Navbar;