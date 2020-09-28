import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DayBox from "./BoxComponent";
import { fetchRegistriesByWeek } from "../../../Redux/Actions/RegistryActions";

const Week = ({ registriesByWeek, fetchRegistries }) => {
  useEffect(() => {
    fetchRegistries();
  }, []);

  return (
    <BoxDiv>
      <Text>2020.09.14 - 2020.09.20</Text>
      <BoxHolder>
        <DayBox day="Mon" dayConst={0}></DayBox>
        <DayBox day="Tue" dayConst={1}></DayBox>
        <DayBox day="Wed" dayConst={2}></DayBox>
        <DayBox day="Thu" dayConst={3}></DayBox>
        <DayBox day="Fri" dayConst={4}></DayBox>
        <DayBox day="Sat" dayConst={5}></DayBox>
        <DayBox day="Sun" dayConst={6}></DayBox>
      </BoxHolder>
    </BoxDiv>
  );
};

const BoxDiv = styled.div`
  border-radius: 8px;
  background: #fff;
  filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.16));
`;

const BoxHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 100px;
`;

const Text = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  line-height: 44px;
  text-align: left;
  color: #585656;
  text-align: center;
`;

const mapStateToProps = (state) => {
  return {
    registryData: state.registryData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRegistries: () => dispatch(fetchRegistriesByWeek()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);
