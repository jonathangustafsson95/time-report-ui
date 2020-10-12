import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    width: 400,
    marginRight: 50,
  },
});

const MissionTable = ({
  missions,
  currentMission,
  setCurrentMission,
  info = false,
}) => {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let selectedStatus = [];
    const rows = missions.map((mission, index) => {
      if (info) {
        mission.missionId === currentMission
          ? selectedStatus.push({
              selected: true,
              id: mission.missionId,
            })
          : selectedStatus.push({
              selected: false,
              id: mission.missionId,
            });
      } else {
        index === 0
          ? selectedStatus.push({
              selected: true,
              id: mission.missionId,
            })
          : selectedStatus.push({
              selected: false,
              id: mission.missionId,
            });
      }

      return {
        mission: mission.missionName,
        id: mission.missionId,
        customer: mission.customer,
      };
    });
    setRows(rows);
    setSelectedStatus(selectedStatus);
  }, [missions, currentMission]);

  const classes = useStyles();

  function handleClick(e, id) {
    const newSelectedStatus = selectedStatus.slice();
    newSelectedStatus.map((item) => {
      if (item.id === currentMission) {
        item.selected = false;
      }
      if (item.id === id) {
        item.selected = true;
      }
      return item;
    });
    setCurrentMission(id);
    setSelectedStatus(newSelectedStatus);
  }

  return (
    <TableHolder>
      <Title>Choose mission</Title>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell align="right">Mission</TableCell>
            <TableCell align="right">Customer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isItemSelected = selectedStatus.some(
              (item) => item.id === row.id && item.selected
            );
            return (
              <TableRow key={row.id} onClick={(e) => handleClick(e, row.id)}>
                <TableCell size="small">
                  <Checkbox checked={isItemSelected} />
                </TableCell>
                <TableCell align="right" size="small">{row.mission}</TableCell>
                <TableCell align="right" size="small">{row.customer}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableHolder>
  );
};

const Title = styled.p`
  margin: 0;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  opacity: 0.8;
  letter-spacing: 0.08em;
  color: #585656;
  margin-bottom: 30px;
  text-align: left;
`;

const TableHolder = styled.div`
  padding: 15px;
  padding-bottom: 0;
  border-radius: 10px;
  margin-right: 15px;
  background: #fff;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.14));
  max-height: 300px;
  overflow: scroll;
`;

export default MissionTable;
