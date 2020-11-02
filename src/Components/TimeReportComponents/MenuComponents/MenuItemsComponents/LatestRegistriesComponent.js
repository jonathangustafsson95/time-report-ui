import React from "react";
import { connect } from "react-redux";
import LatestRegistryItem from "./LatestRegistryItemComponent";
import Grid from "@material-ui/core/Grid";

const LatestRegistriesComponent = ({ registries }) => {
  const regs = registries.map((reg) => <LatestRegistryItem registry={reg} />);
  return <Grid container item justify="center" spacing={2}>{regs}</Grid>;
};

const mapStateToProps = (state) => {
  return {
    registries: state.registryData.latestRegistries,
  };
};

export default connect(mapStateToProps)(LatestRegistriesComponent);
