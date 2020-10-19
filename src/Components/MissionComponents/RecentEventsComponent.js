import React from "react";
import styled from "styled-components";

const RecentEvents = () => {
  return (
    <Main>
      <Title>Latest reports</Title>
    </Main>
  );
};

const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 20px;
  letter-spacing: 0.02em;
  color: #585656;
`;

const Main = styled.div`
  text-align: center;
  width: 300px;
  height: 430px;
  border-radius: 10px;
  margin-left: 15px;
  background: #fafafa;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.16));
`;

export default RecentEvents;
