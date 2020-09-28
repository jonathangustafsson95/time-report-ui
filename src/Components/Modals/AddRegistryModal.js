import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addRegistryToStore } from "../../Redux/Actions/RegistryActions";

const AddRegistry = ({ addRegistry, date, closeModal }) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  const onAddRegistry = () => {
    const mins = parseFloat(minutes) / 60 * 1;
    const time = parseFloat(hours) + mins;

    const registryToReport = {
      registryId: -1,
      taskId: -1,
      userId: 1,
      hours: time,
      created: Date.now(),
      date: date,
      invoice: 0,
    };

    const registry = {
      registryId: -1,
      hours: time,
      day: date.getDay() - 1,
      missionName: "Internal",
      taskName: "",
    }

    addRegistry([registry, registryToReport]);
    closeModal();
  };

  return (
    <RootDiv>
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
    </RootDiv>
  );
};

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  color: #fff;
  width: 189px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  background: #585656;
  border: 2px solid #585656;
  text-align: center;
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

const RootDiv = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  margin-top: 100px;
  border-radius: 14px;
  width: 350px;
  height: 200px;
  background: #fff;
  box-shadow: 0 0 0 1600px rgba(0, 0, 0, 0.3);
`;

const mapDispatchToProps = (dispatch) => {
  return {
    addRegistry: (registry) => dispatch(addRegistryToStore(registry)),
  };
};

export default connect(null, mapDispatchToProps)(AddRegistry);
