import React, { useState } from "react";
import styled from "styled-components";
import RegistryInfoModal from "../../Modals/RegistryModals/RegistryInfo/RegistryInfoModal";
import { commitRegistryFromTemplateToStore } from "../../../Redux/Actions/RegistryActions";
import { connect } from "react-redux";
import Icon from "./IconComponent";

const BoxItem = ({ registry, commitTemplateRegistry, reload }) => {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    if (registry.isFromTemplate) {
      const registryToReport = {
        registryId: 0,
        taskId: registry.taskId,
        userId: 1,
        hours: registry.hours,
        created: registry.created,
        date: registry.date,
        invoice: registry.invoice,
        uuid: registry.registryId,
      };

      commitTemplateRegistry(registryToReport);
    } else {
      setShowModal(true);
    }
  };

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("registry", JSON.stringify(registry));
    e.dataTransfer.setData("from", "boxComponent");
  }

  return (
    <>
      <RegistryInfoModal
        onCloseModal={onCloseModal}
        showModal={showModal}
        registry={registry}
      />
      <Box
        hours={registry.hours}
        color={registry.taskId ? registry.missionColor : "#EB6D6D"}
        draggable
        onDragStart={(e) => handleOnDrag(e)}
        onClick={() => handleClick()}
        opacity={registry.isFromTemplate ? 0.5 : 1}
      >
        <InfoDiv>
          <Icon color={registry.taskId ? registry.missionColor : "#EB6D6D"} />
          <TextDiv>
            <ProjectText>{registry.missionName}</ProjectText>
            <TaskText>{registry.taskName}</TaskText>
          </TextDiv>
        </InfoDiv>
      </Box>
    </>
  );
};

const Box = styled.div`
  margin: 0 auto;
  margin-right: 6%;
  margin-left: 6%;
  border-radius: 6px;
  text-align: center;
  background-color: #ffffff;
  border: 4px solid ${(props) => props.color};
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.1));
  opacity: ${(props) => props.opacity};
  height: ${(props) => props.hours * 46}px;
  &:hover {
    cursor: pointer;
  }
`;

const InfoDiv = styled.div`
  margin-top: 4px;
  margin-left: 4px;
  display: flex;
`;

const TextDiv = styled.div``;

const ProjectText = styled.h3`
  font-family: Roboto;
  font-weight: normal;
  font-size: 10px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #585656;
  margin: 0;
  margin-bottom: 3px;
`;

const TaskText = styled.h4`
  font-family: Roboto;
  font-weight: 500;
  font-size: 7px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #585656;
  margin: 0;
`;

const mapPropsToState = (state) => {
  return {
    reload: state.registryData.registriesByWeek,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    commitTemplateRegistry: (registryToReport) =>
      dispatch(commitRegistryFromTemplateToStore(registryToReport)),
  };
};

export default connect(mapPropsToState, mapDispatchToProp)(BoxItem);
