import React from "react";
import { Switch, Route } from "react-router-dom";
import DashBoard from "../DashBoardComponents/DashBoard";
import TimeReport from "../TimeReportComponents/TimeReportComponent";
import Missions from "../MissionsComponents/MissionsComponent";
import Mission from "../MissionComponents/MissionComponent";
import styled from "styled-components";

const MainSwitch = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <DashBoard />} />
      <Route exact path="/timereport" render={() => <TimeReport />} />
      <Route exact path="/missions" render={() => <Missions />} />
      <Route exact path="/missions/:missionId" render={() => <Mission />} />
    </Switch>
  );
};

export default MainSwitch;
