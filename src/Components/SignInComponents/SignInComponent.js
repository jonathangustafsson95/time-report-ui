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
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            placeholder="Enter username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          block
          disabled={!validateForm()}
          onClick={onSignIn}
        >
          Login
        </Button>
        {authData.error ? (
          <AlertMsg severity="error">{authData.errorMsg}</AlertMsg>
        ) : null}
      </form>
    </div>
  );
};

const AlertMsg = styled(Alert)`
  margin-top: 35px;
`;

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
