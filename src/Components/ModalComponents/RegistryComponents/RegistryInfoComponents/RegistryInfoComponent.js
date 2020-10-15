import React from "react";
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

const RegistryInfo = ({
  showModal,
  onCloseModal,
  registry,
  removeNewRegistry,
  removeOldRegistry,
  updateNewRegistry,
  updateOldRegistry,
}) => {
  const onDelete = (registry) => {
    registry.new ? removeNewRegistry(registry) : removeOldRegistry(registry);
    onCloseModal();
  };

  const updateRegistry = (updatedReg) => {
    const registryToReport = {
      registryId: updatedReg.new ? 0 : updatedReg.registryId,
      taskId: updatedReg.taskId,
      userId: 1,
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
  };

  return (
    <Modal
      show={showModal}
      onHide={onCloseModal}
      dialogClassName="modal-90w"
      centered
    >
      <Modal.Header>
        <Text>{registry.missionName}</Text>
        <Text>{registry.taskName}</Text>
        <IconButton onClick={() => onDelete(registry)}>
          <TrashIcon />
        </IconButton>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      {!registry.taskId ? (
        <InternalInfo registry={registry} updateRegistry={updateRegistry} />
      ) : (
        <CustomerInfo registry={registry} updateRegistry={updateRegistry} />
      )}
    </Modal>
  );
};

// const DeleteBtn = styled.input`
//   &:hover {
//     transform: scale(1.07) perspective(1px);
//   }
//   &:focus {
//     outline: 0;
//   }
// `;

const Text = styled.h1`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.08em;
  margin-left: auto;
  margin-right: auto;
  color: #585656;
`;

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
  };
};

export default connect(null, mapDispatchToProps)(RegistryInfo);
