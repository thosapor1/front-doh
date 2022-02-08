import {
  Box,
  Button,
  CardMedia,
  Grid,
  makeStyles,
  MenuItem,
  Modal,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { withStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => {
  return {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.3em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px  lightgray",
      },
    },
    root: {},
    bodyModal: {
      height: "auto",
      width: "70%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      [theme.breakpoints.only("md")]: {
        marginTop: "100%",
      },
      [theme.breakpoints.only("sm")]: {
        marginTop: "120%",
      },
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      // padding: "6px",
      zIndex: 1,
    },
    header2: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 38,
      zIndex: 1,
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
      height: 28,
    },
    btn: {
      color: "white",
      width: "100%",
      marginTop: 5,
    },
    textField: {
      height: 20,
      bottom: 5,
      width: 50,
      "& .MuiInput-input": { fontSize: "0.8rem" },
      float: "right",
    },
    textField2: {
      height: 20,
      bottom: 5,
      width: "100px",
      "& .MuiInput-input": { fontSize: "0.75rem" },
      float: "right",
      "& .MuiOutlinedInput-inputMarginDense": {
        padding: "5px 5px",
      },
      // [theme.breakpoints.down('lg')]: {
      //   width: '300%'
      // }
      // "& .MuiInputBase-root": {
      //   width: 50,
      // },
    },
    tab: {
      fontSize: "0.7rem",
      minWidth: "25%",
    },
    tabs: {
      color: "white",
      backgroundColor: "#6200ea",
    },
    headTable: {
      fontSize: "0.75rem",
      color: "white",
    },
    checkType: {
      "& .MuiTableRow-root": {
        backgroundColor: "red",
      },
    },
    tableContainer: {
      height: "23vh",
      [theme.breakpoints.down("lg")]: {
        height: "23vh",
      },
    },
  };
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ModalBilling(props) {
  const classes = useStyle();

  const { dataList, open, close } = props;

  const body = (
    <div className={classes.bodyModal}>
      <div className={classes.head}>
        <div>
          <Tooltip title="close">
            <CancelRoundedIcon
              onClick={close}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                paddingTop: 5,
                color: !!dataList.resultsDisplay ? "white" : "red",
              }}
            />
          </Tooltip>
        </div>
      </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              <TableCell align="center" className={classes.header}>
                ลำดับ
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Transaction
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ด่าน
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ช่อง
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ประเภทรถ
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ประเภทTS
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ค่าผ่านทาง
              </TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.resultsDisplay
              ? dataList.resultsDisplay.map((data, index) => (
                  <StyledTableRow
                    key={data.transactionId}
                    // className={classes.tableRow}
                    className={classes.selected}
                  >
                    <TableCell align="center" className={classes.tableCell}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.pk3_transactionId ? data.pk3_transactionId : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.match_checkpoint ? data.match_checkpoint : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.match_gate ? data.match_gate : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.match_real_vehicleClass
                        ? `C${data.match_real_vehicleClass}`
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.status ? data.status : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.feeAmount ? data.feeAmount : "0"}
                    </TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          overflow: "scroll",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
