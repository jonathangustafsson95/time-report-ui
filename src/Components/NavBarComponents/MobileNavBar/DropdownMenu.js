import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { useDetectOutsideClick } from './useDetectOutsideClick';
import { connect } from "react-redux";
import { unAuthorize } from "../../../Redux/Actions/AuthActions";
import ListItem from "@material-ui/core/ListItem";

const DropdownMenu = ({signOut}) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const logout = () => {
    signOut();
  };

  const onClick = () => {
      setIsActive(!isActive);
  }

    return (
        <div className="menu-container">
          <button onClick={onClick} className="nav-button">
            &#9776;
          </button>
          <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/timereport">Time report</Link></li>
                <li><ListItem button onClick={() => logout()}>Sign out</ListItem></li>
            </ul>
          </nav>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(unAuthorize()),
  };
};

export default connect(null, mapDispatchToProps)(DropdownMenu);