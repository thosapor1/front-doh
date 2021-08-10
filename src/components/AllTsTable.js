import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: 300,
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

export default function AllTsTable(props) {
  const classes = useStyles();

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table>
          <TableHead>
            <TableRow>
              {headerCells.map((headerCell) => (
                <TableCell
                  align="center"
                  key={headerCell.id}
                  className={classes.header}
                >
                  {headerCell.label}
                </TableCell>
              ))}
            </TableRow>
            <TableBody></TableBody>
            <TableRow>
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}
