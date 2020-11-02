import React from "react";
import Layout from "./Components/Layout";
import SignIn from "./Components/SignInComponents/SignInComponent";
import { connect } from "react-redux";
import { reAuthorize } from "./Redux/Actions/AuthActions";
import jwtDecode from "jwt-decode";

function App({ authData, reAuth }) {
  if (!authData.user) {
    const localStorageData = {
      token: localStorage.getItem("token"),
      userDetails: JSON.parse(localStorage.getItem("userDetails")),
    };
    if (localStorageData.token !== null) {
      if (jwtDecode(localStorageData.token).exp > Date.now() / 1000) {
        reAuth(localStorageData);
      } else {
        localStorage.clear();
      }
    }
    return (
      <div>
        <SignIn />
      </div>
    );
  }
  return <Layout />;
}

const mapStateToProps = (state) => {
  return {
    authData: state.authData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reAuth: (localStorageData) => dispatch(reAuthorize(localStorageData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
