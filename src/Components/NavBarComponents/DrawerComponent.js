import React from "react";
import {useHistory} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Dashboard, Schedule, Archive, ExitToApp } from "@material-ui/icons";
import { unAuthorize } from "../../Redux/Actions/AuthActions";

const useStyles = makeStyles({ 
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const DrawerNav = ({show, setShow, user, signOut}) => {
  const classes = useStyles();
  let history = useHistory()

  const toggleDrawer = (showDrawer) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setShow(showDrawer);
  };
  const list = (
    <div
      className={classes}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="Dashboard" onClick={() => history.push("/")}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="TimeReport" onClick={() => history.push("/timereport")}>
          <ListItemIcon>
            <Schedule />
          </ListItemIcon>
          <ListItemText primary="Time report" />
        </ListItem>
        <ListItem button key="Missions" onClick={() => history.push("/missions")}>
          <ListItemIcon>
            <Archive />
          </ListItemIcon>
          <ListItemText primary="Missions" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="signOut" onClick={() => signOut(user)}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div>
      <React.Fragment key="left">
        <Drawer anchor="left" open={show} onClose={toggleDrawer(false)}>
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      user: state.authData.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      signOut: (user) => dispatch(unAuthorize(user)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNav);
