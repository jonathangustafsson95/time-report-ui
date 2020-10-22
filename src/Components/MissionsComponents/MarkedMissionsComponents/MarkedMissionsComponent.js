import React from "react";
import MarkedMission from "./MarkedMissionComponent";
import styled from "styled-components";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

const MarkedMissions = ({ markedMissions }) => {
  return (
    <Main isMobile={isMobile}>
      <Title>Marked missions</Title>
      <MarkedMissionHolder>
        {markedMissions.map((markedMission) => (
          <MarkedMission
            key={markedMission.missionId}
            markedMission={markedMission}
          />
        ))}
      </MarkedMissionHolder>
    </Main>
  );
};

const Main = styled.div`
  ${props => props.isMobile && "width: 100%;"}
  ${(props) => !props.isMobile && "min-width: 1300px;"}
  ${(props) => !props.isMobile && "max-width: 1300px;"}
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
