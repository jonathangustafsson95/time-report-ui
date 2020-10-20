import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { useDetectOutsideClick } from './useDetectOutsideClick';

const DropdownMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);


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
                <li> <Link to="/" style="color:black">Dashboard</Link></li>
                <li><Link to="/timereport" style="color:black">Time report</Link></li>
            </ul>
          </nav>
        </div>
    );
}

export default DropdownMenu;