import React from "react";
import styled from "styled-components";

const MarkedProjectItem = ({ mission }) => {
  return (
    <Box>
      <MissionText>{mission.name}</MissionText>
      <CompanyText>{mission.customer}</CompanyText>
    </Box>
  );
};

const MissionText = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #302f2f;
`;

const CompanyText = styled(MissionText)`
  font-size: 14px;
`;

const Box = styled.div`
  width: 367px;
  height: 106px;
  background: #fff;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.14));
  margin-right: 15px;
`;

export default MarkedProjectItem;
