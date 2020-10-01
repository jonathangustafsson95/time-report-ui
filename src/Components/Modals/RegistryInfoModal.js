import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import TimeInput from "../CommonComponents/TimeInputComponent";
import {
  removeNewRegistryFromStore,
  removeRegistryFromStore,
} from "../../Redux/Actions/RegistryActions";

const RegistryInfoModal = ({
  showInfoModal,
  onCloseInfoModal,
  registry,
  setShowInfoModal,
  removeNewRegistry,
  removeOldRegistry,
}) => {
  const tmpHour = Math.floor(registry.hours);
  const tmpMinutes = (registry.hours - tmpHour) * 60;
  const [hours, setHours] = useState(tmpHour);
  const [minutes, setMinutes] = useState(tmpMinutes);

  const onDelete = (registry) => {
    registry.new ? removeNewRegistry(registry) : removeOldRegistry(registry);
    setShowInfoModal(false);
  };

  return (
    <RegistryModal show={showInfoModal} onHide={onCloseInfoModal}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeNewRegistry: (registry) =>
      dispatch(removeNewRegistryFromStore(registry)),
    removeOldRegistry: (registry) =>
      dispatch(removeRegistryFromStore(registry)),
  };
};

export default connect(null, mapDispatchToProps)(RegistryInfoModal);
