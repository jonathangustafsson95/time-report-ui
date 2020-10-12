import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Checkbox } from "@material-ui/core";
import { connect } from "react-redux";
import {fetchUserMarkedMissions, markMission,} from "../../Redux/Actions/MissionActions"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ProjectsTable = ({ missions,markedMissions,token,fetchMarkedMissions,postMarkedMissions }) => {
  const classes = useStyles();
  useEffect(()=>{
    fetchMarkedMissions(token);
  },[]);
  // use state för marked mission 
  // useState()
  const handleClick=(e)=>{
    console.log("test"+" "+e.target.checked)
    // if(!e.target.checked)
    // {
    //   postMarkedMissions(token)
    //   //remove marked mission 
    //   e.checked=false;

    // }
    // else
    //add marked mission

    
    //kalla på check favorite
    // checkFavorite();

  }
  const checkFavorite=({mission})=>{
    return markedMissions.some((item) => item.missionId === mission.missionId)
  };
  const addFavorite=({mission})=>{
    return markedMissions.some((item) => item.missionId === mission.missionId)
  };
  const removeFavorite=({mission})=>{
    return markedMissions.some((item) => item.missionId === mission.missionId)
  };
  // const[isChecked, setChecked]=useState()
  return (
    <div>
       
      <input></input>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Mission Name</TableCell>
              <TableCell align="right">Customer</TableCell>
              {/* <TableCell align="right">Status</TableCell> */}
              <TableCell align="right">StartDate</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {missions.map((mission) => (
              <TableRow key={mission.missionId}>
                <TableCell >
                  <Checkbox onClick={(e) => handleClick(e)} checked={ checkFavorite({mission})}></Checkbox>
                </TableCell>
                <TableCell component="th" scope="row">
                  {mission.missionName}
                </TableCell>
                <TableCell align="right">{mission.customer}</TableCell>
                {/* <TableCell align="right">{mission.Status}</TableCell> */}
                <TableCell align="right">{mission.startDate}</TableCell>
                <TableCell align="right">
                  <button>Add Time</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


const mapStateToProps=(state)=>{
  return{
    markedMissions:state.missionData.missions,
    token:state.authData.user.token,
  };
};
const mapDispatchToProps=(dispatch)=>{
  return{
    fetchMarkedMissions:(token)=>dispatch(fetchUserMarkedMissions(token)),
    // postMarkedMissions:(token)=>dispatch(markMission(token)),
    // deleteMarkedMissions:(token)=>dispatch(deleteMarkedMissions(token))
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(ProjectsTable);
