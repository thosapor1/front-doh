import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Swal from "sweetalert2";
import axios from "axios";
import format from "date-fns/format";
import { removeMatch, separateTransaction } from "../service/allService";
import { Link } from "react-router-dom";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});
const useStyle = makeStyles((theme) => {
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
    root: {},
    bodyModal: {
      height: "auto",
      width: "27%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      // [theme.breakpoints.only("md")]: {
      //   marginTop: "1%",
      // },
      // [theme.breakpoints.only("sm")]: {
      //   marginTop: "20%",
      // },
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      // padding: "6px",
      zIndex: 1,
    },
    header2: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 38,
      zIndex: 1,
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#e8eaf6 !important",
      },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        height: 25,
        minWidth: 25,
        fontSize: "0.8rem",
        [theme.breakpoints.down("lg")]: {
          fontSize: "0.7rem",
        },
      },
      paddingTop: 5,
    },
    tableCell: {
      cursor: "pointer",
      fontSize: "0.75rem",
      padding: "6px",
      height: 28,
    },
    btn: {
      color: "white",
      width: "100%",
      marginTop: 5,
    },
    textField: {
      height: 20,
      bottom: 5,
      width: 50,
      "& .MuiInput-input": { fontSize: "0.8rem" },
      float: "right",
    },
    textField2: {
      height: 20,
      bottom: 5,
      width: "100px",
      "& .MuiInput-input": { fontSize: "0.75rem" },
      float: "right",
      "& .MuiOutlinedInput-inputMarginDense": {
        padding: "5px 5px",
      },
      // [theme.breakpoints.down('lg')]: {
      //   width: '300%'
      // }
      // "& .MuiInputBase-root": {
      //   width: 50,
      // },
    },
    tab: {
      fontSize: "0.7rem",
      minWidth: "25%",
    },
    tabs: {
      color: "white",
      backgroundColor: "#6200ea",
    },
    headTable: {
      fontSize: "0.75rem",
      color: "white",
    },
    checkType: {
      "& .MuiTableRow-root": {
        backgroundColor: "red",
      },
    },
    tableContainer: {
      height: "23vh",
      [theme.breakpoints.down("lg")]: {
        height: "23vh",
      },
    },
    inputContainer: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down["lg"]]: {
        display: "block",
      },
    },
  };
});

export default function ModalOperation(props) {
  const classes = useStyle();

  const { open, close, checkDate, page } = props;
  const [value, setValue] = useState("gather");
  const [ts1, setTs1] = useState("");
  const [ts2, setTs2] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // console.log(format(checkDate, "yyyyMMdd"));

  const handleChangeSubmit = async () => {
    if (value === "delete") {
      const sendData = {
        date: format(checkDate, "yyyyMMdd"),
        txId: ts1,
      };

      const result = await Swal.fire({
        text: "คุณต้องการบันทึกข้อมูล!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        const res = await removeMatch(sendData);
        if (!!res && res.data.status === true) {
          Swal.close();
          await Swal.fire({
            title: "Success",
            text: "ข้อมูลของท่านถูกบันทึกแล้ว",
            icon: "success",
          });
          await props.close();
          await props.onFetchData(page);
        } else {
          Swal.close();
          await Swal.fire({
            title: "Fail",
            text: "บันทึกข้อมูลไม่สำเร็จ",
            icon: "error",
          });
        }
      }
    } else if (value === "separate") {
      const sendData2 = {
        date: format(checkDate, "yyyy-MM-dd").toString(),
        transactionId: ts1.toString(),
      };

      console.log(sendData2);

      const result = await Swal.fire({
        text: "คุณต้องการบันทึกข้อมูล!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        const res = await separateTransaction(sendData2);
        if (!!res && res.data.status === true) {
          Swal.close();
          await Swal.fire({
            title: "Success",
            text: "ข้อมูลของท่านถูกบันทึกแล้ว",
            icon: "success",
          });
          await props.close();
          await props.onFetchData(page);
        } else {
          Swal.close();
          await Swal.fire({
            title: "Fail",
            text: "บันทึกข้อมูลไม่สำเร็จ",
            icon: "error",
          });
        }
      }
    } else if (value === "gather") {
      // const sendData = {
      //   date: format(checkDate, "yyyyMMdd"),
      //   txId: ts1,
      // };
    }
  };

  const body = (
    <div className={classes.bodyModal}>
      <div className={classes.head}>
        {/* <div>
          <Tooltip title="close">
            <CancelRoundedIcon
              onClick={close}
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                paddingTop: 5,
                color: "gray",
                float: "right",
              }}
            />
          </Tooltip>
        </div> */}
      </div>
      <FormControl component="fieldset">
        <FormLabel component="legend">การดำเนินการ</FormLabel>
        <RadioGroup
          aria-label="operation"
          name="operation"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="gather"
            control={<Radio />}
            label="รวมรายการ"
          />
          <FormControlLabel
            value="separate"
            control={<Radio />}
            label="แยกรายการ"
          />
          <FormControlLabel
            value="delete"
            control={<Radio />}
            label="ลบรายการ"
          />
        </RadioGroup>
      </FormControl>
      <Box className={classes.inputContainer}>
        <TextField
          name="ts1"
          label="Transaction"
          variant="outlined"
          value={ts1}
          onChange={(e) => setTs1(e.target.value)}
          size="small"
        />
        <TextField
          name="ts2"
          label="Transaction"
          variant="outlined"
          value={ts2}
          onChange={(e) => setTs2(e.target.value)}
          disabled={value === "separate" || value === "delete" ? true : false}
          size="small"
          style={{ fontSize: "0.8rem" }}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "10px 5px 0px 5px" }}
          onClick={handleChangeSubmit}
        >
          ตกลง
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ margin: "10px 5px 0px 5px" }}
          onClick={close}
        >
          ยกเลิก
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        // onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          overflow: "scroll",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}