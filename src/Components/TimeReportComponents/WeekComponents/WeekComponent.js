import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DayBox from "./DayBoxComponent";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import {
  fetchTimeReportData,
  resetIsSuccesfullySaved,
  saveChanges,
} from "../../../Redux/Actions/RegistryActions";
import { setDate } from "../../../Redux/Actions/SettingsActions";
import SnackBar from "../../SnackBarComponents/SnackBarComponent";
import { Redirect } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";

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
  authData,
  saveChanges,
  resetIsSuccesfullySaved,
  setDate,
  date,
}) => {
  const [showSnackBar, setShowSnackBar] = useState(true);
  const [isReporting, setIsReporting] = useState(false);

  useEffect(() => {
    resetIsSuccesfullySaved();
    fetchData(authData.user.token, date);
  }, [fetchData, authData.user.token, date, resetIsSuccesfullySaved]);

  const onReportRegistries = (token) => {
    saveChanges(
      registryData.registriesToReport,
      registryData.registriesToDelete,
      token
    );
    setShowSnackBar(true);
    setIsReporting(true);
  };

  if (isReporting && !registryData.loading) {
    if (!registryData.error) {
      return <Redirect to="/" />;
    }
    setIsReporting(false);
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

  return (
    <div>
      <BoxDiv>
        <Text>{getMonAndSun()}</Text>
        <Inner>
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
        </Inner>
      </BoxDiv>
      <Button onClick={() => onReportRegistries(authData.user.token)}>
        Save Changes
      </Button>

      {registryData.error && (
        <SnackBar
          show={showSnackBar}
          hide={() => setShowSnackBar(false)}
          error={true}
        />
      )}
    </div>
  );
};

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  color: #fff;
  margin-left: 40%;
  margin-right: 40%;
  width: 189px;
  height: 40px;
  border-radius: 8px;
  background: #585656;
  border: 2px solid #585656;
`;

const BoxDiv = styled.div`
  border-radius: 8px;
  background: #fff;
  // @media (min-width: 2000px) {
  //   transform: scale(1.2);
  //   margin-top: 100px;
  //   margin-bottom: 100px;
  // }
  margin-bottom: 30px;
  filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.16));
`;

const BoxHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  margin-left: 30px;
  margin-right: 30px;
  //margin-bottom: 50px;
`;

const Text = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  line-height: 44px;
  color: #585656;
  text-align: center;
`;

const mapStateToProps = (state) => {
  return {
    authData: state.authData,
    registryData: state.registryData,
    date: state.settings.date,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (token, date) => dispatch(fetchTimeReportData(token, date)),
    saveChanges: (registriesToReport, registriesToDelete, token) =>
      dispatch(saveChanges(registriesToReport, registriesToDelete, token)),
    resetIsSuccesfullySaved: () => dispatch(resetIsSuccesfullySaved()),
    setDate: (type) => dispatch(setDate(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);
