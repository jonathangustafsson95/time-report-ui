import React, { useEffect, useState } from "react";
import MarkedMissions from "./MarkedMissionsComponents/MarkedMissionsComponent";
import MissionsTableHolder from "./MissionsTableComponents/MissionsTableHolderComponent";
import { connect } from "react-redux";
import {
  fetchMissionData,
  resetMissionDataStore,
} from "../../Redux/Actions/MissionActions";
import styled from "styled-components";
import SnackBar from "../SnackBarComponents/SnackBarComponent";

const Missions = ({
  fetchMissionData,
  isMissionStatusUpdated,
  missionData,
  searchString,
  currentTableType,
  resetStore,
}) => {
  const [showSnackBar, setShowSnackBar] = useState(true);
  useEffect(() => {
    fetchMissionData(searchString, currentTableType);
  }, [fetchMissionData, isMissionStatusUpdated, searchString]);

  useEffect(() => {
    return function cleanUp() {
      resetStore();
    };
  }, []);

  return (
    <Main>
      <MarkedMissions />
      <MissionsTableHolder />
      {missionData.error ? (
        <SnackBar
          show={showSnackBar}
          hide={() => setShowSnackBar(false)}
          error={true}
        />
      ) : null}
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
    currentTableType: state.missionData.currentTableType,
    searchString: state.missionData.searchString,
    missionData: state.missionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissionData: (searchString, type) =>
      dispatch(fetchMissionData(searchString, type)),
    resetStore: () => dispatch(resetMissionDataStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Missions);
