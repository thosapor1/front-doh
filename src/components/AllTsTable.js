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
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: 600,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
  };
});

const headerCells = [
  {
    id: "status",
    label: "สถานะ",
  },
  {
    id: "transaction",
    label: "transaction",
  },
  {
    id: "timeArrive",
    label: "เวลาเข้าด่าน",
  },
  {
    id: "typeCarAudit",
    label: "ประเภทรถ(ระบบตรวจสอบ)",
  },
  {
    id: "feeAudit",
    label: "ค่าผ่านทาง(ระบบตรวจสอบ)",
  },
  {
    id: "typeCarPK3",
    label: "ประเภทรถ(PK3)",
  },
  {
    id: "feePK3",
    label: "ค่าผ่านทาง(PK3)",
  },
  {
    id: "carDetail",
    label: "รายละเอียดรถ",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function AllTsTable(props) {
  const classes = useStyles();
  const { dataList } = props;

  return (
    <div>
      <TableContainer className={classes.container}>
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
            {!!dataList
              ? dataList.map((data) => (
                  <StyledTableRow key={data.transactionId}>
                    <TableCell align="center">
                      <FiberManualRecordIcon
                        fontSize="small"
                        style={{
                          color:
                            data.state === 2
                              ? "orange"
                              : data.state === 3
                              ? "red"
                              : "green",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{data.transactionId}</TableCell>
                    <TableCell align="center">{data.timestamp}</TableCell>
                    <TableCell align="center">{data.class}</TableCell>
                    <TableCell align="center">{data.fee}</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </StyledTableRow>
                ))
              : dataList}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
