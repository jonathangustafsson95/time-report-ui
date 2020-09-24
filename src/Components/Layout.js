import React from "react";
import { BrowserRouter } from "react-router-dom";
import LeftSideBar from "./NavBarComponents/LeftSideBar";
import TopBar from "./NavBarComponents/TopBar";
import MainSwitch from "./ServiceComponents/MainSwitch";
import styled from "styled-components";

const Layout = () => {
  return (
    <BrowserRouter>
      <TopBar />
      <MainView>
        <LeftSideBar />
        <MainSwitch />
      </MainView>
    </BrowserRouter>
  );
};

const MainView = styled.div`
  display: flex;
  margin-top: 60px;
`;

export default Layout;
