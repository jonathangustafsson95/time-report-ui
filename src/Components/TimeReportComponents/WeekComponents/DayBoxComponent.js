import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BoxItem from "./BoxItemComponent";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import AddRegistryModal from "../../ModalComponents/RegistryComponents/AddRegistryComponents/AddRegistryComponent";
import {
  addRegistryToStore,
  updateNewRegistryFromStore,
  updateOldRegistryFromStore,
} from "../../../Redux/Actions/RegistryActions";
import { dayBoxHeight } from "../../../Service/Constants";

const useStyles = makeStyles({
  root: {
    marginBottom: 10,
  },
  dayBox: {
    background: "#fafafa",
    filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16))",
    borderRadius: 8,
  },
  boxHolder: {
    height: dayBoxHeight,
    minWidth: 150,
  },
  text: {
    marginBottom: 10,
  },
});

const DayBox = ({
  day,
  dayConst,
  registries,
  addRegistry,
  updateNewRegistry,
  updateOldRegistry,
  storeDate,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(storeDate);
  const classes = useStyles();

  useEffect(() => {
    var d = new Date(storeDate.valueOf());
    var dayC = d.getDay(),
      diff = d.getDate() - dayC + (dayC === 0 ? -6 : 1);
    d.setDate(diff);
    if (dayConst === 0) {
      d.setDate(d.getDate() + dayConst + 6);
    } else {
      d.setDate(d.getDate() + dayConst - 1);
    }
    setDate(d);
  }, [storeDate, dayConst]);

  const onCloseAddModal = () => {
    setShowModal(false);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e) => {
    let registry = JSON.parse(e.dataTransfer.getData("registry"));
    const from = e.dataTransfer.getData("from");
    const d = new Date();
    let day = date.getDay();
    if (day === 7) {
      day = 0;
    }
    registry.day = day;
    registry.date = date.toJSON();
    registry.isFromTemplate = false;

    let registryToReport = {
      registryId: registry.id,
      taskId: registry.taskId,
      userId: 1,
      hours: registry.hours,
      created: d.toJSON(),
      date: date.toJSON(),
      invoice: registry.invoice,
    };

    switch (from) {
      case "boxComponent":
        registryToReport.registryId = registry.new ? 0 : registry.registryId;
        registryToReport.uuid = registry.registryId;
        registryToReport.created = registry.created;

        registry.new
          ? updateNewRegistry([registry, registryToReport])
          : updateOldRegistry([registry, registryToReport]);

        break;
      case "latestRegistries":
        const id = uuidv4();
        registry.registryId = id;
        registryToReport.uuid = id;
        registryToReport.registryId = 0;
        registry.created = d.toJSON();
        registry.new = true;

        addRegistry([registry, registryToReport]);
        break;

      default:
        break;
    }
    e.dataTransfer.clearData(["registry"]);
    e.dataTransfer.clearData(["from"]);
  };

  let registryList = [];
  registries.sort((a, b) => (a.hours < b.hours ? 1 : -1));
  registries.forEach((registry) => {
    registryList.push(
      <BoxItem registry={registry} key={registry.registryId} />
    );
  });

  return (
    <Grid
      container
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={(e) => onDragOver(e)}
      className={classes.root}
    >
      <AddRegistryModal
        showModal={showModal}
        onCloseModal={onCloseAddModal}
        date={date}
      />
      <Grid container item xs={12} justify="center" className={classes.text}>
        <Text>{day}</Text>
      </Grid>
      <Grid container item xs={12} justify="center">
        <Grid container item xs={11} className={classes.dayBox}>
          <Grid item xs={12} className={classes.boxHolder}>
            <BoxItemHolder>{registryList}</BoxItemHolder>
            <Line></Line>
            <Line></Line>
            <Line></Line>
            <Line></Line>
            <Line></Line>
            <Line></Line>
            <Line></Line>
            <Line></Line>
          </Grid>

          <Grid container xs={12} justify="center">
            <AddBtn
              type="image"
              alt="AddRegistry"
              src={require("./Images/add.svg")}
              onClick={() => setShowModal(true)}
            ></AddBtn>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const BoxItemHolder = styled.div`
  width: 100%;
  height: inherit;
  position: fixed;
  overflow: auto;
`;

const Line = styled.hr`
  margin: 0;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: ${dayBoxHeight / 8 - 1}px;
`;

const Text = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #585656;
  opacity: 0.7;
  margin: 0;
  text-align: center;
`;

const AddBtn = styled.input`
  margin-top: 15px;
  margin-bottom: 15px;
  &:hover {
    transform: scale(1.03) perspective(1px);
  }
  &:focus {
    outline: 0;
  }
`;

const mapStateToProps = (state, ownProps) => {
  return {
    registries: state.registryData.registriesByWeek.filter(
      (registry) => registry.day === ownProps.dayConst
    ),
    storeDate: state.settings.date,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRegistry: (registries) => dispatch(addRegistryToStore(registries)),
    updateNewRegistry: (registries) =>
      dispatch(updateNewRegistryFromStore(registries)),
    updateOldRegistry: (registries) =>
      dispatch(updateOldRegistryFromStore(registries)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayBox);
