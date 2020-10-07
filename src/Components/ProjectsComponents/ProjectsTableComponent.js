// import React from "react";

// import ProjectsTable from "./ProjectsTable"
// import { connect } from "react-redux";
// import styled from "styled-components";

// import {
//   fetchUserMissions
// } from "../../Redux/Actions/MissionActions";
// //TODO fixa props dispatch thingy
// const ProjectsTableDiv=(props)=> {
//   return (
    
//     //skicka in listan till project table
//       <div>
//           <ProjectButtonsDiv>

//             <button>Your projects</button>
//             <button>All projects</button>
//           </ProjectButtonsDiv>
          
//           <ProjectsTable missions={props.fetchUserMissions}/>
//       </div>
//   )
// }
// const ProjectButtonsDiv = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const mapStateToProps = (state) => {
//   return {
    
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchUserMissions: (token) => dispatch(fetchUserMissions(token)),
  
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTableDiv);