import React from "react";
import { BrowserRouter } from "react-router-dom";
import LeftSideBar from "./NavBarComponents/LeftSideBar";
import TopBar from "./NavBarComponents/TopBar";
import MainSwitch from "./ServiceComponents/MainSwitch";
import styled from "styled-components";
import NewLeftSideBar from "./NavBarComponents/NewLeftSideBar";

const Layout = () => {
  return (
    <BrowserRouter>
      {/* <TopBar /> */}

      <MainView>
        <NewLeftSideBar />
        {/* <LeftSideBar /> */}
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
