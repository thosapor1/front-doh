import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
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
    selected: {
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: "purple",
        "& > .MuiTableCell-root": {
          color: "yellow",
          backgroundColor: "purple",
        },
      },
    },
  };
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "pointer",
  },
}))(TableRow);
export default function TableBillingMonitorPage(props) {
  const classes = useStyles();
  const [rowID, setRowID] = useState("");
  const { header, body, tableOnClick, countPage, page, pageOnChange, color } =
    props;
  const getItemData = (item) => {
    tableOnClick(item);
  };
  return (
    <Paper style={{ marginTop: 10 }}>
      <Pagination count={countPage} page={page} onChange={pageOnChange} />
      <TableContainer style={{ maxHeight: 520 }}>
        <Table stickyHeader style={{ marginTop: 10, maxHeight: 200 }}>
          <TableHead>
            <TableRow>
              {!!header
                ? header.map((header) => (
                    <TableCell
                      key={header.id}
                      style={{
                        backgroundColor: `${color}`,
                        color: "white",
                        border: "1px solid white",
                      }}
                    >
                      {header.label}
                    </TableCell>
                  ))
                : []}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!body
              ? body.map((item, index) => (
                  <StyledTableRow
                    onClick={() => {
                      getItemData(item);
                      setRowID(index);
                    }}
                    key={index}
                    selected={rowID === index}
                    className={classes.selected}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.headerTransactionId}</TableCell>
                    <TableCell>{item.refTransactionId}</TableCell>
                    <TableCell>{item.cameras_cameraTimestamp}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
