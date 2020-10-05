import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const TopBar = ({ userName }) => {
  return (
    <MainBox>
      <ProfileImage src={require("./Images/profile.jpg")} />
      <Text>{userName}</Text>
    </MainBox>
  );
};

const MainBox = styled.div`
  display: flex;
  align-items: center;
  height: 94px;
  -webkit-box-shadow: 0px 10px 28px 10px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 10px 28px 10px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 10px 28px 10px rgba(0, 0, 0, 0.16);
`;

const Text = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.08em;
  color: #585656;
`;

const ProfileImage = styled.img`
  opacity: 1;
  margin-left: 2%;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 3px solid #585656;
  margin-right: 15px;
  cursor: pointer;
  transition-duration: 0.4s;
  &:hover {
    transform: scale(1.03) perspective(1px);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  &:focus {
    outline: 0;
  }
`;

const mapStateToProps = (state) => {
  return {
    userName: state.authData.user.userDetails.userName,
  };
};

export default connect(mapStateToProps)(TopBar);
