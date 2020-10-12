import React, { useState, useEffect } from "react";
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
    minWidth: 250,
    width: 250,
  },
});

const TaskTable = ({
  missionId,
  missions,
  currentTask,
  setCurrentTask,
  info = false,
}) => {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (missionId) {
      const mission = missions.find(
        (mission) => mission.missionId === missionId
      );
      let selectedStatus = [];
      const rows = mission.tasks.map((task, index) => {
        if (info) {
          task.taskId === currentTask
            ? selectedStatus.push({
                selected: true,
                id: task.taskId,
              })
            : selectedStatus.push({
                selected: false,
                id: task.taskId,
              });
        } else {
          index === 0
            ? selectedStatus.push({
                selected: true,
                id: task.taskId,
              })
            : selectedStatus.push({
                selected: false,
                id: task.taskId,
              });
        }
        return {
          name: task.name,
          id: task.taskId,
        };
      });
      if (!info) {
        if (rows.length > 0) {
          setCurrentTask(rows[0].id);
        }
      }

      setRows(rows);
      setSelectedStatus(selectedStatus);
    }
  }, [missionId, missions]);

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
                <TableCell size="small">
                  <Checkbox checked={isItemSelected} />
                </TableCell>
                <TableCell size="small" align="right">{row.name}</TableCell>
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
  background: #fff;
  filter: drop-shadow(0px 25px 30px rgba(0, 0, 0, 0.14));
  max-height: 300px;
  overflow: scroll;
`;

export default TaskTable;
