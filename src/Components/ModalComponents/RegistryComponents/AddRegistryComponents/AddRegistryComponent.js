import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import AddInternalRegistry from "./AddInternalRegistryComponent";
import AddCustomerRegistry from "./AddCustomerRegistryComponent";
import Icon from "../../IconComponents/MenuIconComponent";
import "../Css/Modal.css";
import { isMobile } from "react-device-detect";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { connect } from "react-redux";
import { resetMissionsFromStore } from "../../../../Redux/Actions/MissionActions";

const AddRegistry = ({ date, showModal, onCloseModal, resetMissions }) => {
  const [registryType, setRegistryType] = useState({
    internal: true,
    customer: false,
  });
  const [currentMission, setCurrentMission] = useState(null);
  const toggleButton = (buttonName) => {
    buttonName === "internal"
      ? setRegistryType({ internal: true, customer: false })
      : setRegistryType({ internal: false, customer: true });
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
        <Modal.Body>
          <ArrowBackIosIcon onClick={() => onCloseModal()} />
          <Text>New Registry</Text>
          <MenuDiv>
            <Title>Internal Time</Title>
            <SpaceDiv />
            <Title>Customer Time</Title>
          </MenuDiv>
          <IconMenuDiv>
            <IconButton
              selected={registryType.internal}
              onClick={() => toggleButton("internal")}
            >
              <Icon />
            </IconButton>
            <MenuLine />
            <IconButton
              selected={registryType.customer}
              onClick={() => toggleButton("customer")}
            >
              <Icon />
            </IconButton>
          </IconMenuDiv>
          {registryType.internal ? (
            <AddInternalRegistry date={date} onCloseModal={onCloseModal} />
          ) : (
            <AddCustomerRegistry
              date={date}
              onCloseModal={onCloseModal}
              currentMission={currentMission}
              setCurrentMission={setCurrentMission}
            />
          )}
        </Modal.Body>
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
        <Modal.Body>
          <Text>New Registry</Text>
          <MenuDiv>
            <Title>Internal Time</Title>
            <SpaceDiv />
            <Title>Customer Time</Title>
          </MenuDiv>
          <IconMenuDiv>
            <IconButton
              selected={registryType.internal}
              onClick={() => toggleButton("internal")}
            >
              <Icon />
            </IconButton>
            <MenuLine />
            <IconButton
              selected={registryType.customer}
              onClick={() => toggleButton("customer")}
            >
              <Icon />
            </IconButton>
          </IconMenuDiv>
          {registryType.internal ? (
            <AddInternalRegistry date={date} onCloseModal={onCloseModal} />
          ) : (
            <AddCustomerRegistry
              date={date}
              onCloseModal={onCloseModal}
              currentMission={currentMission}
              setCurrentMission={setCurrentMission}
            />
          )}
        </Modal.Body>
      </StyledModal>
    );
  }
};

const StyledModal = styled(Modal)`
  z-index: 3000;
  position: absolute;
`;

const IconButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  &:focus {
    outline: none;
  }
  svg {
    g {
      stroke: ${(props) => (props.selected ? "#F00A6B" : "#707070")};
      opacity: ${(props) => (props.selected ? "1" : "0.8")};
    }
  }
`;

const Text = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.08em;
  line-height: 46px;
  text-align: left;
  color: #585656;
  margin: 0;
  text-align: center;
`;

const SpaceDiv = styled.div`
  width: 80px;
  margin-right: 30px;
`;

const Title = styled(Text)`
  font-size: 12px;
`;

const MenuDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconMenuDiv = styled(MenuDiv)`
  margin-bottom: 20px;
`;

const MenuLine = styled.hr`
  margin: 0;
  width: 162px;
  margin-top: 1px;
  background: transparent;
  border: 2px solid #707070;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  border-left: 1px solid rgba(255, 255, 255, 0.25);
  opacity: 0.6;
  margin-right: 7px;
  margin-left: 7px;
`;

const mapDispatchToProps = (dispatch) => {
  return {
    resetMissions: () => dispatch(resetMissionsFromStore()),
  };
};
export default connect(null, mapDispatchToProps)(AddRegistry);
