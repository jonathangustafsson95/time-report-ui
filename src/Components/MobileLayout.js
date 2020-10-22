import React from "react";
import { BrowserRouter } from "react-router-dom";
import MobileMainSwitch from "./ServiceComponents/MobileMainSwitchComponent";
import Navbar from "./NavBarComponents/MobileNavBar/Navbar";
import MobileNavBar from "./NavBarComponents/MobileNavBar";
import "./NavBarComponents/MobileNavBar/index.css";

const MobileLayout = () => {
  return (
    <BrowserRouter>
      <div style={{ height: "100%" }}>
        <Navbar>
          <MobileNavBar />
        </Navbar>

        <main style={{ marginTop: "64px" }}>
          <MobileMainSwitch />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default MobileLayout;
