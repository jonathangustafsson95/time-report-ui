import React, { useState } from "react";
import PieChart from "./PieChartComponent";
import BarChart from "./BarChartComponent";
import RecentEvents from "../MissionComponents/RecentEventsComponent";
import styled from "styled-components";

const DashBoard = () => {
  return (
    <Root>
      <PieChart />
      <BarChart />
      <RecentEvents />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: flex-start;
`;

export default DashBoard;
