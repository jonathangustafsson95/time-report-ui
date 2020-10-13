import React from "react";
import styled from "styled-components";
import projImag from "./Images/Group323.png"

const TaskItemComponent=({tasks})=>{
    console.log(tasks);
    return(
        <Box>
            <BoxDiv>
            <img width={40} height={41} src={projImag}></img>
                <par>{tasks.name}</par>
            </BoxDiv>
        </Box>

    )
}

const par=styled.p`
margin-bottom: 25px;
`
const Box = styled.div`
    width: 226px;
    height: 74px;
    background: #fff;
    filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.14));
    margin-right: 15px;
    margin-bottom:15px;
    border-left-style: solid ;
    border-color:#f00a6b;
    box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
    &:hover {
        cursor: pointer;
        transform: scale(1.02) perspective(1px);
      }
  
  
`;






const BoxDiv=styled.div`
display:flex;
flex-direction:row;
`;


export default TaskItemComponent;