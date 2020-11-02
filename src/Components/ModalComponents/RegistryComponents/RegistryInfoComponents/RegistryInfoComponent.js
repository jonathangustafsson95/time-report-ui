import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import InternalInfo from "./InternalInfoComponent";
import CustomerInfo from "./CustomerInfoComponent";
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "../../IconComponents/TrashIconComponent";
import "../Css/Modal.css";
import {
  removeNewRegistryFromStore,
  removeRegistryFromStore,
  updateNewRegistryFromStore,
  updateOldRegistryFromStore,
} from "../../../../Redux/Actions/RegistryActions";
import { isMobile } from "react-device-detect";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { resetMissionsFromStore } from "../../../../Redux/Actions/MissionActions";

const RegistryInfo = ({
  showModal,
  onCloseModal,
  registry,
  removeNewRegistry,
  removeOldRegistry,
  updateNewRegistry,
  updateOldRegistry,
  userId,
  resetMissions,
}) => {
  const [currentMission, setCurrentMission] = useState(null);
  const onDelete = (registry) => {
    registry.new ? removeNewRegistry(registry) : removeOldRegistry(registry);
    onCloseModal();
    setCurrentMission(null);
  };
  const updateRegistry = (updatedReg) => {
    const registryToReport = {
      registryId: updatedReg.new ? 0 : updatedReg.registryId,
      taskId: updatedReg.taskId,
      userId: userId,
      hours: updatedReg.hours,
      created: updatedReg.created,
      date: updatedReg.date,
      invoice: updatedReg.invoice,
      uuid: updatedReg.registryId,
    };

    registry.new
      ? updateNewRegistry([updatedReg, registryToReport])
      : updateOldRegistry([updatedReg, registryToReport]);
    onCloseModal();
    setCurrentMission(null);
  };
  if (isMobile) {
    return (
      <StyledModal
        show={showModal}
        onHide={onCloseModal}
        centered
        onExited={() => {
          resetMissions();
          setCurrentMission(null);
        }}
      >
        <HeaderDiv>
          <ArrowBackIosIcon onClick={() => onCloseModal()} />
          <TitleDiv>
            <Text>{registry.missionName}</Text>
            <Text>{registry.taskName}</Text>
          </TitleDiv>
          <IconButton onClick={() => onDelete(registry)}>
            <TrashIcon />
          </IconButton>
        </HeaderDiv>
        <Modal.Body></Modal.Body>
        {!registry.taskId ? (
          <InternalInfo registry={registry} updateRegistry={updateRegistry} />
        ) : (
          <CustomerInfo
            registry={registry}
            updateRegistry={updateRegistry}
            currentMission={currentMission}
            setCurrentMission={setCurrentMission}
          />
        )}
      </StyledModal>
    );
  } else {
    return (
      <StyledModal
        show={showModal}
        onHide={onCloseModal}
        dialogClassName="modal-90w"
        centered
        onExited={() => {
          resetMissions();
          setCurrentMission(null);
        }}
      >
        <HeaderDiv>
          <IconButton
            onClick={() => {
              onCloseModal();
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <TitleDiv>
            <Text>{registry.missionName}</Text>
            <Text>{registry.taskName}</Text>
          </TitleDiv>
          <IconButton onClick={() => onDelete(registry)}>
            <TrashIcon />
          </IconButton>
        </HeaderDiv>
        <Modal.Body></Modal.Body>
        {!registry.taskId ? (
          <InternalInfo registry={registry} updateRegistry={updateRegistry} />
        ) : (
          <CustomerInfo
            registry={registry}
            updateRegistry={updateRegistry}
            currentMission={currentMission}
            setCurrentMission={setCurrentMission}
          />
        )}
      </StyledModal>
    );
  }
};

const StyledModal = styled(Modal)`
  z-index: 3000;
  position: absolute;
`;

const HeaderDiv = styled(Modal.Header)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const mapStateToProps = (state) => {
  return {
    userId: state.authData.user.userDetails.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeNewRegistry: (registry) =>
      dispatch(removeNewRegistryFromStore(registry)),
    removeOldRegistry: (registry) =>
      dispatch(removeRegistryFromStore(registry)),
    updateNewRegistry: (registries) =>
      dispatch(updateNewRegistryFromStore(registries)),
    updateOldRegistry: (registries) =>
      dispatch(updateOldRegistryFromStore(registries)),
    resetMissions: () => dispatch(resetMissionsFromStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistryInfo);
