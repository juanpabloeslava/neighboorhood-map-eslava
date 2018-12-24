import React, { Component } from 'react';
// components
import MaterialIcon from 'react-google-material-icons'

class Navbar extends Component {

    // constructor(props) {
    //     super(props);
    //     // state
    //     this.state = {
    //         sideBarOpen: true
    //     }
    // }

    componentDidMount() {
        console.log('Navbar mounted correctly');
    }

    render() {
        return (
            <nav role="navigation" className="navbar">
                <div className="nav-icon">
                    <MaterialIcon icon="menu" size={36}/>
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