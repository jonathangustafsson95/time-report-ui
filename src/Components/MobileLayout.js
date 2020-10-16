import React from "react";
import { BrowserRouter } from "react-router-dom";
import LeftSideBar from "./NavBarComponents/LeftSideBar";
import MobileMainSwitch from "./ServiceComponents/MobileMainSwitchComponent";
import styled from "styled-components";

//var MediaQuery = require('react-responsive');




const MobileLayout = () => {
  return (
    <BrowserRouter>
      <MainView>
        <LeftSideBar />
        <MobileMainSwitch />
        <div></div>
      </MainView>
    </BrowserRouter>
  );
};

const MainView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 60px;
`;

export default MobileLayout;
