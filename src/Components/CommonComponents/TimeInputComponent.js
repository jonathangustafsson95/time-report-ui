import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "#FF2366",
  },
});

const TimeInput = ({ setHours, hours, minutes, setMinutes, titleContent }) => {
  const classes = useStyles();
  const handleOnChange = (e, value, inputType) => {
    inputType === "hours" ? setHours(value) : setMinutes(value);
  };
  return (
    <Root>
      <Title>{titleContent}</Title>
      <TimeDiv>
        <Text>Pick hours</Text>
        <Slider
          className={classes.root}
          defaultValue={hours}
          aria-labelledby="discrete-slider-small-steps"
          onChange={(e, value) => handleOnChange(e, value, "hours")}
          step={1}
          marks
          min={0}
          max={10}
          valueLabelDisplay="auto"
        />
        <Text>Pick minutes</Text>
        <Slider
          className={classes.root}
          defaultValue={minutes}
          onChange={(e, value) => handleOnChange(e, value, "minutes")}
          aria-labelledby="discrete-slider-small-steps"
          step={15}
          marks
          min={0}
          max={45}
          valueLabelDisplay="auto"
        />
      </TimeDiv>
    </Root>
  );
};

const TimeDiv = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
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
  margin-bottom: 10px;
`;

export default TimeInput;
