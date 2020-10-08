import React from 'react';
import Button from 'react-bootstrap/Button'
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import IconArrow from "./Images/Group247.png"

const ProjectDetailComponent = ({markedMissions}) => {
  console.log(markedMissions);
  return ( 
              <div>
                <BackDiv className="align-baseline">
                  <LinkText to="/projects">
                  <Button variant="light" color="#f00a6b">
                  <img src={IconArrow}></img>
                    Back
                  </Button> 
                  </LinkText>
                </BackDiv>
                <text> Mission Details Here </text>
             
              </div> 
       
          );
}


 const BackDiv=styled.div`
 display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 60px;
 
 `
const LinkText= styled(NavLink)`
font-family: Roboto;
font-weight: normal;
font-size: 20px;
letter-spacing: 0.02em;
text-align: left;
color: #302f2f;
`
export default ProjectDetailComponent;