import React from "react";
import styled from "styled-components";
import Icon from "../../WeekComponents/IconComponent";
import Grid from "@material-ui/core/Grid";

const TaskItem = ({ task, mission }) => {
  const handleOnDrag = (e) => {
    const registry = {
      registryId: 0,
      missionName: mission.missionName,
      missionColor: mission.color,
      taskName: task.name,
      taskId: task.taskId,
      hours: 1,
      created: new Date(),
      date: new Date(),
      invoice: 1,
    };
    e.dataTransfer.setData("registry", JSON.stringify(registry));
    e.dataTransfer.setData("from", "latestRegistries");
  };

  return (
    <Grid item xs={11}>
      <Box
        draggable
        onDragStart={(e) => handleOnDrag(e)}
        color={mission.color}
      >
        <Grid container>
          <Grid item xs={12} md={3}>
            <Icon color={mission.color} size="large" from="week" />
          </Grid>
          <Grid item xs={12} md={9}>
            <Task>{task.name}</Task>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  background: ${(props) => props.color};
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: scale(1.02) perspective(1px);
  }
`;

const Task = styled.p`
  max-width: 60px;
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: white;
`;

export default TaskItem;
