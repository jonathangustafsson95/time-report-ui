import React from "react";
import styled from "styled-components";
import Icon from "../../WeekComponents/IconComponent";

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
    <Box draggable onDragStart={(e) => handleOnDrag(e)}>
      <Icon color={mission.color} size="large" />
      <Task>{task.name}</Task>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  width: 190px;
  height: 65px;
  padding-left: 20px;
  background: #fff;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  margin-left: 30px;
  margin-bottom: 15px;
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
  color: #585656;
  text-align: left;
  margin-left: 20px;
`;

export default TaskItem;
