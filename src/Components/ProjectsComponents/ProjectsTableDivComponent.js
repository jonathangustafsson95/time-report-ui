import React, { useState } from "react";
import ProjectsTable from "./ProjectsTableComponent";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  fetchMissionsBySearchString,
  resetMissionsFromStore,
  fetchUserMissions,
} from "../../Redux/Actions/MissionActions";

const ProjectsTableDiv = ({
  token,
  fetchBySearch,
  resetMissions,
  fetchUserMissions,
}) => {
  const [tableType, setTableType] = useState({
    yourProjects: true,
    allProjects: false,
  });
  console.log(token);

  const [searchString, setSearchString] = useState("");

  const handleClick = (type) => {
    resetMissions();
    type === "yourProjects" && fetchUserMissions(token);

    setTableType({
      [type]: !tableType[type],
    });
  };

  const handleOnValueChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearch = () => {
    tableType.allProjects && fetchBySearch(searchString, token);
  };

  return (
    <div>
      <ProjectButtonsDiv>
        <input onChange={(e) => handleOnValueChange(e)}></input>
        <button onClick={() => handleSearch()}>Search</button>
        <button onClick={() => handleClick("yourProjects")}>
          Your projects
        </button>
        <button onClick={() => handleClick("allProjects")}>All projects</button>
      </ProjectButtonsDiv>

      {tableType.yourProjects ? (
        <ProjectsTable type="userProjects" />
      ) : (
        <ProjectsTable type="allProjects" />
      )}
    </div>
  );
};

const ProjectButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const mapStateToProps = (state) => {
  return {
    token: state.authData.user.token,
    foundMissions: state.missionData.foundMissions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBySearch: (searchString, token) =>
      dispatch(fetchMissionsBySearchString(searchString, token)),
    resetMissions: () => dispatch(resetMissionsFromStore()),
    fetchUserMissions: (token) => dispatch(fetchUserMissions(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTableDiv);
