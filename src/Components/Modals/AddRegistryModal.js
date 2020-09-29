import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { addRegistryToStore } from "../../Redux/Actions/RegistryActions";

const AddRegistry = ({ addRegistry, date, modalIsOpen, onCloseModal }) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  console.log(date);

  const onAddRegistry = () => {
    const mins = (parseFloat(minutes) / 60) * 1;
    const time = parseFloat(hours) + mins;

    const registryToReport = {
      registryId: 0,
      taskId: null,
      userId: 1,
      hours: time,
      created: new Date().toJSON(),
      date: date.toJSON(),
      invoice: 0,
    };

    const registry = {
      registryId: 0,
      hours: time,
      day: date.getDay() - 1,
      missionName: "Internal",
      taskName: "",
    };

    addRegistry([registry, registryToReport]);
    onCloseModal();
  };

  return (
    <Modal show={modalIsOpen} onHide={onCloseModal}>
      {/* <Modal.Header>
        <Text>New Report</Text>
      </Modal.Header> */}
      <Modal.Body>
        <InputDiv>
          <Input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <Line></Line>
          <Input
            type="number"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </InputDiv>
        <Button onClick={onAddRegistry}>Add</Button>
      </Modal.Body>
    </Modal>
  );
};

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
  margin-left: auto;
  margin-right: auto;
`;

const Line = styled.hr`
  margin: 0;
  width: 0px;
  height: 24px;
  background: transparent;
  border: 1px solid #585656;
  opacity: 0.7;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 74px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 6px;
  background: #fff;
  opacity: 0.7;
  border: 2px solid #585656;
  margin-bottom: 50px;
  margin-top: 30px;
`;

const Input = styled.input`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  width: 30px;
  height: 25px;
  letter-spacing: 0.08em;
  line-height: 36px;
  text-align: center;
  color: #585656;
  border: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const mapDispatchToProps = (dispatch) => {
  return {
    addRegistry: (registry) => dispatch(addRegistryToStore(registry)),
  };
};

export default connect(null, mapDispatchToProps)(AddRegistry);
