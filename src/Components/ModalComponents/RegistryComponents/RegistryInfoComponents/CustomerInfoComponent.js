import React, { useEffect, useState } from "react";
import TimeInput from "../../../CommonComponents/TimeInputComponent";
import styled from "styled-components";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "@material-ui/core";
import {
  fetchUserMissions,
  changeCurrentTableType,
  resetMissionsFromStore,
  fetchMissionsBySearchString,
  filterMissionsBySearchstring,
} from "../../../../Redux/Actions/MissionActions";
import MissionTable from "../TableComponents/MissionTableComponent";
import TaskTable from "../TableComponents/TaskTableComponent";
import Alert from "@material-ui/lab/Alert";
import { isMobile } from "react-device-detect";

const CustomerInfo = ({
  registry,
  updateRegistry,
  missions,
  fetchMissions,
  resetMissions,
  changeCurrentTableType,
  fetchBySearch,
  filterMissions,
  type,
}) => {
  const [originalMission, setOriginalMission] = useState(null);
  const [currentMission, setCurrentMission] = useState(null);
  const [currentTask, setCurrentTask] = useState(registry.taskId);
  const [loading, setLoading] = useState(false);
  const tmpHour = Math.floor(registry.hours);
  const tmpMinutes = (registry.hours - tmpHour) * 60;
  const [hours, setHours] = useState(tmpHour);
  const [minutes, setMinutes] = useState(tmpMinutes);
  const [isValid, setIsValid] = useState(true);
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
    setCurrentMission(null);
    type === "yourMissions"
      ? fetchMissions(registry.taskId)
      : searchString !== "" && fetchBySearch(searchString);
  };

  const handleSearch = () => {
    setLoading(true);
    tableType.allMissions && fetchBySearch(searchString);
    if (tableType.yourMissions) {
      filterMissions(searchString);
    }
  };

  const handleOnValueChange = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    fetchMissions(registry.taskId);
  }, [registry.taskId, fetchMissions]);

  useEffect(() => {
    if (missions.length > 0) {
      const mission = missions.find(
        (mission) =>
          mission.tasks.some((task) => task.taskId === currentTask) === true
      );
      mission && setOriginalMission(mission.missionId);
      mission && setCurrentMission(mission.missionId);
      !mission && setCurrentMission(missions[0].missionId);
      setLoading(false);
    }
    
  }, [missions, currentTask]);

  const update = () => {
    if (hours === 0 && minutes === 0) {
      setIsValid(false);
      return;
    }
    const updatedReg = JSON.parse(JSON.stringify(registry));
    const mins = parseFloat(minutes) / 60;
    const time = parseFloat(hours) + mins;

    const mission = missions.find(
      (mission) => mission.missionId === currentMission
    );
    const task = mission.tasks.find((task) => task.taskId === currentTask);

    updatedReg.hours = time;
    updatedReg.taskId = currentTask;
    updatedReg.taskName = task.name;
    updatedReg.missionName = mission.missionName;
    updatedReg.missionColor = mission.missionColor;

    updateRegistry(updatedReg);
  };

  return (
    <Root>
      <MenuSwitch>
        <MissionsButton
          onClick={() => handleClick("yourMissions")}
          act={tableType.yourMissions}
        >
          Your missions
        </MissionsButton>
        <Line />
        <MissionsButton
          onClick={() => handleClick("allMissions")}
          act={tableType.allMissions}
        >
          All missions
        </MissionsButton>
      </MenuSwitch>
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
      <Main isMobile={isMobile}>
        <MissionTable
          missions={missions}
          currentMission={currentMission}
          setCurrentMission={(id) => setCurrentMission(id)}
          info={true}
        />
        <TaskTable
          missionId={currentMission}
          missions={missions}
          currentTask={currentTask}
          setCurrentTask={(id) => setCurrentTask(id)}
          info={true}
          loading={loading}
        />
      </Main>
      <TimeInput
        setHours={(value) => setHours(value)}
        setMinutes={(value) => setMinutes(value)}
        hours={hours}
        minutes={minutes}
        titleContent="Change time"
      />
      {!isValid ? <Alert severity="error">Time can't be zero</Alert> : null}
      <Button onClick={() => update()}>Update</Button>
    </Root>
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

const MissionsButton = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
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

const MenuSwitch = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  align-items: stretch;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  color: #fff;
  width: 189px;
  height: 40px;
  border-radius: 8px;
  background: #585656;
  border: 2px solid #585656;
  margin-bottom: 30px;
`;

const Space = styled.div`
  width: 10px;
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
    missions: state.missionData.missions,
    searchString: state.missionData.searchString,
    type: state.missionData.currentTableType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissions: (taskId) => dispatch(fetchUserMissions(taskId)),
    fetchBySearch: (searchString) =>
      dispatch(fetchMissionsBySearchString(searchString)),
    changeCurrentTableType: (type) => dispatch(changeCurrentTableType(type)),
    resetMissions: () => dispatch(resetMissionsFromStore()),
    filterMissions: (searchString) =>
      dispatch(filterMissionsBySearchstring(searchString)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);
