import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import MissionIcon from "../IconComponents/MissionIconComponent";
import { markMission, unmarkMission } from "../../../Redux/Actions/MissionActions";

const MarkedMission = ({ markedMission }) => {
  let history = useHistory();
  return (
    <Box onClick={() => history.push("/missions/" + markedMission.missionId)}>
      <MissionIcon />
      <TextDiv>
        <MissionText>{markedMission.missionName}</MissionText>
        <CompanyText>{markedMission.missionCustomerName}</CompanyText>
      </TextDiv>
      <Checkbox
        checked={true}
      />
    </Box>
  );
};

const TextDiv = styled.div`
  margin-left: 10px;
  margin-right: 60px;
`;

const MissionText = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: #302f2f;
`;

const CompanyText = styled(MissionText)`
  font-size: 10px;
  font-weight: normal;
`;

const Box = styled.div`
  width: 230px;
  height: 80px;
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.14));
  padding-left: 15px;
  // border-left-style: solid;
  // border-color: #f00a6b;
  border-radius: 10px;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 20px;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: scale(1.02) perspective(1px);
  }
`;

const mapStateToProps = (state) => {
  return {
    token: state.authData.user.token,
    markedMissions: state.missionData.markedMissions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markMission: (favoriteMission, token, type) => dispatch(markMission(favoriteMission, token, type)),
    unmarkMission: (favoriteMission, token, type) => dispatch(unmarkMission(favoriteMission, token, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkedMission);
