import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { connect } from "react-redux";
import { authorize } from "../../Redux/Actions/AuthActions";

const SignIn = ({ authData, signIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log(userName);

  const onSignIn = (e) => {
    signIn({
      userName: userName,
      password: password,
    });
    console.log("OnSignIn");
  };

  return (
    <Form onSubmit={onSignIn}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder="Enter username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    authData: state.authData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch(authorize()),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
