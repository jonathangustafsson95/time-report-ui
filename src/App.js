import React from "react";
import Layout from "./Components/Layout";
import SignIn from "./Components/SignInComponents/SignInComponent";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

function App({ authData }) {
  if (!authData.user) {
    if (isMobile) {
      return (
        <div>
          <h1>Det här skrivs ut på mobilversionen</h1>
          <SignIn />
        </div>
      );
    }
    return (
      <div>
        <SignIn />
      </div>
    );
  } else {
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
