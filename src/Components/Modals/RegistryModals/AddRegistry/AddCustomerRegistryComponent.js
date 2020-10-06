import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchUserMissions } from "../../../../Redux/Actions/MissionActions";
import MissionTable from "./MissionTableComponent";

const AddCustomerRegistry = ({ missions, fetchMissions, token }) => {
  useEffect(() => {
    fetchMissions(token);
  }, [fetchMissions, token]);

  return (
    <Main>
      <MissionTable missions={missions} />
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: row;
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
