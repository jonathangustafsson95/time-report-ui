import React from "react";
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
          <Item key={member.userId} content={member.userName} type="member"></Item>
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
