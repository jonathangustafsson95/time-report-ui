import React, { useEffect, useState } from "react";
import TimeInput from "../../../CommonComponents/TimeInputComponent";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchUserMissions } from "../../../../Redux/Actions/MissionActions";
import MissionTable from "../TableComponents/MissionTableComponent";
import TaskTable from "../TableComponents/TaskTableComponent";
import Alert from "@material-ui/lab/Alert";
import { isMobile } from "react-device-detect";

const CustomerInfo = ({
  registry,
  updateRegistry,
  missions,
  fetchMissions,
}) => {
  const [currentMission, setCurrentMission] = useState(null);
  const [currentTask, setCurrentTask] = useState(registry.taskId);
  const tmpHour = Math.floor(registry.hours);
  const tmpMinutes = (registry.hours - tmpHour) * 60;
  const [hours, setHours] = useState(tmpHour);
  const [minutes, setMinutes] = useState(tmpMinutes);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    fetchMissions(registry.taskId);
  }, [registry.taskId, fetchMissions]);

  useEffect(() => {
    if (missions.length > 0) {
      const mission = missions.find(
        (mission) =>
          mission.tasks.some((task) => task.taskId === currentTask) === true
      );
      mission && setCurrentMission(mission.missionId);
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

const Root = styled.div`
  text-align: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  align-items: center;
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

const mapStateToProps = (state) => {
  return {
    missions: state.missionData.missions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissions: (taskId) => dispatch(fetchUserMissions(taskId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);
