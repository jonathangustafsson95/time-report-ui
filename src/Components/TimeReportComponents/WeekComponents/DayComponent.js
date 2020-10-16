import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DayBox from "./DayBoxComponent";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import { fetchTimeReportDayData, resetIsSuccesfullySaved, saveChanges } from "../../../Redux/Actions/RegistryActions";
import { setDateMobile } from "../../../Redux/Actions/SettingsActions";
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

const Day = ({fetchData,registryData,authData,saveChanges,resetIsSuccesfullySaved,setDateMobile,date,}) => {
  const [showSnackBar, setShowSnackBar] = useState(true);
  const [isReporting, setIsReporting] = useState(false);

  useEffect(() => {
    resetIsSuccesfullySaved();
    fetchData(authData.user.token, date);
  }, [fetchData, authData.user.token, date]);

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

  const switchDay = (type) => {
    setDateMobile(type);
  };

  return (
    <div>
      <BoxDiv>
        <Text>SOME FUCKING DATE</Text>
        <Inner>
          <IconButton onClick={() => switchDay("back")}>
            <ArrowBackIosIcon />
          </IconButton>
          <BoxHolder>
            <DayBox day="TODAYS DATE" dayConst={1}></DayBox>
            <BeatLoader
              loading={registryData.loading}
              css={override}
              color={"#585656"}
            ></BeatLoader>
          </BoxHolder>
          <IconButton onClick={() => switchDay("forward")}>
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
    fetchData: (token, date) => dispatch(fetchTimeReportDayData(token, date)),
    saveChanges: (registriesToReport, registriesToDelete, token) =>
      dispatch(saveChanges(registriesToReport, registriesToDelete, token)),
    resetIsSuccesfullySaved: () => dispatch(resetIsSuccesfullySaved()),
    setDateMobile: (type) => dispatch(setDateMobile(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
