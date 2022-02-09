import { Box, Button, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import format from "date-fns/format";
import Swal from "sweetalert2";
import { searchByPlate } from "../service/allService";
import { Autocomplete } from "@material-ui/lab";
import styles from "../styles/CssModule.module.css";

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
    input2: {
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
      margin: theme.spacing(1),
      width: 200,
      "& .makeStyles-input2-124 .MuiAutocomplete-input": {
        padding: "4px 4px",
      },
      // margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 200,
      },
    },
    button: {
      height: 40,
      fontSize: "0.7rem",
      margin: theme.spacing(1),
    },
  };
});

export default function SearchByPlateComponent(props) {
  const classes = useStyle();
  const {
    date,
    dropdown,
    valueProvince,
    name,
    handleOnChange,
    setTable,
    setEyesStatus,
    valuePlate,
    handleOnChangeProvince,
  } = props;

  const onClickHandle = async () => {
    const sendData = {
      date: format(date, "yyyy-MM-dd"),
      plate: valuePlate,
      province: valueProvince.name,
      code: valueProvince.code,
    };
    let eyes = [];

    console.log(sendData);
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await searchByPlate(sendData);

    if (!!res && !!res.data.status) {
      for (let i = 0; i < res.data.resultsDisplay.length; i++) {
        eyes.push({
          state: res.data.resultsDisplay[0].state,
          readFlag: res.data.resultsDisplay[0].readFlag,
          transactionId: res.data.resultsDisplay[0].transactionId,
        });
      }
      setEyesStatus(eyes);
      console.log(eyes);
      setTable(!!res.data.status ? res.data : []);
      Swal.close();
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        title: "Fail",
        text: "ไม่มีข้อมูล",
        icon: "warning",
      });
    }
  };

  return (
    <>
      <Box style={{ display: "flex" }}>
        <TextField
          variant="outlined"
          className={classes.input1}
          label="license plate"
          value={valuePlate}
          name={name}
          onChange={handleOnChange}
        />
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <Autocomplete
            id="province"
            className={classes.input2}
            options={!!dropdown ? dropdown : []}
            getOptionLabel={(option) => option.name}
            value={valueProvince}
            onChange={handleOnChangeProvince}
            renderInput={(params) => (
              <TextField {...params} label="province" variant="outlined" />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={onClickHandle}
            className={styles.btnSearch}
          >
            {`Search`}
          </Button>
        </Box>
      </Box>
    </>
  );
}
