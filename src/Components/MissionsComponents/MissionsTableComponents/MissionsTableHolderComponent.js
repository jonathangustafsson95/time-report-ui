import React, { useState } from "react";
import MissionsTable from "./MissionsTableComponent";
import { connect } from "react-redux";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import {
  fetchMissionsBySearchString,
  resetMissionsFromStore,
  fetchUserMissions,
} from "../../../Redux/Actions/MissionActions";
import { TextField } from "@material-ui/core";

const MissionsTableHolder = ({
  token,
  fetchBySearch,
  resetMissions,
  fetchUserMissions,
}) => {
  const [tableType, setTableType] = useState({
    yourProjects: true,
    allProjects: false,
  });

  const [searchString, setSearchString] = useState("");

  const handleClick = (type) => {
    resetMissions();
    type === "yourProjects" && fetchUserMissions(token, 0);

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
      <MenuSwitch>
        <Button onClick={() => handleClick("yourProjects")} act={tableType.yourProjects}>
          Your missions
        </Button>
        <Line />
        <Button onClick={() => handleClick("allProjects")} act={tableType.allProjects}>All missions</Button>
      </MenuSwitch>
      <TableDiv>
        <MissionButtonDiv>
          <IconButton size="small" onClick={() => handleSearch()}>
            <SearchIcon fontSize="small" />
          </IconButton>
          <Space />
          <TextField
            id="standard-basic"
            label="Search"
            onChange={(e) => handleOnValueChange(e)}
          />
        </MissionButtonDiv>

        {tableType.yourProjects ? (
          <MissionsTable type="userProjects" />
        ) : (
          <MissionsTable type="allProjects" />
        )}
      </TableDiv>
    </div>
  );
};

const Line = styled.hr`
  width: 0px;
  height: 25px;
  margin: 0;
  opacity: 0.6;
  margin-left: 8px;
  margin-right: 8px;
  background: transparent;
  border: 1px solid #585656;
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  background: none;
  letter-spacing: 0.08em;
  color: #585656;
  border: none;
  opacity: ${props => props.act ? 1 : 0.6};
  &:hover {
    color: #2b2a2a;
  }
  &:focus {
    border: none;
  }
`;

const Space = styled.div`
  width: 10px;
`;

const MenuSwitch = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const TableDiv = styled.div`
  border-radius: 10px;
  padding: 10px;
  padding-bottom: 0;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
`;

const MissionButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 20px;
  margin-top: 15px;
`;

const mapStateToProps = (state) => {
  return {
    token: state.authData.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBySearch: (searchString, token) =>
      dispatch(fetchMissionsBySearchString(searchString, token)),
    resetMissions: () => dispatch(resetMissionsFromStore()),
    fetchUserMissions: (token, taskId) => dispatch(fetchUserMissions(token, taskId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionsTableHolder);
