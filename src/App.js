import React, {useEffect} from "react";
import Layout from "./Components/Layout";
import MobileLayout from "./Components/MobileLayout";
import SignIn from "./Components/SignInComponents/SignInComponent";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import {reAuthorize} from "./Redux/Actions/AuthActions"

function App({ authData, reAuth }) {
  if (!authData.user) {
    const localStorageData = {
      token: localStorage.getItem("token"),
      userDetails: JSON.parse(localStorage.getItem("userDetails")),
    };
    
    if (localStorageData.token !== null){
      reAuth(localStorageData);
    }
    else {
      return (
        <div>
          <SignIn />
        </div>
      );
    } 
  }
  
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


const mapStateToProps = (state) => {
  return {
    authData: state.authData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reAuth: (localStorageData) => dispatch(reAuthorize(localStorageData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
