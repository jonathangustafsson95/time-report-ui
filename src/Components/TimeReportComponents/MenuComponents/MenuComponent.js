import React, { useState } from "react";
import styled from "styled-components";
import Templates from "./MenuItemsComponents/TemplatesComponent";
import LatestRegistries from "./MenuItemsComponents/LatestRegistriesComponent";
import MarkedMissions from "./MenuItemsComponents/MarkedMissionsComponent";
import Grid from "@material-ui/core/Grid";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

const Menu = () => {
  const [showLatests, setShowLatests] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showMarked, setShowMarked] = useState(false);

  return (
    <Grid container item spacing={1}>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <MenuItemDiv>
            <Button onClick={() => setShowLatests(!showLatests)}>
              Latest reports
            </Button>
            {showLatests ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItemDiv>
        </Grid>
        <Grid item xs={12}>
          {showLatests && <LatestRegistries />}
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <MenuItemDiv>
            <Button onClick={() => setShowTemplates(!showTemplates)}>
              Templates
            </Button>
            {showTemplates ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItemDiv>
        </Grid>
        <Grid item xs={12}>
          {showTemplates && <Templates />}
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <MenuItemDiv>
            <Button onClick={() => setShowMarked(!showMarked)}>
              Marked missions
            </Button>
            {showMarked ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItemDiv>
        </Grid>
        <Grid item xs={12}>
          {showMarked && <MarkedMissions />}
        </Grid>
      </Grid>
    </Grid>
  );
};

const MenuItemDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ExpandMoreIcon = styled(ExpandMore)`
  color: #585656;
`;

const ExpandLessIcon = styled(ExpandLess)`
  color: #585656;
`;

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  border: none;
  background: none;
  color: #585656;
  padding: 0;
  &.focus {
    outline: none;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export default Menu;
