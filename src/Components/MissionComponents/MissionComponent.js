import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
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

const Mission = ({ mission, fetchMission, fetchStats, missionData }) => {
  const { missionId } = useParams();
  const [showSnackBar, setShowSnackBar] = useState(true);

  let history = useHistory();
  useEffect(() => {
    fetchMission(missionId);
    fetchStats(missionId);
  }, [fetchMission, missionId, fetchStats]);

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
      <Grid container item>
        <Grid item xs={0} md={1} lg={2}></Grid>
        <Grid container item xs={12} md={10} lg={8} spacing={6}>
          <Grid container item xs={12}>
            <Grid item xs={3}>
              <BackDiv>
                <IconButton size="small" onClick={() => history.goBack()}>
                  <ArrowBackIosIcon />
                </IconButton>
                <Title>Back</Title>
              </BackDiv>
            </Grid>
            <Grid item xs={9}>
              <MissionName>{mission.missionName}</MissionName>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Statistic />
          </Grid>
          <Grid item xs={12} md={3}>
            <MissionMenu />
          </Grid>
        </Grid>
        <Grid item xs={0} md={1} lg={2}></Grid>
      </Grid>
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
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.16);
`;

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
    fetchMission: (missionId) => dispatch(fetchMission(missionId)),
    fetchStats: (missionId) => dispatch(fetchTaskStats(missionId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mission);
