import React from "react";
import { Switch, Route } from "react-router-dom";
import DashBoard from "../DashBoardComponents/DashBoard";
import MobileTimeReport from "../TimeReportComponents/MobileTimeReportComponent";
import Missions from "../MissionsComponents/MissionsComponent";
import Mission from "../MissionComponents/MissionComponent";

import styled from "styled-components";

const MainSwitch = () => {
  return (
    <Main>
      <Switch>
        <Route exact path="/" render={() => <DashBoard />} />
        <Route exact path="/timereport" render={() => <MobileTimeReport />} />
        <Route exact path="/missions" render={() => <Missions />} />
        <Route
          exact
          path="/missions/:missionId"
          render={() => <Mission />}
        />
      </Switch>
    </Main>
  );
};

const Main = styled.div`
  margin-top: 50px;
  margin-left: 20px;
`;

export default MainSwitch;
