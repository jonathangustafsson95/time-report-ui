import React, { useEffect, useState } from "react";
import TimeInput from "../../../CommonComponents/TimeInputComponent";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchUserMissions } from "../../../../Redux/Actions/MissionActions";
import MissionTable from "./MissionTableComponent";
import TaskTable from "./TaskTableComponent";

const AddCustomerRegistry = ({ missions, fetchMissions, token }) => {
  const [currentMission, setCurrentMission] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    fetchMissions(token);
    if (missions.length > 0) {
      setCurrentMission(missions[0].MissionId);
    }
  }, [fetchMissions, missions, token]);

  const onAddRegistry = () => {
    console.log("Add customer registry");
  };

  return (
    <Root>
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
        ></TaskTable>
      </Main>
      <TimeInput
        setHours={(value) => setHours(value)}
        setMinutes={(value) => setMinutes(value)}
        hours={hours}
        minutes={minutes}
        titleContent="Add time"
      />
      <Button onClick={onAddRegistry}>Add</Button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissions: (token) => dispatch(fetchUserMissions(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomerRegistry);
