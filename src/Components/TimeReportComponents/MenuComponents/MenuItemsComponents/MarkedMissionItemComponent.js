import React, { useState } from "react";
import styled from "styled-components";
import TaskItem from "./TaskItemComponent";
import Grid from "@material-ui/core/Grid";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

const MarkedMissionItem = ({ mission }) => {
  const [show, setShow] = useState(false);
  const tasks = mission.tasks.map((task) => (
    <TaskItem key={task.taskId} task={task} mission={mission} />
  ));
  return (
    <Grid item xs={11}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MenuItemDiv>
            <Button onClick={() => setShow(!show)}>
              {mission.missionName}
            </Button>
            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}      
          </MenuItemDiv>
        </Grid>
        <Grid item container xs={12} spacing={2} justify="flex-end">
          {show && tasks}
        </Grid>
      </Grid>
    </Grid>
  );
};

const ExpandMoreIcon = styled(ExpandMore)`
  color: #585656;
`;

const ExpandLessIcon = styled(ExpandLess)`
  color: #585656;
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  border: none;
  background: none;
  color: #585656;
  &.focus {
    outline: none;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const MenuItemDiv = styled.div`
  display: flex;
  align-items: center;
`;

export default MarkedMissionItem;
