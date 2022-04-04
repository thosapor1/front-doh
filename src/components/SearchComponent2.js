import { Box, Button, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import format from "date-fns/format";
import Swal from "sweetalert2";
import { searchByMatchTS, searchOnExpectIncome } from "../service/allService";
import { StyledButtonSearch } from "../styledComponent/StyledButton";

const useStyle = makeStyles((theme) => {
  return {
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
    },
  };
});

export default function SearchComponent2(props) {
  const classes = useStyle();
  const {
    date,
    label,
    value,
    name,
    handleOnChange,
    setTable,
    endpoint,
    setEyesStatus,
  } = props;

  const setDataExpectIncome = async (res, eyes) => {
    if ((!!res && !res.data.status) || (!!res && !res.data.resultsDisplay[0])) {
      Swal.fire({
        title: "Fail",
        text: "transaction ไม่ถูกต้อง",
        icon: "warning",
      });
    } else if (!!res && !!res.data.resultsDisplay[0] && !!res.data.status) {
      eyes.push({
        state: res.data.resultsDisplay[0].state,
        readFlag: res.data.resultsDisplay[0].readFlag,
        transactionId: res.data.resultsDisplay[0].transactionId,
      });
      setEyesStatus(eyes);
      setTable(!!res.data.status ? res.data : []);
      Swal.close();
    }
  };

  const onClickHandle = async () => {
    const sendData = {
      date: format(date, "yyyy-MM-dd"),
      transactionId: value,
    };

    let eyes = [];
    let res = "";
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    if (endpoint === "/search-transaction-match") {
      res = await searchByMatchTS(endpoint, sendData);
    } else {
      res = await searchOnExpectIncome(endpoint, sendData);
    }

    setDataExpectIncome(res, sendData, eyes);

    // else {
    //   Swal.fire({
    //     title: "Fail",
    //     text: "ไม่มีข้อมูล",
    //     icon: "warning",
    //   });
    // }
  };

  return (
    <>
      <Paper style={{ display: "flex", height: 51, padding: 10 }}>
        <TextField
          variant="outlined"
          className={classes.input1}
          label={label}
          value={value}
          name={name}
          onChange={handleOnChange}
        />
        <StyledButtonSearch
          style={{ margin: "0px 0px 0px 10px" }}
          onClick={onClickHandle}
        >
          {`Search`}
        </StyledButtonSearch>
      </Paper>
    </>
  );
}
