import React, { useEffect } from "react";
import MarkedMissions from "./MarkedMissionsComponents/MarkedMissionsComponent";
import MissionsTableHolder from "./MissionsTableComponents/MissionsTableHolderComponent";
import { connect } from "react-redux";
import { fetchMissionData } from "../../Redux/Actions/MissionActions";
import styled from "styled-components";

const Projects = ({ token, fetchMissionData, isMissionStatusUpdated }) => {
  useEffect(() => {
    fetchMissionData(token);
  }, [token, fetchMissionData, isMissionStatusUpdated]);

  return (
    <Main>
      <MarkedMissions />
      <MissionsTableHolder />
    </Main>
  );
};

const Main = styled.div`
  width: 100%;
`;

const mapStateToProps = (state) => {
  return {
    token: state.authData.user.token,
    isMissionStatusUpdated: state.missionData.isMissionStatusUpdated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissionData: (token) => dispatch(fetchMissionData(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
