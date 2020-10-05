import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import TimeInput from "../../CommonComponents/TimeInputComponent";
import {
  removeNewRegistryFromStore,
  removeRegistryFromStore,
  updateNewRegistryFromStore,
  updateOldRegistryFromStore,
} from "../../../Redux/Actions/RegistryActions";

const RegistryInfoModal = ({
  showModal,
  onCloseModal,
  registry,
  removeNewRegistry,
  removeOldRegistry,
  updateNewRegistry,
  updateOldRegistry,
}) => {
  const tmpHour = Math.floor(registry.hours);
  const tmpMinutes = (registry.hours - tmpHour) * 60;
  const [hours, setHours] = useState(tmpHour);
  const [minutes, setMinutes] = useState(tmpMinutes);

  const onDelete = (registry) => {
    registry.new ? removeNewRegistry(registry) : removeOldRegistry(registry);
    onCloseModal();
  };

  const updateRegistry = (registry) => {
    const updatedReg = JSON.parse(JSON.stringify(registry));

    const mins = parseFloat(minutes) / 60;
    const time = parseFloat(hours) + mins;

    updatedReg.hours = time;

    const registryToReport = {
      registryId: updatedReg.new ? 0 : updatedReg.registryId,
      taskId: updatedReg.taskId,
      userId: 1,
      hours: updatedReg.hours,
      created: updatedReg.created,
      date: updatedReg.date,
      invoice: 0,
      uuid: updatedReg.registryId,
    };

    console.log(registryToReport);
    registry.new
      ? updateNewRegistry([updatedReg, registryToReport])
      : updateOldRegistry([updatedReg, registryToReport]);

    onCloseModal();
  };

  return (
    <RegistryModal show={showModal} onHide={onCloseModal}>
      <Modal.Header>
        <Text>{registry.missionName}</Text>
        <DeleteBtn
          type="image"
          alt="delete"
          src={require("./Icons/trash.svg")}
          onClick={() => onDelete(registry)}
        ></DeleteBtn>
      </Modal.Header>
      <Modal.Body>
        <TimeInput
          setHours={(value) => setHours(value)}
          setMinutes={(value) => setMinutes(value)}
          hours={hours}
          minutes={minutes}
          titleContent="Change time"
        />
      </Modal.Body>
      <Button onClick={() => updateRegistry(registry)}>Update</Button>
    </RegistryModal>
  );
};

const DeleteBtn = styled.input`
  &:hover {
    transform: scale(1.07) perspective(1px);
  }
  &:focus {
    outline: 0;
  }
`;

const Text = styled.h1`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.08em;
  margin-left: auto;
  margin-right: auto;
  color: #585656;
`;

const RegistryModal = styled(Modal)`
  margin-top: 15%;
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  color: #fff;
  width: 189px;
  height: 40px;
  border-radius: 8px;
  background: #585656;
  border: 2px solid #585656;
  margin-left: 30%;
  margin-bottom: 40px;
`;

const mapDispatchToProps = (dispatch) => {
  return {
    removeNewRegistry: (registry) =>
      dispatch(removeNewRegistryFromStore(registry)),
    removeOldRegistry: (registry) =>
      dispatch(removeRegistryFromStore(registry)),
    updateNewRegistry: (registries) =>
      dispatch(updateNewRegistryFromStore(registries)),
    updateOldRegistry: (registries) =>
      dispatch(updateOldRegistryFromStore(registries)),
  };
};

export default connect(null, mapDispatchToProps)(RegistryInfoModal);
