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
      maxHeight: 212,
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
    id: "class",
    label: "ประเภท",
  },
  {
    id: "allCar",
    label: "จำนวนรถทั้งหมด(คัน)",
  },
  {
    id: "except",
    label: "รถยกเว้น(คัน)",
  },
  {
    id: "takeMoney",
    label: "รถรับเงิน(คัน)",
  },
  {
    id: "summary",
    label: "รวมเงิน(บาท)",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ClassTable(props) {
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
            {!!dataList.result_vehicleClass
              ? dataList.result_vehicleClass.map((data, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="center" className={classes.body}>
                      {`C${data.class}`}
                    </TableCell>
                    <TableCell align="center" className={classes.body}>
                      {data.sum_all}
                    </TableCell>
                    <TableCell align="center" className={classes.body}>
                      {data.reject}
                    </TableCell>
                    <TableCell align="center" className={classes.body}>
                      {data.normal}
                    </TableCell>
                    <TableCell align="center" className={classes.body}>
                      {data.revenue}
                    </TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
