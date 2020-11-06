import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styled from "styled-components";
import DayBox from "./DayBoxComponent";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import {
  fetchTimeReportData,
  resetIsSuccesfullySaved,
  saveChanges,
  resetRegistryDataStore,
} from "../../../Redux/Actions/RegistryActions";
import {
  fetchMarkedMissions,
  resetMissionDataStore,
} from "../../../Redux/Actions/MissionActions";
import { setDate } from "../../../Redux/Actions/SettingsActions";
import SnackBar from "../../SnackBarComponents/SnackBarComponent";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  week: {
    borderRadius: 10,
    background: "#fafafa",
    filter: "drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.16))",
  },
  button: {
    marginTop: 15,
  },
});

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
`;

const Week = ({
  fetchData,
  registryData,
  saveChanges,
  resetIsSuccesfullySaved,
  setDate,
  date,
  fetchMarkedMissions,
  resetRegistryDataStore,
  resetMissionDataStore,
  isSuccesfullySaved,
}) => {
  const [showSnackBar, setShowSnackBar] = useState(true);
  const [showSecSnackBar, setShowSecSnackBar] = useState(true);
  const [isReporting, setIsReporting] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    fetchData(date);
    fetchMarkedMissions();
  }, [fetchData, fetchMarkedMissions, date, isReporting]);

  const onReportRegistries = () => {
    saveChanges(
      registryData.registriesToReport,
      registryData.registriesToDelete
    );
    setShowSnackBar(true);
    setIsReporting(true);
  };

  useEffect(() => {
    return function cleanUp() {
      resetRegistryDataStore();
      resetMissionDataStore();
    };
  }, []);

  if (isReporting && !registryData.loading) {
    if (!registryData.error) {
      setIsReporting(false);
    }
  }

  const getMonAndSun = () => {
    let dM = new Date(date.valueOf());
    let dS = new Date(date.valueOf());

    const mon = dM.getDay();
    const diff = dM.getDate() - mon + (mon === 0 ? -6 : 1);
    dM.setDate(diff);
    dS.setDate(dS.getDate() - mon + 7);
    const monday = `${dM.getFullYear()}.${dM.getMonth() + 1}.${dM.getDate()}`;
    const sunday = `${dS.getFullYear()}.${dS.getMonth() + 1}.${dS.getDate()}`;

    return `${monday} - ${sunday}`;
  };

  const switchWeek = (e, type) => {
    setDate(type);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid container item xs={12} className={classes.week}>
        <Grid container item xs={12} justify="center">
          <Text>{getMonAndSun()}</Text>
        </Grid>
        <WeekHolder>
          <IconButton onClick={(e) => switchWeek(e, "back")}>
            <ArrowBackIosIcon />
          </IconButton>
          <BoxHolder>
            <DayBox day="Mon" dayConst={1}></DayBox>
            <DayBox day="Tue" dayConst={2}></DayBox>
            <DayBox day="Wed" dayConst={3}></DayBox>
            <DayBox day="Thu" dayConst={4}></DayBox>
            <DayBox day="Fri" dayConst={5}></DayBox>
            <DayBox day="Sat" dayConst={6}></DayBox>
            <DayBox day="Sun" dayConst={0}></DayBox>
            <BeatLoader
              loading={registryData.loading}
              css={override}
              color={"#585656"}
            ></BeatLoader>
          </BoxHolder>
          <IconButton onClick={(e) => switchWeek(e, "forward")}>
            <ArrowForwardIosIcon />
          </IconButton>
        </WeekHolder>
      </Grid>
      <Grid container item xs={12} justify="center">
        <Button onClick={() => onReportRegistries()} className={classes.button}>
          Report
        </Button>
      </Grid>
      {registryData.error && (
        <SnackBar
          show={showSnackBar}
          hide={() => setShowSnackBar(false)}
          error={true}
          content={registryData.errorMsg}
        />
      )}
      {isSuccesfullySaved && (
        <SnackBar
          show={showSecSnackBar}
          hide={() => {
            setShowSecSnackBar(false);
            resetIsSuccesfullySaved();
            setShowSecSnackBar(true);
          }}
        />
      )}
    </Grid>
  );
};

const WeekHolder = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  color: #fff;
  width: 189px;
  height: 40px;
  border-radius: 8px;
  background: #585656;
  border: 2px solid #585656;
`;

const BoxHolder = styled.div`
  overflow: auto;
  display: flex;
  width: 100%;
  align-content: space-between;
`;

const Text = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  line-height: 44px;
  color: #585656;
`;

const mapStateToProps = (state) => {
  return {
    registryData: state.registryData,
    date: state.settings.date,
    isSuccesfullySaved: state.registryData.isSuccesfullySaved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (date) => dispatch(fetchTimeReportData(date)),
    saveChanges: (registriesToReport, registriesToDelete) =>
      dispatch(saveChanges(registriesToReport, registriesToDelete)),
    resetIsSuccesfullySaved: () => dispatch(resetIsSuccesfullySaved()),
    setDate: (type) => dispatch(setDate(type)),
    fetchMarkedMissions: () => dispatch(fetchMarkedMissions()),
    resetRegistryDataStore: () => dispatch(resetRegistryDataStore()),
    resetMissionDataStore: () => dispatch(resetMissionDataStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);
