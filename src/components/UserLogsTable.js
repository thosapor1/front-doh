import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: '75vh',
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    // tableRow: {
    //   "&:hover": {
    //     backgroundColor: "#e8eaf6 !important",
    //   },
    // },
    // tableCell: {
    //   cursor: "pointer",
    // },
  };
});

const headerCells = [
  {
    id: "userName",
    label: "userName",
  },
  {
    id: "event",
    label: "event",
  },
  {
    id: "transaction_id",
    label: "transaction_id",
  },
  {
    id: "from_State",
    label: "จาก State",
  },
  {
    id: "to_State",
    label: "มา State",
  },
  {
    id: "timestamp",
    label: "timestamp",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function UserLogsTAble(props) {
  const classes = useStyles();
  const { dataList, page } = props;

  return (
    <div>
      <TableContainer className={classes.container}>
        <Pagination
          count={dataList.totalPages}
          color="primary"
          page={page}
          style={{
            display: "inline",
            margin: "2rem",
          }}
        />

        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {headerCells.map((headerCell) => (
                <TableCell
                  align="center"
                  key={headerCell.id}
                  className={classes.header}
                >
                  {headerCell.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.log_record
              ? dataList.log_record.map((data, index) => (
                  <StyledTableRow key={index} className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.username}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.events_name}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.transactionId === "0" ? "-" : data.transactionId}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.stateBefore}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.stateAfter}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.timestamp}
                    </TableCell>
                  </StyledTableRow>
                ))
              : dataList.log_record}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}