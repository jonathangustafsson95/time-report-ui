import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import AddInternalRegistry from "./AddInternalRegistryComponent";
import AddCustomerRegistry from "./AddCustomerRegistryComponent";
import Icon from "./IconComponent";

const AddRegistryModal = ({ date, showModal, onCloseModal }) => {
  const [registryType, setRegistryType] = useState({
    internal: true,
    customer: false,
  });

  const toggleButton = (buttonName) => {
    setRegistryType({
      [buttonName]: !registryType[buttonName],
    });
  };

  return (
    <RegistryModal show={showModal} onHide={onCloseModal}>
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
          <AddCustomerRegistry date={date} onCloseModal={onCloseModal} />
        )}
      </Modal.Body>
    </RegistryModal>
  );
};

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

const RegistryModal = styled(Modal)`
  margin-top: 15%;
`;

export default AddRegistryModal;
