import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { unAuthorize } from "../../Redux/Actions/AuthActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const MobileNavBar = ({ signOut, user }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }
    setOpen(false);
  };

//   function handleListKeyDown(event) {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       setOpen(false);
//     }
//   }

  // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }
//     prevOpen.current = open;
//   }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <IconButton onClick={handleToggle}>
          <MenuIcon />
        </IconButton>
        <Popper
          open={open}
        //   anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    // onKeyDown={handleListKeyDown}
                  >
                    <Link to="/">
                      <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                    </Link>
                    <Link to="/timereport">
                      <MenuItem onClick={handleClose}>Time report</MenuItem>
                    </Link>
                    <Link to="/missions">
                      <MenuItem onClick={handleClose}>Missions</MenuItem>
                    </Link>
                    <MenuItem onClick={() => signOut(user)}>Signout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavBar);
