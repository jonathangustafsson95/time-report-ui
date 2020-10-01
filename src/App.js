import React from "react";
import Layout from "./Components/Layout";
import SignIn from "./Components/SignInComponents/SignInComponent";
import { connect } from "react-redux";

function App({ authData }) {
  if (!authData.user) {
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
