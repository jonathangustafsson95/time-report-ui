import React, { useEffect, useState } from "react";
import TimeInput from "../../../CommonComponents/TimeInputComponent";
import { connect } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { fetchUserMissions } from "../../../../Redux/Actions/MissionActions";
import MissionTable from "./MissionTableComponent";
import TaskTable from "./TaskTableComponent";
import { addRegistryToStore } from "../../../../Redux/Actions/RegistryActions";
import { BeatLoader } from "react-spinners";
import Alert from "@material-ui/lab/Alert";

const AddCustomerRegistry = ({
  date,
  onCloseModal,
  missionData,
  missions,
  fetchMissions,
  token,
  addRegistry,
}) => {
  const [currentMission, setCurrentMission] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    fetchMissions(token);
  }, [fetchMissions, token]);

  useEffect(() => {
    if (missions.length > 0) {
      setCurrentMission(missions[0].missionId);
    }
  }, [missions]);

  const onAddRegistry = () => {
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
      userId: 1,
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
      {missionData.loading ? (
        <BeatLoader color={"#585656"} />
      ) : missionData.error ? (
        <Alert severity="error">
          Could not load missions... Check your connection.
        </Alert>
      ) : (
        <Main>
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
          />
        </Main>
      )}

      <TimeInput
        setHours={(value) => setHours(value)}
        setMinutes={(value) => setMinutes(value)}
        hours={hours}
        minutes={minutes}
        titleContent="Add time"
        setIsValid={(x) => setIsValid(x)}
      />
      <Button disabled={!isValid} onClick={onAddRegistry}>Add</Button>
    </Root>
  );
};

const Root = styled.div`
  text-align: center;
`;

const Main = styled.div`
  display: flex;
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
`;

const mapStateToProps = (state) => {
  return {
    missions: state.missionData.missions,
    token: state.authData.user.token,
    missionData: state.missionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissions: (token) => dispatch(fetchUserMissions(token)),
    addRegistry: (registries) => dispatch(addRegistryToStore(registries)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomerRegistry);
