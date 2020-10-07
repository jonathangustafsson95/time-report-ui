import React, { useEffect } from "react";
import MarkedProjectItem from "./MarkedProjectItemComponent";
import styled from "styled-components";

const MarkedProjects = () => {
  const missions = [
    {
      id: 1,
      name: "mission 1",
      customer: "customer 1",
    },
    {
      id: 2,
      name: "mission 2",
      customer: "customer 1",
    },
    {
      id: 3,
      name: "mission 3",
      customer: "customer 1",
    },
  ];
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
