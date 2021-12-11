import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTableCell-root": {
        padding: 10,
      },
    },
    container: {
      maxHeight: 210,
    },
    header: {
      backgroundColor: "#7C85BFff;",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
    },
    footer: {
      backgroundColor: "darkgreen;",
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
        <Table stickyHeader className={classes.root}>
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
          <TableFooter>
            <StyledTableRow>
              <TableCell
                className={classes.footer}
                align="center"
              >{`รวม`}</TableCell>
              <TableCell className={classes.footer} align="center">
                {!!dataList.result_vehicleClass
                  ? dataList.result_vehicleClass[0].sum_all +
                    dataList.result_vehicleClass[1].sum_all +
                    dataList.result_vehicleClass[2].sum_all
                  : 0}
              </TableCell>
              <TableCell className={classes.footer} align="center">
                {!!dataList.result_vehicleClass
                  ? dataList.result_vehicleClass[0].reject +
                    dataList.result_vehicleClass[1].reject +
                    dataList.result_vehicleClass[2].reject
                  : 0}
              </TableCell>
              <TableCell className={classes.footer} align="center">
                {!!dataList.result_vehicleClass
                  ? dataList.result_vehicleClass[0].normal +
                    dataList.result_vehicleClass[1].normal +
                    dataList.result_vehicleClass[2].normal
                  : 0}
              </TableCell>
              <TableCell className={classes.footer} align="center">
                {!!dataList.result_vehicleClass
                  ? dataList.result_vehicleClass[0].revenue +
                    dataList.result_vehicleClass[1].revenue +
                    dataList.result_vehicleClass[2].revenue
                  : 0}
              </TableCell>
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
