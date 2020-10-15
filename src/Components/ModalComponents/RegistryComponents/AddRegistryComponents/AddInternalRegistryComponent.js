import React, { useState } from "react";
import TimeInput from "../../../CommonComponents/TimeInputComponent";
import styled from "styled-components";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addRegistryToStore } from "../../../../Redux/Actions/RegistryActions";

const AddInternalRegistry = ({ date, onCloseModal, addRegistry }) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  const onAddRegistry = () => {
    const mins = parseFloat(minutes) / 60;
    const time = parseFloat(hours) + mins;

    const id = uuidv4();

    const registryToReport = {
      registryId: 0,
      taskId: null,
      userId: 1,
      hours: time,
      created: new Date().toJSON(),
      date: date.toJSON(),
      invoice: 0,
      uuid: id,
    };

    let day = date.getDay();
    if (day === 7) {
      day = 0;
    }

    const registry = {
      registryId: id,
      missionName: "Internal time",
      taskName: null,
      taskId: null,
      day: day,
      hours: time,
      created: new Date().toJSON(),
      date: date.toJSON(),
      invoice: 0,
      new: true,
      isFromTemplate: false,
    };

    addRegistry([registry, registryToReport]);
    onCloseModal();
  };

  return (
    <Main>
      <TimeInput
        setHours={(value) => setHours(value)}
        setMinutes={(value) => setMinutes(value)}
        hours={hours}
        minutes={minutes}
        titleContent="Add time"
      />
      <Button onClick={onAddRegistry}>Add</Button>
    </Main>
  );
};

const Main = styled.div`
  text-align: center;
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
`;

const mapDispatchToProps = (dispatch) => {
  return {
    addRegistry: (registries) => dispatch(addRegistryToStore(registries)),
  };
};

export default connect(null, mapDispatchToProps)(AddInternalRegistry);
