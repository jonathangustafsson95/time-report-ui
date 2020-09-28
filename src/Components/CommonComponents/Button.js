import React from "react";
import styled from "styled-components";

const Button = ({ content }) => {
  return <ButtonS>{content}</ButtonS>;
};

const ButtonS = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 18px;
  color: #fff;
  width: 189px;
  height: 47px;
  border-radius: 8px;
  background: #585656;
  border: 2px solid #585656;
`;

export default Button;
