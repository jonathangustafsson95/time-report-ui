import React from "react";
import styled from "styled-components";
import Week from "./WeekComponents/WeekComponent";
import Menu from "./MenuComponents/MenuComponent";

const TimeReport = () => {
  return (
    <Main>
      <TimeReportDiv>
        <div>
          <Text>New Time Report</Text>
          <Week />
        </div>
        <Menu></Menu>
      </TimeReportDiv>
    </Main>
  );
};

const Main = styled.div`
  display: inline-block;
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
  text-align: left;
  color: #585656;
  text-align: center;
  margin: 0;
`;

export default TimeReport;
