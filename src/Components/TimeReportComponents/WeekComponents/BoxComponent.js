import React from "react";
import styled from "styled-components";

const DayBox = ({ day }) => {
  return (
    <Main>
      <Text>{day}</Text>
      <Box></Box>
    </Main>
  );
};

const Main = styled.div`
`;

const Box = styled.div`
  border-radius: 14px;
  min-height: 430px;
  background: #fff;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
`;

const Text = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  line-height: 46px;
  text-align: left;
  color: #585656;
  opacity: 0.7;
  margin: 0;
  text-align: center;
`;

export default DayBox;
