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
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
});
const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: 860,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#e8eaf6 !important",
      },
    },
    tableCell: {
      cursor: "pointer",
      fontSize: "0.8rem",
    },
  };
});

const headerCells = [
  {
    id: "date",
    label: "วันที่",
  },
  {
    id: "number_of_car",
    label: "จำนวนรถ",
  },
  {
    id: "income",
    label: "รายได้พึงได้",
  },
  {
    id: "paid",
    label: "ชำระแล้ว",
  },
  {
    id: "overdue",
    label: "ค้างชำระ",
  },
  {
    id: "remark",
    label: "หมายเหตุ",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableDashBoard2(props) {
  //   const [open, setOpen] = useState(false);
  const [dataForActivity, SetDataForActivity] = useState([]);

  const fetchData = (ts, timestamp) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    const sendData = {
      transactionId: ts,
      timestamp: timestamp,
    };
    apiURL
      .post("/pk3display-activity", sendData)
      .then((res) => {
        Swal.close();
        SetDataForActivity(res.data);
        console.log("res2:", res.data);
      })
      .catch((error) => {
        // handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  //   const handleOpen = async () => {
  //     await setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const classes = useStyles();
  const { dataList, onChange } = props;

  return (
    <>
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
            {!!dataList.month
              ? dataList.month.map((data, index) => (
                <StyledTableRow key={index} className={classes.tableRow}>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.date ? data.date : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.count_vehicle ? data.count_vehicle.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.income ? data.income.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    -
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    -
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    -
                  </TableCell>
                </StyledTableRow>
              ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
