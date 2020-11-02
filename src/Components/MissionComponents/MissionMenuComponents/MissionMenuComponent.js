import React, { useState } from "react";
import styled from "styled-components";
import Members from "./MissionMenuItemComponents/MembersComponent";
import Tasks from "./MissionMenuItemComponents/TasksComponent";

const MissionMenu = () => {
  const [showMenuItems, setShowMenuItems] = useState({
    members: true,
    tasks: true,
  });

  return (
    <div>
      <MenuOption>Members</MenuOption>
      {showMenuItems.members && <Members />}
      <MenuOption>Tasks</MenuOption>
      {showMenuItems.tasks && <Tasks />}
    </div>
  );
};

const MenuOption = styled.button`
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

export default MissionMenu;
