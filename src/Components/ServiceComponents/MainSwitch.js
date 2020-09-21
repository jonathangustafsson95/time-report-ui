import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashBoard from '../DashBoardComponents/DashBoard';
import TimeReport from '../TimeReportComponents/TimeReport';
import Projects from '../ProjectsComponents/Projects';


const MainSwitch = () => {
    return ( 
    <div>
        <Switch>
            <Route exact path = '/' render={() => (<DashBoard />)}/>
            <Route exact path = '/timereport' render={() => (<TimeReport />)}/>
            <Route exact path = '/projects' render={() => (<Projects />)}/>
        </Switch>
    </div> 
    );
}
 
export default MainSwitch;