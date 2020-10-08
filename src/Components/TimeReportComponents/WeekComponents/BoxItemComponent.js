import React, { useState } from "react";
import styled from "styled-components";
import RegistryInfoModal from "../../Modals/RegistryModals/RegistryInfo/RegistryInfoModal";
import { commitRegistryFromTemplateToStore } from "../../../Redux/Actions/RegistryActions";
import { connect } from "react-redux";

const BoxItem = ({ registry, commitTemplateRegistry, reload }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(registry);

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

  return (
    <>
      <RegistryInfoModal
        onCloseModal={onCloseModal}
        showModal={showModal}
        registry={registry}
      />
      <Box
        hours={registry.hours}
        draggable
        onClick={() => handleClick()}
        opacity={registry.isFromTemplate ? 0.5 : 1}
      >
        <InfoDiv>
          <RegisterImage src={require("./Images/register.svg")} />
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
  border: 4px solid #f08b7b;
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

const RegisterImage = styled.img`
  opacity: 1;
  margin-left: 2%;
  margin-right: 5px;
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
