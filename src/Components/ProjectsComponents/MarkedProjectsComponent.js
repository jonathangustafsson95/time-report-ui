import React, { useEffect } from "react";
import MarkedProjectItem from "./MarkedProjectItemComponent";
import styled from "styled-components";
import {fetchUserMarkedMissions} from "../../Redux/Actions/MissionActions"
import { connect } from "react-redux";
const MarkedProjectsComponentDiv =({markedMissions,token,fetchMarkedMissions})=>{
  useEffect(()=>{
    fetchMarkedMissions(token);
  },[]);
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
  // const missions = [
  //   {
  //     id: 1,
  //     name: "mission 1",
  //     customer: "customer 1",
  //   },
  //   {
  //     id: 2,
  //     name: "mission 2",
  //     customer: "customer 1",
  //   },
  //   {
  //     id: 3,
  //     name: "mission 3",
  //     customer: "customer 1",
  //   },
  // ];
//   return (
//     <div>
//       <Title>Marked Projects</Title>

//       <MarkedProjectsDiv>
//         {missions.map((mission) => (
//           <MarkedProjectItem key={mission.id} mission={mission} />
//         ))}
//       </MarkedProjectsDiv>
//     </div>
//   );
// };
const mapStateToProps=(state)=>{
  return{
    markedMissions:state.missionData.missions,
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
