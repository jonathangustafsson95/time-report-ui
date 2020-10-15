import React, { useState } from "react";
import TimeInput from "../../../CommonComponents/TimeInputComponent";
import styled from "styled-components";

const InternalInfo = ({ registry, updateRegistry }) => {
  const tmpHour = Math.floor(registry.hours);
  const tmpMinutes = (registry.hours - tmpHour) * 60;
  const [hours, setHours] = useState(tmpHour);
  const [minutes, setMinutes] = useState(tmpMinutes);

  const update = () => {
    const updatedReg = JSON.parse(JSON.stringify(registry));
    const mins = parseFloat(minutes) / 60;
    const time = parseFloat(hours) + mins;
    updatedReg.hours = time;

    updateRegistry(updatedReg);
  };

  return (
    <Root>
      <TimeInput
        setHours={(value) => setHours(value)}
        setMinutes={(value) => setMinutes(value)}
        hours={hours}
        minutes={minutes}
        titleContent="Change time"
      />
      <Button onClick={() => update()}>Update</Button>
    </Root>
  );
};

const Root = styled.div`
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
  margin-bottom: 30px;
`;

export default InternalInfo;
