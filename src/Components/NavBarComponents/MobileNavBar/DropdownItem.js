import React from 'react';
import { Link } from 'react-router-dom';

function DropdownItem(props) {
    return (
        <Link className="menu-item">
            {props.children}
        </Link>
    );
}


export default DropdownItem;