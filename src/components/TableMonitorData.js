import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import Swal from "sweetalert2";
import ModalReadOnly2 from "./ModalReadOnly2";
import ModalSuperActivity2 from "./ModalSuperActivity2";
import { format } from "date-fns";
import { getDataSuperauditActivity } from "../service/allService";
// import format from "date-fns/format";

const apiURLv2 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});

const detailStatus = [
  {
    state: 1,
    color: "lightgray",
    label: "ปกติ",
  },
  {
    state: 2,
    color: "#FF2400",
    label: "ผิดปกติ",
  },
  {
    state: 3,
    color: "blue",
    label: "รอ pk3 ตรวจสอบ",
  },
  {
    state: 4,
    color: "orange",
    label: "รอ super audit ตรวจสอบ",
  },
  {
    state: 5,
    color: "black",
    label: "รอพิจารณาพิเศษ",
  },
  {
    state: 6,
    color: "darkviolet",
    label: "รอตรวจสอบรับทราบ",
  },
  {
    state: 7,
    color: "lightblue",
    label: "รอจัดเก็บยืนยัน",
  },
  {
    state: 8,
    color: "lightgreen",
    label: "ตรวจสอบแล้ว",
  },
];
const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: "60vh",
      overflow: "auto",
      [theme.breakpoints.down("lg")]: {
        maxHeight: "50vh",
      },
      marginTop: 10,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
    },
    header2: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 38,
      // zIndex: 10,
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#e8eaf6 !important",
      },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        height: 25,
        minWidth: 25,
        fontSize: "0.8rem",
        [theme.breakpoints.down("lg")]: {
          fontSize: "0.7rem",
        },
      },
      paddingTop: 5,
    },
    tableCell: {
      cursor: "pointer",
      fontSize: "0.75rem",
      padding: "6px",
    },
    detailStatus: {
      display: "inline",
      fontSize: "0.8rem",
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.7rem",
      },
    },
    dot: {
      fontSize: "0.8rem",
    },
    box: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
      justifyItems: "center",
    },
    input1: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 35,
      },
      "& .MuiInputLabel-outlined": {
        // paddingBottom: 20,
        fontSize: "0.8rem",
        transform: "translate(10px, 10px) scale(1)",
      },
      "& .MuiInputLabel-shrink": {
        transform: "translate(14px, -6px) scale(0.75)",
      },
      width: 100,
      [theme.breakpoints.down("lg")]: {
        width: 100,
        marginBottom: 10,
      },
    },
  };
});

function createData(name, Data1, Data2, Data3) {
  return { name, Data1, Data2, Data3 };
}

const rows = [
  createData("1", 159, 6.0, 24, 4.0),
  createData("2", 237, 9.0, 37, 4.3),
  createData("3", 262, 16.0, 24, 6.0),
];

export default function TableMonitor(props) {
  const classes = useStyles();

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>จำนวนรถในแต่ละวัน</TableCell>
              <TableCell align="center" className={classes.header}>
                00:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                01:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                02:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                03:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                04:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                05:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                06:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                07:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                08:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                09:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                10:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                11:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                12:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                13:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                14:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                15:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                16:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                17:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                18:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                19:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                20:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                21:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                22:00
              </TableCell>
              <TableCell align="center" className={classes.header}>
                23:00
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data1}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data2}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data3}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data1}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data2}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data3}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data1}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data2}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data3}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data1}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data2}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data3}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data1}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data2}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data3}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data1}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data2}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data3}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data1}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data2}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data3}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data1}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data2}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.Data3}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
