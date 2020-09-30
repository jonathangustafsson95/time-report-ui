import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import TimeInput from "../CommonComponents/TimeInputComponent";

const RegistryInfoModal = ({ showInfoModal, onCloseInfoModal, registry }) => {
  const tmpHour = Math.floor(registry.hours);
  const tmpMinutes = (registry.hours - tmpHour) * 60;
  const [hours, setHours] = useState(tmpHour);
  const [minutes, setMinutes] = useState(tmpMinutes);

  return (
    <RegistryModal show={showInfoModal} onHide={onCloseInfoModal}>
      <Modal.Header>
        <Text>{registry.missionName}</Text>
        <DeleteBtn
          type="image"
          alt="delete"
          src={require("./Icons/trash.svg")}
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

export default RegistryInfoModal;
