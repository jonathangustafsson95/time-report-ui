import React from "react";
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
import { markMission, unmarkMission } from "../../Redux/Actions/MissionActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
<<<<<<< HEAD
const ProjectsTable = ({ missions,markedMissions,token,fetchMarkedMissions,deleteMarkedMissions,postMarkedMissions,userId }) => {

  const [checkStatus, setCheckStatus] = useState([]);
=======
const ProjectsTable = ({
  missions,
  markedMissions,
  token,
  unmarkMission,
  markMission,
  userId,
  type,
}) => {
>>>>>>> b754731aae3dab1090171674cda0fc0677219d26
  const classes = useStyles();

  const checkFavorite = ({ mission }) => {
    return markedMissions.some((item) => item.missionId === mission.missionId);
  };
  const handleClick = (e, id) => {
    const favoriteMission = {
      UserId: userId,
      MissionId: id,
    };
    e.target.checked
      ? markMission(favoriteMission, token)
      : unmarkMission(favoriteMission, token);
  };
<<<<<<< HEAD
  const handleClick=(e,id)=>{
    console.log(token)
    // console.log("test"+" "+e.target.checked)
    // console.log(id)
    // setCheckStatus([
    //   ...checkStatus,

    // ])
    if(!e.target.checked)
    {
      //remove marked mission 
      e.checked=false;
    }
    else
    {
      // add marked mission
      const FavoriteMission={
        userId:userId,
        missionId:id
      }
      postMarkedMissions(FavoriteMission,token);
      e.checked=true
    }
   console.log(checkStatus)
  }
 
=======

>>>>>>> b754731aae3dab1090171674cda0fc0677219d26
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
<<<<<<< HEAD
                <TableCell >
                  <Checkbox onClick={(e) => handleClick(e,mission.missionId)} checked={ checkFavorite({mission})}></Checkbox>
=======
                <TableCell>
                  <Checkbox
                    onClick={(e) => handleClick(e, mission.missionId)}
                    checked={checkFavorite({ mission })}
                  ></Checkbox>
>>>>>>> b754731aae3dab1090171674cda0fc0677219d26
                </TableCell>
                <TableCell component="th" scope="row">
                  {mission.missionName}
                </TableCell>
                <TableCell align="right">{mission.customer}</TableCell>
                {/* <TableCell align="right">{mission.Status}</TableCell> */}
                <TableCell align="right">{mission.startDate}</TableCell>
                <TableCell align="right">
                  <button>{type === "userProjects" ? "Leave" : "Join"}</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    markedMissions: state.missionData.markedMissions,
    missions: state.missionData.missions,
    token: state.authData.user.token,
    userId: state.authData.user.userDetails.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    markMission: (favoriteMission, token) =>
      dispatch(markMission(favoriteMission, token)),
    unmarkMission: (favoriteMission, token) =>
      dispatch(unmarkMission(favoriteMission, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
