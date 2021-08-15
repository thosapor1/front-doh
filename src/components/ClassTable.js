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
              {headerCells.map((headerCell) => (
                <TableCell className={classes.header} align="center">
                  {headerCell.label}{" "}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList
              ? dataList.map((data, index) =>
                  dataList.length == index + 1 ? (
                    <TableRow
                      style={{ left: 0, bottom: 0, position: "sticky" }}
                    >
                      <TableCell align="center" className={classes.header}>
                        {data.class}
                      </TableCell>
                      <TableCell align="center" className={classes.header}>
                        {data.ts_count}
                      </TableCell>
                      <TableCell align="center" className={classes.header}>
                        {data.ts_reject}
                      </TableCell>
                      <TableCell align="center" className={classes.header}>
                        {data.ts_countState1}
                      </TableCell>
                      <TableCell align="center" className={classes.header}>
                        {data.sumAmount}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <StyledTableRow key={data.class}>
                      <TableCell align="center">{data.class} </TableCell>
                      <TableCell align="center">{data.ts_count} </TableCell>
                      <TableCell align="center">{data.ts_reject} </TableCell>
                      <TableCell align="center">
                        {data.ts_countState1}{" "}
                      </TableCell>
                      <TableCell align="center">{data.sumAmount} </TableCell>
                    </StyledTableRow>
                  )
                )
              : dataList}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
