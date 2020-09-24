import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DayBox from "./BoxComponent";
import { fetchTasksByWeek } from '../../../Redux/Actions/TaskActions';

const Week = () => {
    useEffect(() => {
        fetchTasksByWeek();
      }, []);

  return (
    <BoxDiv>
      <Text>2020.09.14 - 2020.09.20</Text>
      <BoxHolder>
        <DayBox day="Mon"></DayBox>
        <DayBox day="Tue"></DayBox>
        <DayBox day="Wed"></DayBox>
        <DayBox day="Thu"></DayBox>
        <DayBox day="Fri"></DayBox>
        <DayBox day="Sat"></DayBox>
        <DayBox day="Sun"></DayBox>
      </BoxHolder>
    </BoxDiv>
  ); 
};

const BoxDiv = styled.div`
  min-width: 1100px;
  height: 560px;
  border-radius: 14px;
  background: #fff;
  filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.16));
`;

const BoxHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  margin-left: 50px;
  margin-right: 50px;
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
        tasks: state.taskData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasksByWeek: dispatch(fetchTasksByWeek()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week);
