import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(projectName, Customer, Status, date) {
  return { projectName, Customer, Status, date };
}

const rows = [
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

//skicka in missions från table components?
const ProjectsTable = ({ missions }) => {
  const classes = useStyles();

  console.log(missions);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mission Name</TableCell>
              <TableCell align="right">Customer</TableCell>
              {/* <TableCell align="right">Status</TableCell> */}
              {/* <TableCell align="right">date</TableCell> */}
              {/* <TableCell align="right"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {missions.map((mission) => (
              <TableRow key={mission.missionId}>
                <TableCell component="th" scope="row">
                  {mission.missionName}
                </TableCell>
                <TableCell align="right">{mission.customer}</TableCell>
                {/* <TableCell align="right">{mission.Status}</TableCell> */}
                {/* <TableCell align="right">{mission.date}</TableCell> */}
                {/* <TableCell align="right">
                  <button>Add Time</button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectsTable;