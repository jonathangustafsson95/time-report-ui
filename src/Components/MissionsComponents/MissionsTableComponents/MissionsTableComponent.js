import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox } from "@material-ui/core";
import { connect } from "react-redux";
import SnackBar from "../../SnackBarComponents/SnackBarComponent";
import styled from "styled-components";
import {
  markMission,
  unmarkMission,
  addMissionMembership,
  removeMissionMembership,
} from "../../../Redux/Actions/MissionActions";



const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
});

const MissionsTable = ({
  missions,
  markedMissions,
  token,
  markMission,
  userId,
  unmarkMission,
  addMembership,
  removeMembership,
}) => {
  let history = useHistory();
  const classes = useStyles();
  const checkFavorite = ({ mission }) => {
    return markedMissions.some((item) => item.missionId === mission.missionId);
  };
  const[showSnackBar,setShowSnackBar]=useState(false);
  const handleClick = (e, id) => {
    const favoriteMission = {
      UserId: userId,
      MissionId: id,
    };
    e.target.checked
      ? markMission(favoriteMission, token)
      : unmarkMission(favoriteMission, token);
  };
  const handleMemberStatus = (mission) => {
    mission.isMember
      ? removeMembership(token, userId, mission.missionId)
      : addMembership(token, {
          UserId: userId,
          MissionId: mission.missionId,
        });
        setShowSnackBar(true);
  };

  return (
    <div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>Mission Name</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">StartDate</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missions.map((mission) => (
            <TableRow key={mission.missionId}>
              <TableCell>
                <Checkbox
                  onClick={(e) => handleClick(e, mission.missionId)}
                  checked={checkFavorite({ mission })}
                ></Checkbox>
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={() => history.push("/missions/" + mission.missionId)}
              >
                {mission.missionName}
              </TableCell>
              <TableCell align="right">{mission.customer}</TableCell>
              <TableCell align="right">{mission.startDate}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleMemberStatus(mission)}>
                  {mission.isMember ? "Leave" : "Join"}
                <SnackBar
                show={showSnackBar}
                hide={()=>setShowSnackBar(false)}
                severity="success"
                >
                </SnackBar>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  color: #fff;
  width: 75px;
  height: 25px;
  border-radius: 6px;
  background: #585656;
  border: 2px solid #585656;
  &:active {
    outline: none;
    border: 2px solid #585656;
  }
  &:focus {
    -moz-outline-style: none;
  }
`;

const mapStateToProps = (state) => {
  return {
    token: state.authData.user.token,
    userId: state.authData.user.userDetails.userId,
    markedMissions: state.missionData.markedMissions,
    missions: state.missionData.missions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    markMission: (favoriteMission, token) =>
      dispatch(markMission(favoriteMission, token)),
    unmarkMission: (favoriteMission, token) =>
      dispatch(unmarkMission(favoriteMission, token)),
    addMembership: (token, _missionMember) =>
      dispatch(addMissionMembership(token, _missionMember)),
    removeMembership: (token, userId, missionId) =>
      dispatch(removeMissionMembership(token, userId, missionId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MissionsTable);
