import { Button, Paper, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import format from "date-fns/format";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    input: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 40,
      },
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
    },
    input1: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 40,
      },
      "& .MuiInputLabel-outlined": {
        transform: "translate(14px, 14px) scale(1)",
        fontSize: "0.8rem",
      },
      "& .MuiInputLabel-shrink": {
        transform: "translate(14px, -6px) scale(0.75)",
      },
      width: 200,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 200,
      },
    },
  };
});

export default function SearchComponent(props) {
  const classes = useStyle();
  const { date, label, value, name, handleOnChange, setTable } = props;

  const onClickHandle = () => {
    const sendData = {
      date: format(date, "yyyy-MM-dd"),
      transactionId: value,
    };

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    apiURL
      .post("/audit-search", sendData)
      .then((res) => {
        Swal.close();
        setTable(!!res.data.status ? res.data : []);
      })
      .catch((error) => {
        // handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  return (
    <>
      <Paper style={{ height: 112 }}>
        <TextField
          variant="outlined"
          className={classes.input1}
          label={label}
          value={value}
          name={name}
          onChange={handleOnChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ display: "block", marginLeft: 120 }}
          onClick={onClickHandle}
        >
          Search{" "}
        </Button>
      </Paper>
    </>
  );
}
