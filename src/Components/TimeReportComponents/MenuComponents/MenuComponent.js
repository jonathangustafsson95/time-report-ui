import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchLatestRegistries,
  fetchRegistriesLastWeeks,
} from "../../../Redux/Actions/RegistryActions";
import styled from "styled-components";
import Templates from "./MenuItemsComponents/TemplatesComponent";
import LatestRegistries from "./MenuItemsComponents/LatestRegistriesComponent";

const Menu = ({ token, fetchWeeklyRegistries, fetchLatestRegistries }) => {
  const [showMenuItems, setShowMenuItems] = useState({
    template: false,
    latestReports: false,
    markedMissions: false,
  });
  useEffect(() => {
    fetchWeeklyRegistries(token);
    fetchLatestRegistries(token);
  }, []);

  const toggleMenuItem = (buttonName) => {
    setShowMenuItems({
      [buttonName]: !showMenuItems[buttonName],
    });
  };

  return (
    <Main>
      <Button onClick={() => toggleMenuItem("template")}>Template</Button>
      {showMenuItems.template && <Templates />}

      <Button onClick={() => toggleMenuItem("latestReports")}>
        Latest reports
      </Button>
      {showMenuItems.latestReports && <LatestRegistries />}

      <Button onClick={() => toggleMenuItem("markedMissions")}>
        Marked missions
      </Button>
      {showMenuItems.markedMissions && <p>markedprojects</p>}
    </Main>
  );
};

const Button = styled.button`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.08em;
  line-height: 40px;
  text-align: left;
  border: none;
  background: none;
  color: #585656;
  padding: 0;
  margin-bottom: 15px;
  &.focus {
    outline: none;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  width: 220px;
`;

const mapStateToProps = (state) => {
  return {
    token: state.authData.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeeklyRegistries: (token) => dispatch(fetchRegistriesLastWeeks(token)),
    fetchLatestRegistries: (token) => dispatch(fetchLatestRegistries(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
