import React from "react";
import Grid from "@material-ui/core/Grid";
import Week from "./WeekComponents/WeekComponent";
import Menu from "./MenuComponents/MenuComponent";
import { BrowserView } from "react-device-detect";

const TimeReport = () => {
  return (
    <Grid container item>
      <Grid item xs={0} lg={1}></Grid>
      <Grid container item xs={12} lg={11} spacing={2}>
        <Grid item xs={10}>
          <Week />
        </Grid>
        <Grid item xs={2}>
          <BrowserView>
            <Menu />
          </BrowserView>
        </Grid>
      </Grid>
      <Grid item xs={0} md={0}></Grid>
    </Grid>
  );
};

export default TimeReport;
