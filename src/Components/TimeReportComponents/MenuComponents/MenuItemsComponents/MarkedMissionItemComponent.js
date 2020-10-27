import React, { useState } from "react";
import styled from "styled-components";
import TaskItem from "./TaskItemComponent";

const MarkedMissionItem = ({ mission }) => {
  const [show, setShow] = useState(false);
  const tasks = mission.tasks.map((task) => (
      <TaskItem key={task.taskId} task={task} mission={mission}/>
  ))
  return (
    <Root>
      <Button onClick={() => setShow(!show)}>{mission.missionName}</Button>
      {show && tasks}
    </Root>
  );
};

const Root = styled.div`
margin-left: 7px;
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  line-height: 40px;
  text-align: left;
  border: none;
  background: none;
  color: #585656;
  padding: 0;
  margin-bottom: 5px;
  &.focus {
    outline: none;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export default MarkedMissionItem;
