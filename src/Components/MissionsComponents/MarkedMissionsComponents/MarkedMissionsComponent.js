import React from "react";
import MarkedMission from "./MarkedMissionComponent";
import styled from "styled-components";
import { connect } from "react-redux";
// import { isMobile } from "react-device-detect";
import Grid from "@material-ui/core/Grid";

const MarkedMissions = ({ markedMissions }) => {
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Title>Marked missions</Title>
      </Grid>
      <Grid container item xs={12}>
        {markedMissions.map((markedMission) => (
          <MarkedMission
            key={markedMission.missionId}
            markedMission={markedMission}
          />
        ))}
      </Grid>
    </Grid>
  );
};

// const Main = styled.div`
//   ${(props) => props.isMobile && "width: 100%;"}
//   ${(props) => !props.isMobile && "min-width: 1300px;"}
//   ${(props) => !props.isMobile && "max-width: 1300px;"}
//   margin-bottom: 40px;
// `;

const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.08em;
  line-height: 40px;
  text-align: left;
  color: #585656;
  margin-bottom: 20px;
`;

const mapStateToProps = (state) => {
  return {
    markedMissions: state.missionData.markedMissions,
  };
};

export default connect(mapStateToProps)(MarkedMissions);
