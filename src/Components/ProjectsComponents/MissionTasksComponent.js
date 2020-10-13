import React, { useEffect } from "react";
import Media from "react-bootstrap/Media";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TaskItemComponent from "./TaskItemComponent";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserMarkedMissions } from "../../Redux/Actions/MissionActions";
const MissionTasksComponent = ({ mission, token, fetchMarkedMissions }) => {
  const { missionId } = useParams();
  console.log(missionId);
  const Id = { missionId };
  useEffect(() => {
    fetchMarkedMissions(token);
  }, []);
  const Mission = findArrayElementById(mission, Id.missionId);
  const tasks = Mission.tasks;
  console.log(tasks);
  return (
    <Media>
      <TasksDiv>
        <h3>Tasks</h3>
        {tasks.map((tasks) => (
          <TaskItemComponent key={tasks.taskId} tasks={tasks} />
        ))}
      </TasksDiv>
    </Media>
  );
};

const mapStateToProps = (state) => {
  return {
    mission: state.missionData.missions,
    token: state.authData.user.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMarkedMissions: (token) => dispatch(fetchUserMarkedMissions(token)),
  };
};

function findArrayElementById(array, Id) {
  for (const element of array) {
    console.log(Id);
    if (element.missionId == Id) {
      console.log(element);
      return element;
    }
  }
}
const TasksDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MissionTasksComponent);
