import React from "react";
import { connect } from "react-redux";
import LatestRegistryItem from "./LatestRegistryItemComponent";

const LatestRegistriesComponent = ({ registries }) => {
  const regs = registries.map((reg) => <LatestRegistryItem registry={reg} />);
  return <div>{regs}</div>;
};

const mapStateToProps = (state) => {
  return {
    registries: state.registryData.latestRegistries,
  };
};

export default connect(mapStateToProps)(LatestRegistriesComponent);
