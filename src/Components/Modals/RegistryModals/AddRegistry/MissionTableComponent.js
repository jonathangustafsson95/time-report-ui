import React, { useEffect, useState } from "react";
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
    minWidth: 400,
  },
});

const MissionTable = ({ missions }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const rows = missions.map((mission) => {
      return {
        mission: mission.Name,
        customer: mission.Customer,
      };
    });
    setRows(rows);
  }, [missions]);

  console.log(rows);
  const classes = useStyles();

  function handleClick(e, mission) {}

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell align="right">Mission</TableCell>
            <TableCell align="right">Customer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.mission}>
              <TableCell>
                <Checkbox checked={false} />
              </TableCell>
              <TableCell align="right">{row.mission}</TableCell>
              <TableCell align="right">{row.customer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MissionTable;
