import React from "react";
import styled from "styled-components";
import logo from "./Images/projects.png"

const MarkedProjectItem = ({ mission }) => {
  return (
    <Box>
        <BoxDiv>

      <Inbox>
        <img src={logo} width="28.87px" height="23.62px" color="#ff2366"></img>
      </Inbox>
      <MissionText>{mission.name}</MissionText>
      </BoxDiv>
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
  margin-left: 15px;
`;

const CompanyText = styled(MissionText)`
  font-size: 14px;
  font-family: Roboto;
  font-weight: 500;
  margin-left: 80px;
  text-align: left;

`;

const Box = styled.div`
  width: 367px;
  height: 106px;
  background: #fff;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.14));
  margin-right: 15px;
  border-left-style: solid ;
  border-color:#f00a6b;
  
  
`;
const Inbox=styled.div`
width: 48px;
height: 48px;
border-radius: 10px;
background: #ff2366;
opacity: 0.17;
margin-left: 15px;
padding: 10px;



`;
const BoxDiv=styled.div`
display:flex;
flex-direction:row;
`;

export default MarkedProjectItem;
