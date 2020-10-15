import React from "react";
import MarkedMissionItem from "./MarkedMissionItemComponent";
import styled from "styled-components";
import { connect } from "react-redux";

const MarkedMissions = ({ markedMissions }) => {
  return (
    <Main>
      <Title>Marked missions</Title>
      <MarkedMissionHolder>
        {markedMissions.map((markedMission) => (
          <MarkedMissionItem
            key={markedMission.MissionId}
            markedMission={markedMission}
          />
        ))}
      </MarkedMissionHolder>
    </Main>
  );
};

const Main = styled.div`
  min-width: 1300px;
  max-width: 1300px;
  margin-bottom: 40px;
`;

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

const MarkedMissionHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const mapStateToProps = (state) => {
  return {
    markedMissions: state.missionData.markedMissions,
  };
};

export default connect(mapStateToProps)(MarkedMissions);
