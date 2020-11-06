import React, { useEffect, useState } from "react";
import TimeInput from "../../../CommonComponents/TimeInputComponent";
import { connect } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  fetchUserMissions,
  changeCurrentTableType,
  resetMissionsFromStore,
  fetchMissionsBySearchString,
  filterMissionsBySearchstring,
} from "../../../../Redux/Actions/MissionActions";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "@material-ui/core";
import MissionTable from "../TableComponents/MissionTableComponent";
import TaskTable from "../TableComponents/TaskTableComponent";
import { addRegistryToStore } from "../../../../Redux/Actions/RegistryActions";
import { BeatLoader } from "react-spinners";
import Alert from "@material-ui/lab/Alert";
import { isMobile } from "react-device-detect";

const AddCustomerRegistry = ({
  date,
  onCloseModal,
  missions,
  loading,
  error,
  fetchMissions,
  addRegistry,
  resetMissions,
  changeCurrentTableType,
  fetchBySearch,
  filterMissions,
  userId,
  currentMission,
  setCurrentMission
}) => {
  const [currentTask, setCurrentTask] = useState(null);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [loadingM, setLoadingM] = useState(false);
  const [tableType, setTableType] = useState({
    yourMissions: true,
    allMissions: false,
  });
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    fetchMissions(0);
  }, [fetchMissions]);

  useEffect(() => {
    if (missions.length > 0) {
      setCurrentMission(missions[0].missionId);
      setLoadingM(false);
    }
  }, [missions]);

  const handleClick = (type) => {
    changeCurrentTableType(type);
    type === "yourMissions"
      ? setTableType({ yourMissions: true, allMissions: false })
      : setTableType({ yourMissions: false, allMissions: true });
    resetMissions();
    setCurrentMission(null);
    type === "yourMissions"
      ? fetchMissions(0)
      : searchString !== "" && fetchBySearch(searchString);
  };

  const handleSearch = () => {
    setLoadingM(true);
    tableType.allMissions && fetchBySearch(searchString);
    if (tableType.yourMissions) {
      filterMissions(searchString);
    }
  };

  const handleOnValueChange = (e) => {
    setSearchString(e.target.value);
  };

  const onAddRegistry = () => {
    if (hours === 0 && minutes === 0) {
      setIsValid(false);
      return;
    }
    const mins = parseFloat(minutes) / 60;
    const time = parseFloat(hours) + mins;
    const id = uuidv4();
    const d = new Date();

    const mission = missions.find(
      (mission) => mission.missionId === currentMission
    );
    const task = mission.tasks.find((task) => task.taskId === currentTask);
    const registryToReport = {
      registryId: 0,
      taskId: currentTask,
      userId: userId,
      hours: time,
      created: d.toJSON(),
      date: date.toJSON(),
      invoice: 1,
      uuid: id,
    };

    let day = date.getDay();
    if (day === 7) {
      day = 0;
    }

    const registry = {
      registryId: id,
      missionName: mission.missionName,
      missionColor: mission.missionColor,
      taskName: task.name,
      taskId: currentTask,
      day: day,
      hours: time,
      created: d.toJSON(),
      date: date.toJSON(),
      invoice: 0,
      new: true,
      isFromTemplate: false,
    };

    addRegistry([registry, registryToReport]);
    onCloseModal();
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
      {loading ? (
        <BeatLoader color={"#585656"} />
      ) : error ? (
        <Alert severity="error">
          Could not load missions... Check your connection.
        </Alert>
      ) : (
        <Main isMobile={isMobile}>
          <MissionTable
            missions={missions}
            currentMission={currentMission}
            setCurrentMission={(id) => setCurrentMission(id)}
          />
          <TaskTable
            missionId={currentMission}
            missions={missions}
            currentTask={currentTask}
            setCurrentTask={(id) => setCurrentTask(id)}
            loading={loadingM}
          />
        </Main>
      )}

      <TimeInput
        setHours={(value) => setHours(value)}
        setMinutes={(value) => setMinutes(value)}
        hours={hours}
        minutes={minutes}
        titleContent="Add time"
      />
      {!isValid && <Alert severity="error">Time can't be zero</Alert>}
      <Button disabled={!isValid} onClick={onAddRegistry}>
        Add
      </Button>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  overflow: scroll;
`;

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

const MenuSwitch = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Main = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  align-items: ${(props) => props.isMobile ? "center" : "stretch"};
  justify-content: ${(props) => props.isMobile ? "stretch" : "center"};
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

const mapStateToProps = (state) => {
  return {
    missions: state.missionData.missions,
    loading: state.missionData.loading,
    error: state.missionData.error,
    userId: state.authData.user.userDetails.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissions: (taskId) => dispatch(fetchUserMissions(taskId)),
    addRegistry: (registries) => dispatch(addRegistryToStore(registries)),
    fetchBySearch: (searchString) =>
      dispatch(fetchMissionsBySearchString(searchString)),
    changeCurrentTableType: (type) => dispatch(changeCurrentTableType(type)),
    resetMissions: () => dispatch(resetMissionsFromStore()),
    filterMissions: (searchString) =>
      dispatch(filterMissionsBySearchstring(searchString)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomerRegistry);
