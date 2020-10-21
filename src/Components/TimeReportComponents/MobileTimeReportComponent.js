import React from "react";
import styled from "styled-components";
import Day from "./WeekComponents/DayComponent";

const MobileTimeReport = () => {
  return (
    <Main>
      <Text>New Time Report</Text>
      <Day />
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeReportDiv = styled.div`
  display: flex;
`;

const Text = styled.p`
  font-family: Roboto;
  font-weight: bold;
  font-size: 17px;
  letter-spacing: 0.08em;
  line-height: 40px;
  color: #585656;
  margin: 0;
`;

export default MobileTimeReport;
