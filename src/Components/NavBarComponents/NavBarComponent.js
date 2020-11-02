import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import DrawerNav from "./DrawerComponent";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    background: "white",
  },
}));

const NavBar = ({ user }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <>
      <App position="static">
        <ToolBar className={classes.toolBar}>
          <Grid container>
            <Grid item xs={2}>
              <IconButton onClick={() => setShow(true)}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={9}></Grid>
            <Grid item xs={1}>
              <UserDiv>
                <UserName>{user.userName}</UserName>
              </UserDiv>
            </Grid>
          </Grid>
        </ToolBar>
      </App>
      <DrawerNav show={show} setShow={setShow} />
    </>
  );
};
const App = styled(AppBar)`
  margin-bottom: 30px;
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const UserName = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0.02em;
  color: #585656;
`;

const mapStateToProps = (state) => {
  return {
    user: state.authData.user.userDetails,
  };
};

export default connect(mapStateToProps)(NavBar);
