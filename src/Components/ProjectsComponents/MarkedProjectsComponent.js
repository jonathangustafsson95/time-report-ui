import React, { useEffect } from "react";
import MarkedProjectItem from "./MarkedProjectItemComponent";
import styled from "styled-components";

const MarkedProjects = ({ missions }) => {
  //useeffect

  return (
    <div>
      <Title>Marked Projects</Title>

      <MarkedProjectsDiv>
        {missions.map((mission) => (
          <MarkedProjectItem key={mission.id} mission={mission} />
        ))}
      </MarkedProjectsDiv>
    </div>
  );
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

export default MarkedProjects;
