import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DayBox from "./BoxComponent";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import {
  fetchRegistriesByWeek,
  saveChanges,
} from "../../../Redux/Actions/RegistryActions";
import { Redirect } from "react-router-dom";

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
`;

const Week = ({ registryData, fetchRegistries, saveChanges, authData }) => {
  useEffect(() => {
    fetchRegistries(authData.user.token);
  }, [fetchRegistries, authData.user.token]);

  const [reportSuccess, setreportSuccess] = useState(false);

  const onReportRegistries = (token) => {
    saveChanges(
      registryData.registriesToReport,
      registryData.registriesToDelete,
      token
    );
    if (!registryData.error) {
      setreportSuccess(true);
    }
  };

  if (reportSuccess) {
    return <Redirect to="/" />;
  }

  const getMonAndSun = () => {
    let d = new Date();

    const mon = d.getDay(),
      diff = d.getDate() - mon + (mon === 0 ? -6 : 1);
    d.setDate(diff);
    const monday = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
    d.setDate(d.getDay() + 10);
    const sunday = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;

    return `${monday} - ${sunday}`;
  };

  return (
    <div>
      <BoxDiv>
        <Text>{getMonAndSun()}</Text>
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
        {registryData.error && (
          <ErrorMsg>
            Sorry something went wrong... "{registryData.errorMsg}"
          </ErrorMsg>
        )}
      </BoxDiv>
      <Button onClick={() => onReportRegistries(authData.user.token)}>
        Save Changes
      </Button>
    </div>
  );
};

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
  @media (min-width: 2000px) {
    transform: scale(1.2);
    margin-top: 100px;
    margin-bottom: 100px;
  }
  margin-bottom: 30px;
  filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.16));
`;

const BoxHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  margin-left: 50px;
  margin-right: 50px;
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

const ErrorMsg = styled(Text)`
  color: #ff2366; ;
`;

const mapStateToProps = (state) => {
  return {
    authData: state.authData,
    registryData: state.registryData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRegistries: (token) => dispatch(fetchRegistriesByWeek(token)),
    saveChanges: (registriesToReport, registriesToDelete, token) =>
      dispatch(saveChanges(registriesToReport, registriesToDelete, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);
