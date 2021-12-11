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

const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: 270,
    },
    header: {
      backgroundColor: "#7C85BFff;",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
    },
    body: {
      fontSize: "0.8rem",
    },
  };
});

const headerCells = [
  {
    id: "checkpoint",
    label: "ด่าน",
  },
  {
    id: "fee",
    label: "ค่าธรรมเนียม",
  },
  {
    id: "fine",
    label: "ค่าปรับ",
  },
  {
    id: "summary",
    label: "รวมเงิน",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ClassTable2(props) {
  const classes = useStyles();

  const { dataList } = props;

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {headerCells.map((headerCell, index) => (
                <TableCell
                  key={index}
                  className={classes.header}
                  align="center"
                >
                  {headerCell.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.total
              ? dataList.total.map((data, index) => (
                  <TableRow key={index} style={{ left: 0, bottom: 0 }}>
                    <TableCell align="center" className={classes.body}>
                      {data.name}
                    </TableCell>
                    <TableCell align="center" className={classes.body}>
                      {data.fee}
                    </TableCell>
                    <TableCell align="center" className={classes.body}>
                      {data.fine}
                    </TableCell>
                    <TableCell align="center" className={classes.body}>
                      {data.total}
                    </TableCell>
                  </TableRow>
                ))
              : dataList}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
