import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
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
import {
  removeMatch,
  separateTransaction,
  mergeTransaction,
} from "../service/allService";
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
      columnGap: 10,
      [theme.breakpoints.down["lg"]]: {
        display: "block",
      },
    },
  };
});

export default function ModalReverseTransaction(props) {
  const classes = useStyle();

  const { open, close, checkDate, page, dropdown } = props;
  const [ts1, setTs1] = useState("");
  const [tsType, setTsType] = useState(1);
  const [state, setState] = useState(1);

  // console.log(format(checkDate, "yyyyMMdd"));

  const handleChangeSubmit = async () => {
    const sendData = {
      date: format(checkDate, "yyyyMMdd"),
      user_id: "1",
      transactionId: ts1,
      stateAfter: state,
      statusAfter: tsType,
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
  };

  const body = (
    <div className={classes.bodyModal}>
      <div className={classes.head}></div>
      <FormControl component="fieldset" style={{ marginBottom: 10 }}>
        <FormLabel component="legend">Reverse State</FormLabel>
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
          select
          variant="outlined"
          label="สถานะ"
          value={state}
          onChange={(e) => setState(e.target.value)}
          name="gate_select"
          size="small"
          style={{ width: 150 }}
        >
          {!!dropdown.state
            ? dropdown.state
                .filter((item) => item.id === 1 || item.id === 2)
                .map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
            : []}
        </TextField>

        <TextField
          select
          variant="outlined"
          label="ประเภทTS"
          value={tsType}
          onChange={(e) => {
            setTsType(e.target.value);
          }}
          name="tsType"
          size="small"
          style={{ width: 150 }}
        >
          {!!dropdown.ts_status
            ? dropdown.ts_status
                .filter(
                  (item) =>
                    item.id === 1 ||
                    item.id === 2 ||
                    item.id === 3 ||
                    item.id === 6 ||
                    item.id === 7
                )
                .map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
            : []}
        </TextField>
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
