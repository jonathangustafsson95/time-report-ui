import React from "react";
import styled from "styled-components";
import BoxItem from "./BoxItemComponent";
import { connect } from "react-redux";

const DayBox = ({ day, registries }) => {
  console.log(day);
  console.log(registries);

  let registryList = [];
  registries.map((registry) => {
    registryList.push(<BoxItem registry={registry} />);
  });

  const test = () => {
    console.log("CLICK");
  }

  return (
    <Main>
      <Text>{day}</Text>
      <Box>
        <BoxItemHolder>
          {registryList}
        </BoxItemHolder>
        <Line></Line>
        <Line></Line>
        <Line></Line>
        <Line></Line>
        <Line></Line>
        <Line></Line>
        <Line></Line>
        <Line></Line>

        <AddBtn
          type="image"
          alt="CreateTask"
          src={require("./Images/add.svg")}
          onClick={test}
        ></AddBtn>
      </Box>
    </Main>
  );
};

const BoxItemHolder = styled.div`
  position: absolute;
  min-height: inherit;
  min-width: inherit;
`;

const Main = styled.div``;

const Line = styled.hr`
  margin: 0;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 45px;
  // border-top: 1px dashed #707070;
  // opacity: 0.3;
`;

const Box = styled.div`
  overflow: auto;
  border-radius: 8px;
  height: 45vh;
  min-height: 430px;
  min-width: 140px;
  margin-bottom: 25px;
  background: #fff;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
  text-align: center;
`;

const Text = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  line-height: 46px;
  text-align: left;
  color: #585656;
  opacity: 0.7;
  margin: 0;
  text-align: center;
`;

const AddBtn = styled.input`
  margin-top: 20px;
  &:hover {
    transform: scale(1.1) perspective(1px);
  }
`;

const mapStateToProps = (state, ownProps) => {
  return {
    registries: state.registryData.registriesByWeek.filter(
      (registry) => registry.dayOfWeek === ownProps.dayConst
    ),
  };
};

export default connect(mapStateToProps)(DayBox);
