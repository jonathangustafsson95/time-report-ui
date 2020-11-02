import React from "react";
import { connect } from "react-redux";
import TemplateItem from "./TemplateItemComponent";
import Grid from "@material-ui/core/Grid";

const TemplatesComponent = ({ weeklyRegistries }) => {
  const templates = weeklyRegistries.map((week) => (
    <TemplateItem week={week} />
  ));
  return (
    <Grid container item justify="center" spacing={2}>
      {templates}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    weeklyRegistries: state.registryData.weeklyRegistries,
  };
};

export default connect(mapStateToProps)(TemplatesComponent);
