import React from "react";
import styled from "styled-components";

const TimeInput = ({
  setHours,
  setMinutes,
  hours,
  minutes,
  titleContent,
  setIsValid,
}) => {
  const validate = (e, type) => {
    if (type === "hours") {
      if (e.target.value > 0 && e.target.value < 12) {
        if (Number.isInteger(e.target.value)) {
          setIsValid(true);
          return;
        }
      }
    } else {
      if (e.target.value > 15 && e.target.value < 60) {
        setIsValid(true);
        return;
      }
    }
    setIsValid(false);
  };
  return (
    <div>
      <Title>{titleContent}</Title>
      <MenuDiv>
        <Text>h</Text>
        <SpaceDiv />
        <Text>m</Text>
      </MenuDiv>

      <InputDiv>
        <Input
          type="number"
          id="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          // onBlur={(e) => validate(e, "hours")}
        />
        <Line></Line>
        <Input
          type="number"
          id="minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          // onBlur={(e) => validate(e, "minutes")}
        />
      </InputDiv>
    </div>
  );
};

const MenuDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.08em;
  line-height: 46px;
  text-align: left;
  color: #585656;
  margin: 0;
  text-align: center;
  opacity: 0.7;
`;

const Title = styled(Text)`
  font-size: 14px;
  margin-bottom: -20px;
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
  margin-top: -13px;
  margin-bottom: 40px;
`;

const Line = styled.hr`
  margin: 0;
  width: 0px;
  height: 24px;
  background-color: #585656;
  border: 1px solid #585656;
  opacity: 0.7;
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

const SpaceDiv = styled.div`
  width: 20px;
`;

export default TimeInput;
