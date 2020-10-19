import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import { connect } from "react-redux";
import {removeMissionMembership} from "../../../Redux/Actions/MissionActions";

const MissionAlertDialog = ({setOpen, missionId, open, removeMembership, token, userId}) =>{
    console.log(open)
    const handleLeaveProject = (token, userId, missionId) => {
      //removeMembership(token, userId, missionId);
      handleClose();
    }


    const handleClose = () => {
        setOpen(false)
    };
    return (<div>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Leave project?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to leave project?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleLeaveProject(token, userId, missionId, removeMembership)} color="primary">
        Yes
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
        No
      </Button>
    </DialogActions>
  </Dialog>
    </div>
        );

    
}

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
  };
};

const mapDispatchToProps = (dispatch) => {
return{
  removeMembership: (token, userId, missionId) =>
      dispatch(removeMissionMembership(token, userId, missionId)),
};
};


export default connect(mapStateToProps, mapDispatchToProps)(MissionAlertDialog);