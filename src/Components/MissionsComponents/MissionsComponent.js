import React, { useEffect, useState } from "react";
import MarkedMissions from "./MarkedMissionsComponents/MarkedMissionsComponent";
import MissionsTableHolder from "./MissionsTableComponents/MissionsTableHolderComponent";
import { connect } from "react-redux";
import { fetchMissionData } from "../../Redux/Actions/MissionActions";
import styled from "styled-components";
import SnackBar from "../SnackBarComponents/SnackBarComponent";

const Projects = ({
  token,
  fetchMissionData,
  isMissionStatusUpdated,
  missionData,
  searchString,
  currentTableType,
}) => {
  const [showSnackBar, setShowSnackBar] = useState(true);
  useEffect(() => {
    fetchMissionData(searchString, currentTableType);
  }, [fetchMissionData, isMissionStatusUpdated]);

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
    fetchMissionData: (searchString, type ) => dispatch(fetchMissionData(searchString, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
