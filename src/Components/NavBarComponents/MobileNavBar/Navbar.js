import React, { useState } from 'react';
import { connect } from 'react-redux';

const Navbar = (props) => {
    
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {props.children}
            </ul>
        </nav>
    )
}


export default (Navbar);