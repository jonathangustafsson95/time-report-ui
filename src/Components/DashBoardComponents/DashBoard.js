import React from "react";
import PieChart from "./PieChartComponent";
import BarChart from "./BarChartComponent";
import Grid from "@material-ui/core/Grid";

const DashBoard = () => {
  return ( 
    <Grid container item xs={12} justify="space-evenly" spacing={2}>
      <Grid item xs={0} md={1} lg={2}></Grid>
      <Grid item xs={12} md={4} lg={3}>
        <PieChart />
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <BarChart></BarChart>
      </Grid>
      <Grid item xs={0} md={1} lg={2}></Grid>
    </Grid>
  );
};

export default DashBoard;
