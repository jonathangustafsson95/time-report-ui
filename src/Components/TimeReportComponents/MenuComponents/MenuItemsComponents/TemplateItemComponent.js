import React from "react";
import styled from "styled-components";

const TemplateItem = ({ week }) => {
  return (
    <Box>
      <Icon src={require("./Icons/template.svg")} />
      <TextDiv>
        <Week>Week {week.weekNr}</Week>
        <StartDate>{week.startDate}</StartDate>
      </TextDiv>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  border-radius: 10px;
  width: 190px;
  height: 65px;
  padding-left: 10px;
  background: #fff;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  margin-left: 30px;
  margin-bottom: 15px;
`;

const Icon = styled.img`
  margin-right: 20px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Week = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #585656;
  text-align: left;
`;

const StartDate = styled(Week)`
  margin: 0;
  font-size: 10px;
  opacity: 0.85;
`;

export default TemplateItem;
