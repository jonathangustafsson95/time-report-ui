import React from "react";
import styled from "styled-components";
import Icon from "../../WeekComponents/IconComponent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 180,
  }
});

const LatestRegistryItemComponent = ({ registry }) => {
  const classes = useStyles();
  const handleOnDrag = (e) => {
    e.dataTransfer.setData("registry", JSON.stringify(registry));
    e.dataTransfer.setData("from", "latestRegistries");
  };
  return (
    <Grid item xs={11} className={classes.root}>
      <Box
        draggable
        onDragStart={(e) => handleOnDrag(e)}
        color={registry.missionColor ? registry.missionColor : "#EB6D6D"}
      >
        <Grid container>
          <Grid item xs={12} md={3}>
            <Icon
              color={registry.missionColor ? registry.missionColor : "#EB6D6D"}
              size="large"
              status={registry.new}
              from="week"
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextDiv>
              <Mission>{registry.missionName}</Mission>
              <Task>{registry.taskName}</Task>
            </TextDiv>
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

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Mission = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: white;
`;

const Task = styled(Mission)`
  margin: 0;
  font-size: 8px;
  opacity: 0.85;
`;

export default LatestRegistryItemComponent;
