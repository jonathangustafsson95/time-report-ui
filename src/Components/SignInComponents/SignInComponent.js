import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { connect } from "react-redux";
import { authorize } from "../../Redux/Actions/AuthActions";


const SignIn = ({ authData, signIn }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    const onSignIn = (event) => {
      console.log("clicked");
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
        <Button block bsSize="large" disabled={!validateForm()} onClick={onSignIn}>
          Login
        </Button>
      </form>
    </div>
  );
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
  
  export default connect(null, mapDispatchToProps)(SignIn);
