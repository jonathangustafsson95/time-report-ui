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
  markMission,
  unmarkMission,
  addMembership,
  removeMembership,
  missionData,
}) => {
  let history = useHistory();
  const classes = useStyles();
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [currentMission, setCurrentMission] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [missionStatusType, setMissionStatusType] = useState("");

  const checkFavorite = ({ mission }) => {
    return markedMissions.some((item) => item.missionId === mission.missionId);
  };
  const handleClose = () => {
    setShowDialog(false);
  };
  const handleClick = (e, missionId) => {
    e.target.checked ? markMission(missionId) : unmarkMission(missionId);
  };
  const handleMemberStatus = (mission, type) => {
    setCurrentMission(mission);
    mission.isMember ? setShowDialog(true) : addMembership(mission.missionId);

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
          {missions.map(
            (mission) =>
              mission.show && (
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
                    onClick={() =>
                      history.push("/missions/" + mission.missionId)
                    }
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
              )
          )}
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
            removeMembership(currentMission.missionId);
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
    markedMissions: state.missionData.markedMissions,
    missions: state.missionData.missions,
    missionData: state.missionData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    markMission: (missionId) => dispatch(markMission(missionId)),
    unmarkMission: (missionId) => dispatch(unmarkMission(missionId)),
    addMembership: (missionId) => dispatch(addMissionMembership(missionId)),
    removeMembership: (missionId) =>
      dispatch(removeMissionMembership(missionId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MissionsTable);
