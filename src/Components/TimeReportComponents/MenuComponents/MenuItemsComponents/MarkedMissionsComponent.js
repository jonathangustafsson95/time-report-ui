import React from "react";
import { connect } from "react-redux";
import MarkedMissionItem from "./MarkedMissionItemComponent";
import Grid from "@material-ui/core/Grid";

const MarkedMissions = ({ markedMissions }) => {
  const missions = markedMissions.map((mission) => (
    <MarkedMissionItem key={mission.missionId} mission={mission} />
  ));
  return <Grid container item justify="flex-end" spacing={2}>{missions}</Grid>;
};

const mapStateToProps = (state) => {
  return {
    markedMissions: state.missionData.markedMissions,
  };
};

export default connect(mapStateToProps)(MarkedMissions);