import React from "react";
import styled from "styled-components";
import Icon from "../../WeekComponents/IconComponent";

const LatestRegistryItemComponent = ({ registry }) => {
  const handleOnClick = () => {
    console.log("Click");
  };
  const handleOnDrag = (e) => {
    e.dataTransfer.setData("registry", JSON.stringify(registry));
    e.dataTransfer.setData("from", "latestRegistries");
  };
  return (
    <Box
      onClick={() => handleOnClick()}
      draggable
      onDragStart={(e) => handleOnDrag(e)}
    >
      <Icon color={registry.missionColor} size="large" status={registry.new} from="latest"/>
      <TextDiv>
        <Project>{registry.missionName}</Project>
        <Mission>{registry.taskName}</Mission>
      </TextDiv>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  width: 190px;
  height: 65px;
  padding-left: 20px;
  background: #fff;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  margin-left: 30px;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
    transform: scale(1.02) perspective(1px);
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const Project = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #585656;
  text-align: left;
`;

const Mission = styled(Project)`
  margin: 0;
  font-size: 10px;
  opacity: 0.85;
`;

export default LatestRegistryItemComponent;
