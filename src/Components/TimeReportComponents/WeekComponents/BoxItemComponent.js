import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RegistryInfoModal from "../../ModalComponents/RegistryComponents/RegistryInfoComponents/RegistryInfoComponent";
import { commitRegistryFromTemplateToStore } from "../../../Redux/Actions/RegistryActions";
import { connect } from "react-redux";
import Icon from "./IconComponent";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { dayBoxHeight } from "../../../Service/Constants";

const renderTooltip = (props, registry) => {
  return (
    <Tooltip id="button-tooltip" {...props}>
      <MText>{registry.missionName}</MText>
      <TText>{registry.taskName}</TText>
    </Tooltip>
  );
};

const BoxItem = ({ registry, commitTemplateRegistry, userId }) => {
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
        userId: userId,
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
          new={registry.new}
        >
          {registry.hours >= 1 ? (
            <InfoDiv>
              <Icon
                color={registry.taskId ? registry.missionColor : "#EB6D6D"}
                status={registry.new}
              />
              <TextDiv>
                <MissionText new={registry.new}>
                  {registry.missionName}
                </MissionText>
                <TaskText new={registry.new}>{registry.taskName}</TaskText>
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
  height: ${(props) => props.hours * (dayBoxHeight / 8)}px;
  margin-right: 3%;
  margin-left: 3%;
  border-radius: 6px;
  text-align: center;
  background-color: ${(props) =>
    props.registry.hours >= 1 ? "white" : props.color};
  ${(props) => !props.new && "background-color: " + props.color + ";"}
  border: 4px solid ${(props) => props.color};
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.1));
  opacity: ${(props) => props.opacity};
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
  text-align: left;
`;

const MissionText = styled.h3`
  font-family: Roboto;
  font-weight: normal;
  font-size: 10px;
  letter-spacing: 0.02em;
  color: ${(props) => (props.new ? "#585656" : "white")};
  margin: 0;
  margin-bottom: 3px;
`;

const TaskText = styled.h4`
  font-family: Roboto;
  font-weight: 500;
  font-size: 7px;
  letter-spacing: 0.02em;
  color: ${(props) => (props.new ? "#585656" : "white")};
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
    userId: state.authData.user.userDetails.userId,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    commitTemplateRegistry: (registryToReport) =>
      dispatch(commitRegistryFromTemplateToStore(registryToReport)),
  };
};

export default connect(mapPropsToState, mapDispatchToProp)(BoxItem);
