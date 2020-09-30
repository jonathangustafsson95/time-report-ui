import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const SignIn = () => {
  const onSignIn = (e) => {
    console.log("OnSignIn");
  };

  return (
    <FormDiv onSubmit={onSignIn}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </FormDiv>
  );
};

const FormDiv = styled(Form)`
  width: 300px;
  height: 300px;
  margin: 0;
`;

export default SignIn;
