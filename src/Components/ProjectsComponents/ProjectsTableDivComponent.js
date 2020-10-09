import React, { useEffect, useState } from "react";
import ProjectsTable from "./ProjectsTableComponent";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchMissionsBySearchString, fetchUserMissions } from "../../Redux/Actions/MissionActions";

const ProjectsTableDiv = ({ missions, token, fetchMissions, foundMissions, fetchBySearch }) => {
  const [tableType, setTableType] = useState({
    yourProjects: true,
    allProjects: false
  });
  const[searchString, setSearchString] = useState("");
  console.log(foundMissions);
  useEffect(() => {
    fetchMissions(token);
  }, [fetchMissions]);
  const handleClick = (type) => {
    setTableType({
      [type]: !tableType[type] 
    })

  };
  const handleOnValueChange = (e) =>{
    setSearchString(e.target.value);

  };
  const handleSearch = () => {
    fetchBySearch(searchString, token)

  };
  return (
    <div>
      <ProjectButtonsDiv>
        <input onChange={(e) => handleOnValueChange(e)}></input>
        <button onClick={() => handleSearch()}>Search</button>
        <button onClick={() => handleClick("yourProjects")}>Your projects</button>
        <button onClick={() => handleClick("allProjects")}>All projects</button>
      </ProjectButtonsDiv>

      {tableType.yourProjects ? 
      <ProjectsTable missions={missions} />
      : 
      <h1>hej</h1>
    }
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
    foundMissions: state.missionData.foundMissions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissions: (token) => dispatch(fetchUserMissions(token)),
    fetchBySearch: (searchString) => dispatch(fetchMissionsBySearchString(searchString))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTableDiv);
