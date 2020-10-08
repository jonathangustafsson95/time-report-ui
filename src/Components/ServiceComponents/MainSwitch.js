import React from "react";
import { Switch, Route } from "react-router-dom";
import DashBoard from "../DashBoardComponents/DashBoard";
import TimeReport from "../TimeReportComponents/TimeReportComponent";
import ProjectsComponent from "../ProjectsComponents/ProjectsComponent";
import ProjectDetailComponent from "../ProjectsComponents/ProjectDetailComponent";

const MainSwitch = () => {
  return (
    <div>
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
    </div>
  );
};

export default MainSwitch;
