import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RegistryInfoModal from "../../ModalComponents/RegistryComponents/RegistryInfoComponents/RegistryInfoComponent";
import { commitRegistryFromTemplateToStore } from "../../../Redux/Actions/RegistryActions";
import { connect } from "react-redux";
import Icon from "./IconComponent";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const renderTooltip = (props, registry) => {
  return (
    <Tooltip id="button-tooltip" {...props}>
      <MText>{registry.missionName}</MText>
      <TText>{registry.taskName}</TText>
    </Tooltip>
  );
};

const BoxItem = ({ registry, commitTemplateRegistry, reload }) => {
  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    registry.hours < 1 && setShowOverlay(true);
  }, [registry]);

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
  };

  return (
    <>
      <RegistryInfoModal
        onCloseModal={onCloseModal}
        showModal={showModal}
        registry={registry}
      />
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 100 }}
        overlay={(props) => renderTooltip(props, registry)}
        registry={registry}
        show={showOverlay ? undefined : false}
      >
        <Box
          hours={registry.hours}
          color={registry.taskId ? registry.missionColor : "#EB6D6D"}
          registry={registry}
          draggable
          onDragStart={(e) => handleOnDrag(e)}
          onClick={() => handleClick()}
          opacity={registry.isFromTemplate ? 0.5 : 1}
        >
          {registry.hours >= 1 ? (
            <InfoDiv>
              <Icon
                color={registry.taskId ? registry.missionColor : "#EB6D6D"}
              />
              <TextDiv>
                <MissionText>{registry.missionName}</MissionText>
                <TaskText>{registry.taskName}</TaskText>
              </TextDiv>
            </InfoDiv>
          ) : null}
        </Box>
      </OverlayTrigger>
    </>
  );
};

const Box = styled.div`
  margin: 0 auto;
  margin-right: 6%;
  margin-left: 6%;
  border-radius: 6px;
  text-align: center;
  background-color: ${(props) =>
    props.registry.hours >= 1 ? "white" : props.color};
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
  padding-left: 5px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const TextDiv = styled.div`
  margin-left: 5px;
`;

const MissionText = styled.h3`
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

const MText = styled(MissionText)`
  color: white;
`;
const TText = styled(TaskText)`
  color: white;
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
