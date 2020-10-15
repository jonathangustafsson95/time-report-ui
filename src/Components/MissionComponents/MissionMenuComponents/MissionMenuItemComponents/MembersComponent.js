import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Item from "./ItemComponent";

const Members = ({ mission }) => {
  if (!mission) {
    return null;
  } else {
    const members = mission.users;
    return (
      <div>
        {members.map((member) => (
          <Item content={member.userName} type="member"></Item>
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

export default connect(mapStateToProps)(Members);
