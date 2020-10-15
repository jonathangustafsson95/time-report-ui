import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Item from "./ItemComponent";

const Tasks = ({ mission }) => {
  if (!mission) {
    return null;
  } else {
    const { tasks } = mission;
    return (
      <div>
        {tasks.map((task) => (
          <Item content={task.name} type="task"></Item>
        ))}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    mission: state.missionData.mission,
  };
};

export default connect(mapStateToProps)(Tasks);
