import React, { useState } from "react";
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
import Dialog from "../../DialogComponents/DialogComponent";
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
  missionData,
  tableType,
}) => {
  let history = useHistory();
  const classes = useStyles();
  const checkFavorite = ({ mission }) => {
    return markedMissions.some((item) => item.missionId === mission.missionId);
  };
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [currentMission, setCurrentMission] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => {
    setShowDialog(false);
  };

  const [missionStatusType, setMissionStatusType] = useState("");

  const handleClick = (e, id) => {
    const favoriteMission = {
      UserId: userId,
      MissionId: id,
    };
    e.target.checked
      ? markMission(favoriteMission, token, tableType)
      : unmarkMission(favoriteMission, token, tableType);
  };
  const handleMemberStatus = (mission, type) => {
    setCurrentMission(mission);
    mission.isMember
      ? setShowDialog(true)
      : addMembership(
          token,
          {
            UserId: userId,
            MissionId: mission.missionId,
          },
          tableType
        );

    type === "Join" && setShowSnackBar(true);
    type === "Join"
      ? setMissionStatusType("joined")
      : setMissionStatusType("left");
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
                <Button
                  onClick={() =>
                    handleMemberStatus(
                      mission,
                      mission.isMember ? "Leave" : "Join"
                    )
                  }
                >
                  {mission.isMember ? "Leave" : "Join"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <SnackBar
          show={showSnackBar}
          hide={() => setShowSnackBar(false)}
          error={missionData.error}
          content={
            !missionData.error ? `You succesfully ${missionStatusType}.` : ""
          }
        ></SnackBar>
        <Dialog
          open={showDialog}
          handleClose={handleClose}
          removeMembership={() => {
            removeMembership(
              token,
              userId,
              currentMission.missionId,
              tableType
            );
          }}
        />
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
    missionData: state.missionData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    markMission: (favoriteMission, token) =>
      dispatch(markMission(favoriteMission, token)),
    unmarkMission: (favoriteMission, token) =>
      dispatch(unmarkMission(favoriteMission, token)),
    addMembership: (token, _missionMember, tableType) =>
      dispatch(addMissionMembership(token, _missionMember, tableType)),
    removeMembership: (token, userId, missionId, tableType) =>
      dispatch(removeMissionMembership(token, userId, missionId, tableType)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MissionsTable);
