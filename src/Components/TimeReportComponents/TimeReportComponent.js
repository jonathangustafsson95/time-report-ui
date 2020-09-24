import React from "react";
import styled from "styled-components";
import TimeReportType from "./TimeReportTypeComponent";
import Week from './WeekComponents/WeekComponent';

const TimeReport = () => {
  return (
    <Main>
      <TimeReportType />
      <Week />
    </Main>
    );
};

const Main = styled.div`
`;

export default TimeReport;
