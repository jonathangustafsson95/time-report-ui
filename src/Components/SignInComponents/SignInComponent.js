import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Css/Login.css";
import { connect } from "react-redux";
import { authorize } from "../../Redux/Actions/AuthActions";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";

const SignIn = ({ signIn, authData }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = (event) => {
    event.preventDefault();
    signIn({
      userName: userName,
      password: password,
    });
  };

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  return (
    <div className="Login">
      <form onSubmit={onSignIn}>
        <FormGroup bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            placeholder="Enter username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          disabled={!validateForm()}
          onClick={onSignIn}
        >
          Login
        </Button>
        {authData.error ? (
          <AlertMsg severity="error">Something went wrong...</AlertMsg>
        ) : null}
      </form>
    </div>
  );
};

const AlertMsg = styled(Alert)`
  margin-top: 35px;
`;

const img = require("./Images/mountain-lake-header.jpg");

const divStyle = {
  width: "100%",
  height: "978px",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
};

const mapStateToProps = (state) => {
  return {
    authData: state.authData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(authorize(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
