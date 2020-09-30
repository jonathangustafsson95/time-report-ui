import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { addRegistryToStore } from "../../Redux/Actions/RegistryActions";
import TimeInput from "../CommonComponents/TimeInputComponent";

const AddRegistryModal = ({
  addRegistry,
  date,
  showAddModal,
  onCloseAddModal,
}) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [registryType, setRegistryType] = useState({
    internal: true,
    customer: false,
  });

  const toggleButton = (buttonName) => {
    setRegistryType({
      [buttonName]: !registryType[buttonName],
    });
  };

  const onAddRegistry = () => {
    const mins = (parseFloat(minutes) / 60) * 1;
    const time = parseFloat(hours) + mins;

    const registryToReport = {
      registryId: 0,
      taskId: null,
      userId: 1,
      hours: time,
      created: new Date().toJSON(),
      date: date.toJSON(),
      invoice: 0,
    };

    let day = date.getDay();
    console.log(day);
    if (day === 7) {
      day = 0;
    }

    const registry = {
      registryId: 0,
      hours: time,
      day: day,
      missionName: "Internal time",
      taskName: "",
    };

    addRegistry([registry, registryToReport]);
    onCloseAddModal();
  };

  return (
    <RegistryModal show={showAddModal} onHide={onCloseAddModal}>
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
            <Icon
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
            >
              <g
                id="Group_285"
                data-name="Group 285"
                transform="translate(-211 -22.485)"
              >
                <g
                  id="Ellipse_94"
                  data-name="Ellipse 94"
                  transform="translate(211 22.485)"
                  fill="none"
                  stroke="#707070"
                  stroke-width="1"
                  opacity="0.6"
                >
                  <circle cx="8.5" cy="8.5" r="8.5" stroke="none" />
                  <circle cx="8.5" cy="8.5" r="8" fill="none" />
                </g>
                <g
                  id="Ellipse_97"
                  data-name="Ellipse 97"
                  transform="translate(217 28.485)"
                  fill="#707070"
                  stroke="#707070"
                  stroke-width="1"
                  opacity="0.6"
                >
                  <circle cx="2.5" cy="2.5" r="2.5" stroke="none" />
                  <circle cx="2.5" cy="2.5" r="2" fill="none" />
                </g>
              </g>
            </Icon>
          </IconButton>
          <MenuLine />
          <IconButton
            selected={registryType.customer}
            onClick={() => toggleButton("customer")}
          >
            <Icon
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
            >
              <g
                id="Group_285"
                data-name="Group 285"
                transform="translate(-211 -22.485)"
              >
                <g
                  id="Ellipse_94"
                  data-name="Ellipse 94"
                  transform="translate(211 22.485)"
                  fill="none"
                  stroke="#707070"
                  stroke-width="1"
                  opacity="0.6"
                >
                  <circle cx="8.5" cy="8.5" r="8.5" stroke="none" />
                  <circle cx="8.5" cy="8.5" r="8" fill="none" />
                </g>
                <g
                  id="Ellipse_97"
                  data-name="Ellipse 97"
                  transform="translate(217 28.485)"
                  fill="#707070"
                  stroke="#707070"
                  stroke-width="1"
                  opacity="0.6"
                >
                  <circle cx="2.5" cy="2.5" r="2.5" stroke="none" />
                  <circle cx="2.5" cy="2.5" r="2" fill="none" />
                </g>
              </g>
            </Icon>
          </IconButton>
        </IconMenuDiv>
        <TimeInput
          setHours={(value) => setHours(value)}
          setMinutes={(value) => setMinutes(value)}
          hours={hours}
          minutes={minutes}
          titleContent="Add time"
        />
        <Button onClick={onAddRegistry}>Add</Button>
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

const Icon = styled.svg`
  transform: scale(1.4);
`;

const RegistryModal = styled(Modal)`
  margin-top: 15%;
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
  margin-left: 30%;
`;

const mapDispatchToProps = (dispatch) => {
  return {
    addRegistry: (registry) => dispatch(addRegistryToStore(registry)),
  };
};

export default connect(null, mapDispatchToProps)(AddRegistryModal);
