import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Css/Login.css";
import { connect } from "react-redux";
import { authorize } from "../../Redux/Actions/AuthActions";

const SignIn = ({ signIn }) => {
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
    <div style={divStyle} className="Login">
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
      </form>
    </div>
  );
};

const img = require('./Images/mountain-lake-header.jpg');
const divStyle = {
  width: '100%',
  height: '978px',
  backgroundImage: `url(${img})`,
  backgroundSize: 'cover'
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(authorize(user)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
