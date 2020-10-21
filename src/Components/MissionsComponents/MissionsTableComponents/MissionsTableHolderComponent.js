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
  filterMissionsBySearchstring,
  changeCurrentTableType,
} from "../../../Redux/Actions/MissionActions";
import { TextField } from "@material-ui/core";

const MissionsTableHolder = ({
  token,
  fetchBySearch,
  resetMissions,
  fetchUserMissions,
  filterMissions,
  changeCurrentTableType,
}) => {
  const [tableType, setTableType] = useState({
    yourMissions: true,
    allMissions: false,
  });

  const [searchString, setSearchString] = useState("");

  const handleClick = (type) => {
    changeCurrentTableType(type);
    type === "yourMissions"
      ? setTableType({ yourMissions: true, allMissions: false })
      : setTableType({ yourMissions: false, allMissions: true });
    resetMissions();
    type === "yourMissions"
      ? fetchUserMissions(0)
      : searchString !== "" && fetchBySearch(searchString);
  };

  const handleOnValueChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearch = () => {
    tableType.allMissions && fetchBySearch(searchString, token);
    if (tableType.yourMissions) {
      filterMissions(searchString);
    }
  };

  return (
    <div>
      <MenuSwitch>
        <Button
          onClick={() => handleClick("yourMissions")}
          act={tableType.yourMissions}
        >
          Your missions
        </Button>
        <Line />
        <Button
          onClick={() => handleClick("allMissions")}
          act={tableType.allMissions}
        >
          All missions
        </Button>
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

        {tableType.yourMissions ? (
          <MissionsTable tableType="yourMissions" />
        ) : (
          <MissionsTable tableType="allMissions" />
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
  opacity: ${(props) => (props.act ? 1 : 0.6)};
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBySearch: (searchString) =>
      dispatch(fetchMissionsBySearchString(searchString)),
    resetMissions: () => dispatch(resetMissionsFromStore()),
    fetchUserMissions: (taskId) => dispatch(fetchUserMissions(taskId)),
    filterMissions: (searchValue) =>
      dispatch(filterMissionsBySearchstring(searchValue)),
    changeCurrentTableType: (type) => dispatch(changeCurrentTableType(type)),
  };
};

export default connect(null, mapDispatchToProps)(MissionsTableHolder);
