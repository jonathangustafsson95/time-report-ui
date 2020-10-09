import React, { useEffect } from "react";
import ProjectsTable from "./ProjectsTable";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchUserMissions } from "../../Redux/Actions/MissionActions";
import { fetchMissionsBySearchString } from "../../Redux/Actions/MissionActions";


const ProjectsTableDiv = ({ missions, token, fetchMissions, fetchMissionsBySearchString }) => {
  useEffect(() => {
    fetchMissions(token);
    fetchMissionsBySearchString();
  }, []);
  return (
    <div>
      <ProjectButtonsDiv>
        <button>Your projects</button>
        <button>Search projects</button>
      </ProjectButtonsDiv>


      <ProjectsTable missions={missions} />
    </div>
  );
};

const ProjectButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const mapStateToProps = (state) => {
  return {
    missions: state.missionData.missions,
    token: state.authData.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissions: (token) => dispatch(fetchUserMissions(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTableDiv);
