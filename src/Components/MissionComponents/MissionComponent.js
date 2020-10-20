import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";
import { connect } from "react-redux";
import { fetchMission } from "../../Redux/Actions/MissionActions";
import { IconButton } from "@material-ui/core";
import { css } from "@emotion/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Statistic from "./StatisticComponent";
import MissionMenu from "./MissionMenuComponents/MissionMenuComponent";
import { fetchTaskStats } from "../../Redux/Actions/StatisticActions";
import SnackBar from "../SnackBarComponents/SnackBarComponent";

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
`;

const Mission = ({
  mission,
  token,
  fetchMission,
  fetchStats,
  missionData,
  statisticData,
}) => {
  const { missionId } = useParams();
  const [showSnackBar, setShowSnackBar] = useState(true);

  let history = useHistory();
  useEffect(() => {
    fetchMission(token, missionId);
    fetchStats(token, missionId);
  }, [fetchMission, token, missionId, fetchStats]);

  if (!mission) {
    return (
      <Root>
        <BeatLoader
          loading={missionData.loading}
          css={override}
          color={"#585656"}
        ></BeatLoader>
        {missionData.error ? (
          <SnackBar
            show={showSnackBar}
            hide={() => setShowSnackBar(false)}
            error={true}
          />
        ) : null}
      </Root>
    );
  } else {
    return (
      <Root>
        <Main>
          <Header>
            <BackDiv>
              <IconButton size="small" onClick={() => history.goBack()}>
                <ArrowBackIosIcon />
              </IconButton>
              <Title>Back</Title>
            </BackDiv>
            <MissionName>{mission.missionName}</MissionName>
            <div></div>
          </Header>

          <MissionDetails>
            <InfoHolder>
              <Text>
                Customer: <strong>{mission.customer}</strong>
              </Text>
              <Text>
                Started at: <strong>{mission.startDate}</strong>
              </Text>
              <Text>Description:</Text>
              <DescriptionText>{mission.description}</DescriptionText>
            </InfoHolder>
            <Statistic />
          </MissionDetails>
        </Main>
        <MissionMenu></MissionMenu>
      </Root>
    );
  }
};

const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.08em;
  color: #585656;
`;

const MissionName = styled(Title)`
  text-align: center;
  font-weight: bold;
  margin-right: 70px;
`;

const Text = styled(Title)`
  font-size: 12px;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
`;

const DescriptionText = styled(Text)`
  font-size: 9px;
  margin-top: 5px;
`;

const BackDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Root = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InfoHolder = styled.div`
  padding-left: 20px;
  padding-right: 90px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  margin-right: 15px;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.16);
`;

const MissionDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Main = styled.div``;

const mapStateToProps = (state) => {
  return {
    mission: state.missionData.mission,
    token: state.authData.user.token,
    missionData: state.missionData,
    statisticData: state.statisticData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMission: (token, missionId) =>
      dispatch(fetchMission(token, missionId)),
    fetchStats: (token, missionId) =>
      dispatch(fetchTaskStats(token, missionId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mission);