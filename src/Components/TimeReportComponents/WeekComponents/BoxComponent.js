import React, { useState } from "react";
import styled from "styled-components";
import BoxItem from "./BoxItemComponent";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import AddRegistryModal from "../../Modals/RegistryModals/AddRegistry/AddRegistryModal";
import { addRegistryToStore, updateNewRegistryFromStore, updateOldRegistryFromStore } from "../../../Redux/Actions/RegistryActions";

const DayBox = ({ day, dayConst, registries, addRegistry, updateNewRegistry, updateOldRegistry }) => {
  var d = new Date();
  var dayC = d.getDay(),
    diff = d.getDate() - dayC + (dayC === 0 ? -6 : 1);
  d.setDate(diff);
  if (dayConst === 0) {
    d.setDate(d.getDate() + dayConst + 6);
  } else {
    d.setDate(d.getDate() + dayConst - 1);
  }

  const [showModal, setShowModal] = useState(false);
  const [date] = useState(d);

  const onCloseAddModal = () => {
    setShowModal(false);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e) => {
    let registry = JSON.parse(e.dataTransfer.getData("registry"));
    const from = e.dataTransfer.getData("from");
    const d = new Date();
    let day = date.getDay();
    if (day === 7) {
      day = 0;
    }
    registry.day = day;
    registry.date = date.toJSON();
    registry.isFromTemplate = false;

    let registryToReport = {
      registryId: registry.id,
      taskId: registry.taskId,
      userId: 1,
      hours: registry.hours,
      created: d.toJSON(),
      date: date.toJSON(),
      invoice: registry.invoice,
    };

    switch (from) {
      case "boxComponent":
        registryToReport.registryId = registry.new ? 0 : registry.registryId;
        registryToReport.uuid = registry.registryId;
        registryToReport.created = registry.created;

        registry.new
          ? updateNewRegistry([registry, registryToReport])
          : updateOldRegistry([registry, registryToReport]);

        break;
      case "latestRegistries":
        const id = uuidv4();
        registry.registryId = id;
        registryToReport.uuid = id;
        registryToReport.registryId = 0;
        registry.created = d.toJSON();
        registry.new = true;

        addRegistry([registry, registryToReport]);
        break;

      default:
        break;
    }
    e.dataTransfer.clearData(["registry"]);
    e.dataTransfer.clearData(["from"]);
  };

  let registryList = [];
  registries.sort((a, b) => (a.hours < b.hours ? 1 : -1));
  registries.forEach((registry) => {
    registryList.push(
      <BoxItem registry={registry} key={registry.registryId} />
    );
  });

  return (
    <Main onDrop={(e) => handleOnDrop(e)} onDragOver={(e) => onDragOver(e)}>
      <AddRegistryModal
        showModal={showModal}
        onCloseModal={onCloseAddModal}
        date={date}
      />

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
          onClick={() => setShowModal(true)}
        ></AddBtn>
      </Box>
    </Main>
  );
};

const BoxItemHolder = styled.div`
  position: fixed;
  min-height: 368px;
  max-height: 368px;
  overflow: auto;
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

const mapDispatchToProps = (dispatch) => {
  return {
    addRegistry: (registries) => dispatch(addRegistryToStore(registries)),
    updateNewRegistry: (registries) => dispatch(updateNewRegistryFromStore(registries)),
    updateOldRegistry: (registries) => dispatch(updateOldRegistryFromStore(registries)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayBox);
