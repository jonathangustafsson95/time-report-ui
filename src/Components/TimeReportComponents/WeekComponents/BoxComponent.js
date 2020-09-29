import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import BoxItem from "./BoxItemComponent";
import { connect } from "react-redux";
import Modal from "../../Modals/Modal";
import AddRegistry from "../../Modals/AddRegistryModal";

const DayBox = ({ day, dayConst, registries }) => {
  var d = new Date();
  var dayC = d.getDay(),
    diff = d.getDate() - dayC + (dayC == 0 ? -6 : 1);
  d.setDate(diff);
  d.setDate(d.getDate() + dayConst);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState(d);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setModalIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  let registryList = [];
  registries.map((registry) => {
    registryList.push(
      <BoxItem registry={registry} key={registry.registryId} />
    );
  });

  return (
    <Main>
      <Modal isOpen={modalIsOpen}>
        <AddRegistry date={date} closeModal={closeModal} />
      </Modal>
      <Text>{day}</Text>
      <Box>
        <BoxItemHolder>{registryList}</BoxItemHolder>
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
          alt="AddRegistry"
          src={require("./Images/add.svg")}
          onClick={() => setModalIsOpen(true)}
        ></AddBtn>
      </Box>
    </Main>
  );
};

const BoxItemHolder = styled.div`
  position: absolute;
  min-height: inherit - 100px;
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
  //height: 45vh;
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
    transform: scale(1.03) perspective(1px);
  }
  &:focus {
    outline: 0;
  }
`;

const mapStateToProps = (state, ownProps) => {
  return {
    registries: state.registryData.registriesByWeek.filter(
      (registry) => registry.day === ownProps.dayConst
    ),
  };
};

export default connect(mapStateToProps)(DayBox);
