import { Button, Paper, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";

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

export default function SeachComponent(props) {
  const classes = useStyle();
  const { transactionId, date } = props;

  return (
    <>
      <Paper style={{ height: 112 }}>
        <TextField
          variant="outlined"
          className={classes.input1}
          label="TransactionId"
          value={transactionId}
          name="transactionId"
        />
        <Button
          variant="contained"
          color="primary"
          style={{ display: "block", marginLeft: 120 }}
          onClick={() => alert(transactionId)}
        >
          Search{" "}
        </Button>
      </Paper>
    </>
  );
}
