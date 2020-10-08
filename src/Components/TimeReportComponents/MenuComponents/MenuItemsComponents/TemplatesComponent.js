import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TemplateItem from "./TemplateItemComponent";

const TemplatesComponent = ({ weeklyRegistries }) => {
  const templates = weeklyRegistries.map((week) => (
    <TemplateItem week={week} />
  ));
  return <div>{templates}</div>;
};

const mapStateToProps = (state) => {
  return {
    weeklyRegistries: state.registryData.weeklyRegistries,
  };
};

export default connect(mapStateToProps)(TemplatesComponent);
