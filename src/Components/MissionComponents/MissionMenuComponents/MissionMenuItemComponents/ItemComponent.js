import React from "react";
import styled from "styled-components";
import TaskIcon from "../../IconComponents/TaskIconComponent";
import AvatarIcon from "../../IconComponents/AvatarIconComponent";

const Item = ({ content, type }) => {
  return (
    <Box>
      {type === "member" ? <AvatarIcon /> : <TaskIcon />}{" "}
      <Content>{content}</Content>
    </Box>
  );
};

const Content = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.08em;
  color: #585656;
  margin-left: 10px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 250px;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

export default Item;
