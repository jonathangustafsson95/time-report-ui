import React from "react";
import { BrowserRouter } from "react-router-dom";
import LeftSideBar from "./NavBarComponents/LeftSideBar";
import MainSwitch from "./ServiceComponents/MainSwitchComponent";
import styled from "styled-components";

const Layout = () => {
  return (
    <BrowserRouter>
      <MainView>
        <LeftSideBar />
        <MainSwitch />
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

export default Layout;
