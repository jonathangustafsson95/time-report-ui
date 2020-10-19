import React from "react";
import Layout from "./Components/Layout";
import MobileLayout from "./Components/MobileLayout";
import SignIn from "./Components/SignInComponents/SignInComponent";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

function App({ authData }) {

  if (!authData.user) {
    return (
      <div>
        <SignIn />
      </div>
    );
  } 
  else {
    if (isMobile) {
      return (
        <MobileLayout />
      );
    }
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authData: state.authData,
  };
};

export default connect(mapStateToProps)(App);
