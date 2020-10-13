import React from "react";
import MarkedProjectItem from "./MarkedProjectItemComponent";
import styled from "styled-components";
import { connect } from "react-redux";

const MarkedProjectsComponentDiv = ({ markedMissions }) => {
  return (
    <div>
      <Title>Marked Projects</Title>

      <MarkedProjectsDiv>
        {markedMissions.map((markedMission) => (
          <MarkedProjectItem
            key={markedMission.MissionId}
            markedMission={markedMission}
          />
        ))}
      </MarkedProjectsDiv>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    markedMissions: state.missionData.markedMissions,
  };
};

const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.08em;
  line-height: 40px;
  text-align: left;
  color: #585656;
  margin-bottom: 20px;
`;

const MarkedProjectsDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export default connect(mapStateToProps)(MarkedProjectsComponentDiv);
