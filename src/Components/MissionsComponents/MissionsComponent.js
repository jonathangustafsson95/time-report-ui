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
  updatedFrom
}) => {
  const [showSnackBar, setShowSnackBar] = useState(true);
  useEffect(() => {
    fetchMissionData(token, updatedFrom, searchString);
  }, [token, fetchMissionData, isMissionStatusUpdated]);

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
    updatedFrom: state.missionData.updatedFrom,
    searchString: state.missionData.searchString,
    missionData: state.missionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMissionData: (token, type, searchString) => dispatch(fetchMissionData(token, type, searchString)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
