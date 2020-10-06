import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 250,
    width: 250,
  },
});

const TaskTable = ({ missionId, missions, currentTask, setCurrentTask }) => {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const mission = missions.find((mission) => mission.MissionId === missionId);

    if (mission) {
      let selectedStatus = [];
      const rows = mission.Tasks.map((task, index) => {
        index === 0
          ? selectedStatus.push({
              selected: true,
              id: task.TaskId,
            })
          : selectedStatus.push({
              selected: false,
              id: task.TaskId,
            });

        return {
          name: task.Name,
          id: task.TaskId,
        };
      });
      if (rows.length > 0) {
        setCurrentTask(rows[0].id);
      }
      setRows(rows);
      setSelectedStatus(selectedStatus);
    }
  }, [missions, missionId]);

  const classes = useStyles();

  function handleClick(e, id) {
    const newSelectedStatus = selectedStatus.slice();
    newSelectedStatus.map((item) => {
      if (item.id === currentTask) {
        item.selected = false;
      }
      if (item.id === id) {
        item.selected = true;
      }
      return item;
    });
    setCurrentTask(id);
    setSelectedStatus(newSelectedStatus);
  }

  return (
    <TableHolder>
      <Title>Choose task</Title>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell align="right">Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isItemSelected = selectedStatus.some(
              (item) => item.id === row.id && item.selected
            );
            return (
              <TableRow key={row.id} onClick={(e) => handleClick(e, row.id)}>
                <TableCell>
                  <Checkbox checked={isItemSelected} />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
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
  font-size: 18px;
  letter-spacing: 0.08em;
  color: #585656;
  margin-bottom: 30px;
`;

const TableHolder = styled.div`
  padding: 15px;
  padding-bottom: 0;
  background: #fff;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.14));
`;

export default TaskTable;
