import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import MarkedMissions from "./MarkedMissionsComponents/MarkedMissionsComponent";
import MissionsTableHolder from "./MissionsTableComponents/MissionsTableHolderComponent";
import { connect } from "react-redux";
import {
  fetchMissionData,
  resetMissionDataStore,
} from "../../Redux/Actions/MissionActions";
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
  }, [resetStore]);

  return (
    <Grid container item>
      <Grid item xs={0} md={1} lg={2}></Grid>
      <Grid item xs={12} md={10} lg={8}>
        <Grid container item spacing={4}>
          <Grid item xs={12}>
            <MarkedMissions />
          </Grid>
          <Grid item xs={12}>
            <MissionsTableHolder />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} md={1} lg={2}></Grid>

      {missionData.error ? (
        <SnackBar
          show={showSnackBar}
          hide={() => setShowSnackBar(false)}
          error={true}
        />
      ) : null}
    </Grid>  
  );
};

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
