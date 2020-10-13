import React, { useEffect } from "react";
import MarkedProjectItem from "./MarkedProjectItemComponent";
import styled from "styled-components";
import {fetchUserMarkedMissions} from "../../Redux/Actions/MissionActions";
import { connect } from "react-redux";
import ProjectDetailComponent from "./ProjectDetailComponent";
const MarkedProjectsComponentDiv =({markedMissions,token,fetchMarkedMissions})=>{
  useEffect(()=>{
    fetchMarkedMissions(token);
  },[]);
  console.log(markedMissions);
return(
  <div>
  <Title>Marked Projects</Title>

  <MarkedProjectsDiv>
       {markedMissions.map((markedMissions) => (
      <MarkedProjectItem key={markedMissions.MissionId} markedMissions={markedMissions}/>))} 
  </MarkedProjectsDiv>
</div>
);
};
const mapStateToProps=(state)=>{
  return{
    markedMissions:state.missionData.markedMissions,
    token:state.authData.user.token,
  };
};
const mapDispatchToProps=(dispatch)=>{
  return{
    fetchMarkedMissions:(token)=>dispatch(fetchUserMarkedMissions(token)),
  };
};
const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.08em;
  line-height: 40px;
  text-align: left;
  color: #585656;
  margin-bottom: 20px;
`;

const MarkedProjectsDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export default connect(mapStateToProps,mapDispatchToProps) (MarkedProjectsComponentDiv);
