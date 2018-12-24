import React, { Component } from 'react';
// components
import MaterialIcon from 'react-google-material-icons'

class Navbar extends Component {

    render() {
        return (
            <nav role="navigation" className="navbar">
                <div className="nav-icon"
                    onClick={() => {
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
                    <h1 className="homeTitle" label="Saarbruecken Bars">Saarbrücken Bars</h1>
                </div>
                {/* <h1 class="skipTitle"><a href="#selecRestaurants" class="skipLink" aria-label="Skip to Content">Skip to main content</a></h1> */}
            </nav>
        );
    }
}

export default Navbar;