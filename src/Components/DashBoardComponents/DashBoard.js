import React, { useState } from "react";
import SnackBar from "../SnackBarComponents/SnackBarComponent";
import { connect } from "react-redux";
import PieChart from "./PieChartComponent";
import BarChart from "./BarChartComponent";
import RecentEvents from "../MissionComponents/RecentEventsComponent";
import styled from "styled-components";

const DashBoard = ({ isSuccesfullySaved }) => {
  const [showSnackBar, setShowSnackBar] = useState(true);

  return (
    <Root>
      {isSuccesfullySaved && (
        <SnackBar show={showSnackBar} hide={() => setShowSnackBar(false)} />
      )}
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

const mapStateToProps = (state) => {
  return {
    isSuccesfullySaved: state.registryData.isSuccesfullySaved,
  };
};

export default connect(mapStateToProps)(DashBoard);
