import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  addTemplateRegistryToStore,
  removeTemplateRegistriesFromStore,
} from "../../../../Redux/Actions/RegistryActions";
import { v4 as uuidv4 } from "uuid";

const TemplateItem = ({
  week,
  addRegistry,
  hasLoadedFromTemplate,
  removeTemplateRegistries,
  date
}) => {
  const loadTemplate = () => {
    if (hasLoadedFromTemplate) {
      removeTemplateRegistries();
    }

    week.week.forEach((registry) => {
      var d = new Date(date.valueOf());
      var dayC = d.getDay();
      var diff = d.getDate() - dayC + (dayC === 0 ? -6 : 1);
      d.setDate(diff);
      if (registry.day === 0) {
        d.setDate(d.getDate() + registry.day + 6);
      } else {
        d.setDate(d.getDate() + registry.day - 1);
      }
      const id = uuidv4();

      const newRegistry = {
        registryId: id,
        missionName: registry.missionName,
        missionColor: registry.missionColor,
        taskName: registry.taskName,
        taskId: registry.taskId,
        day: registry.day,
        hours: registry.hours,
        created: new Date().toJSON(),
        date: d.toJSON(),
        invoice: registry.invoice,
        new: true,
        isFromTemplate: true,
      };
      addRegistry(newRegistry);
    });
  };
  return (
    <Box onClick={() => loadTemplate()}>
      <Icon src={require("./Icons/template.svg")} />
      <TextDiv>
        <Week>Week {week.weekNr}</Week>
        <StartDate>{week.startDate}</StartDate>
      </TextDiv>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  border-radius: 10px;
  width: 190px;
  height: 65px;
  padding-left: 10px;
  background: #fff;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  margin-left: 30px;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
    transform: scale(1.02) perspective(1px);
  }
`;

const Icon = styled.img`
  margin-right: 20px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Week = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #585656;
  text-align: left;
`;

const StartDate = styled(Week)`
  margin: 0;
  font-size: 10px;
  opacity: 0.85;
`;

const mapStateToProps = (state) => {
  return {
    hasLoadedFromTemplate: state.registryData.hasLoadedFromTemplate,
    date: state.settings.date,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRegistry: (registry) => dispatch(addTemplateRegistryToStore(registry)),
    removeTemplateRegistries: () =>
      dispatch(removeTemplateRegistriesFromStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateItem);