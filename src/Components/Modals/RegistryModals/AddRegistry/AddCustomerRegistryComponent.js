import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchUserMissions } from "../../../../Redux/Actions/MissionActions";

const AddCustomerRegistry = ({ missions, fetchMissions, token }) => {
  useEffect(() => {
    fetchMissions(token);
  }, [fetchMissions, token]);

  return <Main>AddCustomerRegistry</Main>;
};

const Main = styled.div`
  width: 600px;
`;

const mapStateToProps = (state) => {
  return {
    missions: state.missionData.missions,
    token: state.authData.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissions: (token) => dispatch(fetchUserMissions(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomerRegistry);
