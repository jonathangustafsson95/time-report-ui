import React from "react";
import { Switch, Route } from "react-router-dom";
import DashBoard from "../DashBoardComponents/DashBoard";
import TimeReport from "../TimeReportComponents/TimeReportComponent";
import ProjectsComponent from "../ProjectsComponents/ProjectsComponent";
import ProjectDetailComponent from "../ProjectsComponents/ProjectDetailComponent";
import styled from "styled-components";

const MainSwitch = () => {
  return (
    <Main>
      <Switch>
        <Route exact path="/" render={() => <DashBoard />} />
        <Route exact path="/timereport" render={() => <TimeReport />} />
        <Route exact path="/projects" render={() => <ProjectsComponent />} />
        {/* <Route exact path="/projectdetail" render={()=><ProjectDetailComponent/>}/> */}
        <Route
          exact
          path="/projects/:missionId"
          render={() => <ProjectDetailComponent />}
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
