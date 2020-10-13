import React, { useEffect } from "react";
import MarkedProjectsComponent from "./MarkedProjectsComponent";
import ProjectsTableDivComponent from "./ProjectsTableDivComponent";
import { connect } from "react-redux";
import { fetchMissionData } from "../../Redux/Actions/MissionActions";

const Projects = ({ token, fetchMissionData, isMissionStatusUpdated }) => {
  useEffect(() => {
    fetchMissionData(token);
  }, [token, fetchMissionData, isMissionStatusUpdated]);

  return (
    <div>
      <MarkedProjectsComponent />
      <ProjectsTableDivComponent />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authData.user.token,
    isMissionStatusUpdated: state.missionData.isMissionStatusUpdated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissionData: (token) => dispatch(fetchMissionData(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
