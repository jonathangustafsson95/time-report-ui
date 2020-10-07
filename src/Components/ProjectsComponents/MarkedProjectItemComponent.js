import React from "react";
import styled from "styled-components";
import logoBox from "./Images/Group156.png"
import iconStar from "./Images/IconFeather-star.png"


const MarkedProjectItem = ({ mission }) => {
  return (
    <Box>
        <BoxDiv>

      <Inbox>
        <img src={logoBox}></img>
      </Inbox>
      <MissionText>{mission.name}</MissionText>
      <img src={iconStar} width="19.48px" height="18.53px"></img>
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
  margin-left: 90px;
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
margin-left: 15px;
padding: 10px;



`;
const BoxDiv=styled.div`
display:flex;
flex-direction:row;
`;

export default MarkedProjectItem;
