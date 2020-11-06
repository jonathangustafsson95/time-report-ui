import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  addTemplateRegistryToStore,
  removeTemplateRegistriesFromStore,
} from "../../../../Redux/Actions/RegistryActions";
import { v4 as uuidv4 } from "uuid";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 180,
  },
});

const TemplateItem = ({
  week,
  addRegistry,
  hasLoadedFromTemplate,
  removeTemplateRegistries,
  date,
}) => {
  const classes = useStyles();
  const [hasAlreadyClicked, setHasAlreadyClicked] = useState(false);
  const loadTemplate = () => {
    if (hasLoadedFromTemplate) {
      removeTemplateRegistries();
    }
    if (!hasAlreadyClicked) {
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
    }
    setHasAlreadyClicked(!hasAlreadyClicked);
  };
  return (
    <Grid item xs={11} className={classes.root}>
      <Box onClick={() => loadTemplate()}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Icon src={require("./Icons/template.svg")} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextDiv>
              <Week>Week {week.weekNr}</Week>
            </TextDiv>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 15px;
  background: #fff;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: scale(1.02) perspective(1px);
  }
`;

const Icon = styled.img``;

const TextDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Week = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: #585656;
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
