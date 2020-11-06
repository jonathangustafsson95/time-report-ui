import React from "react";
import Grid from "@material-ui/core/Grid";
import Week from "./WeekComponents/WeekComponent";
import Menu from "./MenuComponents/MenuComponent";
import { isMobile } from "react-device-detect";

const TimeReport = () => {
  return (
    <Grid container item>
      <Grid item xs={0} lg={1}></Grid>
      <Grid container item xs={12} lg={11} spacing={isMobile ? 0 : 5}>
        <Grid item xs={12} md={10}>
          <Week />
        </Grid>
        {!isMobile && (
          <Grid item xs={4} md={2}>
            <Menu />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default TimeReport;
