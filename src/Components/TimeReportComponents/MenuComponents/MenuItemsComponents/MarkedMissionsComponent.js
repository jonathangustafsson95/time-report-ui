import React from "react";
import { connect } from "react-redux";
import MarkedMissionItem from "./MarkedMissionItemComponent";

const MarkedMissions = ({ markedMissions }) => {
  const missions = markedMissions.map((mission) => (
    <MarkedMissionItem key={mission.missionId} mission={mission} />
  ));
  return <div>{missions}</div>;
};

const mapStateToProps = (state) => {
  return {
    markedMissions: state.missionData.markedMissions,
  };
};

export default connect(mapStateToProps)(MarkedMissions);