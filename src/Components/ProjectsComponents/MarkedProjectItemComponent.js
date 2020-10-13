import React from "react";
import styled from "styled-components";
import logoBox from "./Images/Group156.png"
import iconStar from "./Images/IconFeather-star.png"
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import ProjectDetailComponent from "./ProjectDetailComponent"


const MarkedProjectItem = ({ markedMissions }) => {
  console.log(markedMissions);

  return (
    <Box>
        <BoxDiv>
      <Inbox>
        <img src={logoBox}></img>
      </Inbox>
      
      <Link to={"/projects/" + markedMissions.missionId}><MissionText>{markedMissions.missionName}</MissionText></Link>

      <Checkbox checked="true"></Checkbox>
      </BoxDiv>
      <CompanyText>{markedMissions.customer}</CompanyText>
    
      
     
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
  margin-left: 30px;
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
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: scale(1.02) perspective(1px);
  }
  
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
