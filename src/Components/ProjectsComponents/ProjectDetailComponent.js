import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import IconArrow from "./Images/Group247.png";
import { connect } from "react-redux";
import Media from "react-bootstrap/Media";
import StatisticsItemComponent from "./StatisticsItemComponent";
import { fetchUserMarkedMissions } from "../../Redux/Actions/MissionActions";
import MissionTasksComponent from "./MissionTasksComponent";
const ProjectDetail = ({ mission, token, fetchMarkedMissions }) => {
  const { missionId } = useParams();
  const Id = { missionId };
  useEffect(() => {
    fetchMarkedMissions(token);
  }, []);
  console.log(mission);
  console.log(Id.missionId);
  const textt = findArrayElementById(mission, Id.missionId);
  console.log(textt);
  return (
    <DivContainer>
      <BackDiv className="align-baseline">
        <LinkText to="/projects">
          <Button variant="light" color="#f00a6b">
            <img src={IconArrow}></img>
            Back
          </Button>
        </LinkText>
      </BackDiv>
      <Media>
        <Media.Body>
          <h1>{textt.missionName}</h1>
          <p>
            <p>Customer name: {textt.customer}</p>
            <h5>Mission description</h5>
            <p>{textt.description}</p>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
            in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
            nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
          </p>
        </Media.Body>
      </Media>
      <StatisticsItemComponent></StatisticsItemComponent>
      <MissionTasksComponent></MissionTasksComponent>
    </DivContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    mission: state.missionData.missions,
    token: state.authData.user.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMarkedMissions: (token) => dispatch(fetchUserMarkedMissions(token)),
  };
};
function findArrayElementById(array, Id) {
  for (const element of array) {
    console.log(Id);
    if (element.missionId == Id) {
      console.log(element);
      return element;
    }
  }
}

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const BackDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 60px;
`;
const LinkText = styled(NavLink)`
  font-family: Roboto;
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #302f2f;
`;
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
