import React from "react";
import { BrowserRouter } from "react-router-dom";
import MobileMainSwitch from "./ServiceComponents/MobileMainSwitchComponent";
import Navbar from './NavBarComponents/MobileNavBar/Navbar'
import DropdownMenu from './NavBarComponents/MobileNavBar/DropdownMenu'
import './NavBarComponents/MobileNavBar/index.css'

const MobileLayout = () => {

  return (
    <BrowserRouter>
        <div style={{height: '100%'}}>
    
          <Navbar>
            <DropdownMenu />
          </Navbar>

          <main style={{ marginTop: '64px' }}>
            <MobileMainSwitch />    
          </main>
        </div>
    </BrowserRouter>
  )
};

export default MobileLayout;
