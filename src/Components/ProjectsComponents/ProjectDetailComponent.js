import React from 'react';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import styled from 'styled-components';
import IconArrow from "./Images/Group247.png"

const ProjectDetail = () => {
    return ( 
              <div>
                <BackDiv className="align-baseline">
                  <Button variant="light" color="#f00a6b">
                  <img src={IconArrow}></img>
                    Back
                  </Button> 
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
export default ProjectDetail;