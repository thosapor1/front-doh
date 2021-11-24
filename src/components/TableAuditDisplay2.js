import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import Swal from "sweetalert2";
import ModalReadOnly2 from "./ModalReadOnly2";
import ModalActivity2 from "./ModalActivity2";
// import format from "date-fns/format";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

const detailStatus = [
  {
    state: 1,
    color: 'lightgray',
    label: 'ปกติรอเก็บเงิน'
  },
  {
    state: 2,
    color: '#FF2400',
    label: 'ประเภทไม่ตรง'
  },
  {
    state: 3,
    color: 'blue',
    label: 'รอจัดเก็บตรวจสอบ'
  },
  {
    state: 4,
    color: 'orange',
    label: 'รอ super audit ตรวจสอบ'
  },
  {
    state: 5,
    color: 'black',
    label: 'รอพิจารณาพิเศษ'
  },
  {
    state: 6,
    color: 'pink',
    label: 'รอตรวจสอบรับทราบ'
  },
  {
    state: 7,
    color: 'green',
    label: 'ปกติชำระแล้ว'
  },
  {
    state: 8,
    color: '#FF2400',
    label: 'MF สูญหาย'
  }
]
const useStyles = makeStyles((theme, props) => {
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
    container: {
      maxHeight: '55vh',
      overflow: 'auto',
      [theme.breakpoints.down('lg')]: {
        maxHeight: '42vh'
      }
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
    },
    header2: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 38,
      // zIndex: 10,
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#e8eaf6 !important",
      },
    },
    pagination: {
      '& .MuiPaginationItem-root': {
        height: 25,
        minWidth: 25,
        fontSize: '0.8rem',
        [theme.breakpoints.down('lg')]: {
          fontSize: '0.7rem'
        },
      },
      marginBottom: 10,

    },
    tableCell: {
      cursor: "pointer",
      fontSize: "0.75rem",
      padding: "6px",
    },
    detailStatus: {
      display: 'inline',
      fontSize: '0.8rem',
      [theme.breakpoints.down('lg')]: {
        fontSize: '0.7rem'
      },
    },
    dot: {
      fontSize: '0.8rem',
    },
    box: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('lg')]: {
        display: 'block'
      }
    }
  };
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableAuditDisplay2(props) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [dataForActivity, SetDataForActivity] = useState({});

  const fetchData = async (ts, State, timeStamp) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    let date = timeStamp.split(" ").shift();

    const sendData = {
      transactionId: ts,
      date: date,
    };
    let endpoint = "";
    if (State === 2) {
      endpoint = "/display-activity2";
      setOpen(true);
    } else {
      endpoint = "/display-activity2";
      setOpen(true);
    }
    apiURL
      .post(endpoint, sendData)
      .then((res) => {
        Swal.close();
        SetDataForActivity(res.data);
        console.log("res2:", res.data);
      })
      .catch((error) => {
        handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  // const handleOpen = (state) => {
  //   if (state === 2) {
  //     setOpen(true);
  //   }
  //   setOpen1(true);
  // };

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
  };

  const classes = useStyles();
  const { dataList, page, onChange, dropdown, checkDate } = props;

  return (
    <div>
      <Box className={classes.box}>
        <Pagination
          count={dataList.totalPages}
          color="primary"
          page={page}
          onChange={onChange}
          className={classes.pagination}
        />
        <Box style={{ display: 'flex', paddingTop: 2 }}>
          {detailStatus.map((item) =>
            <Box style={{ paddingLeft: 10 }}>
              <FiberManualRecordIcon className={classes.dot} style={{ color: item.color }} />
              <Typography className={classes.detailStatus} >{item.label}</Typography> </Box>
          )}
        </Box>
      </Box>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                สถานะ
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                transaction
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                เวลาเข้าด่าน
              </TableCell>
              <TableCell colSpan={4} align="center" className={classes.header}>
                ประเภทรถ
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                ประเภท TS
              </TableCell>
              <TableCell colSpan={3} align="center" className={classes.header}>
                ตรวจสอบ
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                className={classes.header}
                style={{ backgroundColor: "orange" }}
              >
                จัดเก็บ
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                หมายเหตุ
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell align="center" className={classes.header2} >
                จริง
              </TableCell>
              <TableCell align="center" className={classes.header2}>
                AD
              </TableCell>
              <TableCell align="center" className={classes.header2}>
                ML
              </TableCell>
              <TableCell align="center" className={classes.header2}>
                MF
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header2}>
                ค่าผ่านทาง
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header2}>
                ค่าปรับ
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header2}>
                รวม
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header2}>
                เรียกเก็บ
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header2}>
                ชำระ
              </TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.resultsDisplay
              ? dataList.resultsDisplay.map((data) => (
                <StyledTableRow
                  key={data.transactionId}
                  onClick={() => {
                    fetchData(
                      data.transactionId,
                      data.state,
                      data.match_timestamp
                    );
                  }}
                  className={classes.tableRow}
                >
                  <TableCell align="center" className={classes.tableCell}>
                    <FiberManualRecordIcon
                      style={{
                        // fontSize: "0.8rem",
                        color:
                          data.state === 2
                            ? "#FF2400"
                            : data.state === 3
                              ? "blue"
                              : data.state === 4
                                ? "orange"
                                : data.state === 5
                                  ? "black"
                                  : data.state === 6
                                    ? "pink"
                                    : data.state === 7
                                      ? "green"
                                      : data.state === 8
                                        ? "#FF2400"
                                        : "lightgray",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {data.transactionId}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.match_timestamp
                      ? data.match_timestamp.split(" ").pop()
                      : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.match_real_vehicleClass
                      ? `C${data.match_real_vehicleClass}`
                      : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.audit_check_vehicleClass
                      ? `C${data.audit_check_vehicleClass}`
                      : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {data.mf_lane_vehicleClass
                      ? `C${data.mf_lane_vehicleClass}`
                      : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.vehicleClass ? `C${data.vehicleClass}` : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.match_transaction_type
                      ? data.match_transaction_type_name
                      : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.match_real_fee ? data.match_real_fee : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.fine ? data.fine : "-"}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {!!data.match_total_cost ? data.match_total_cost : "-"}
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

      <ModalActivity2
        dataList={dataForActivity}
        open={open}
        onClick={handleClose}
        onFetchData={props.onFetchData}
        dropdown={dropdown}
        checkDate={checkDate}
      />
      <ModalReadOnly2
        dataList={dataForActivity}
        open={open1}
        onClick={handleClose}
        onFetchData={props.onFetchData}
      />
    </div >
  );
}
