import React from "react";
import { BrowserRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import MainSwitch from "./ServiceComponents/MainSwitchComponent";
import NavBar from "./NavBarComponents/NavBarComponent";

const Layout = () => {
  return (
    <BrowserRouter>
      <Grid container >
        <Grid container item xs={12}>
          <NavBar></NavBar>
        </Grid>
        <Grid item xs={12}>
          <MainSwitch />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
};

export default Layout;
