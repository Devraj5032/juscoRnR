import React from "react";
import Heading from "../Components/Heading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const Tables = () => {
  return (
    <div>
      <Heading />
      <TableContainer component={Paper} className="table_container">
        <Table  aria-label="simple table" className="table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Sl.no</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Mobile No.</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Zone</TableCell>
              <TableCell align="right">Area</TableCell>
              <TableCell align="right">Locality</TableCell>
              <TableCell align="right">Total Marks</TableCell>
              <TableCell align="right">Feedback</TableCell>
              <TableCell align="right">Surveyed on</TableCell>
              <TableCell align="right">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">1</TableCell>
              <TableCell align="right">Aditya</TableCell>
              <TableCell align="right">345675</TableCell>
              <TableCell align="right">Bistupur</TableCell>
              <TableCell align="right">ef</TableCell>
              <TableCell component="th" scope="row">eg</TableCell>
              <TableCell align="right">dryjhn</TableCell>
              <TableCell align="right">45</TableCell>
              <TableCell align="right">good</TableCell>
              <TableCell align="right">22/8/2019</TableCell>
              <TableCell align="right"><Button>View</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tables;
