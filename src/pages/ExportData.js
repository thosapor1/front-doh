import DateFnsUtils from "@date-io/date-fns";
import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import format from "date-fns/format";
import { exportData } from "../service/allService";

const useStyles = makeStyles((theme) => {
  return {
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

      margin: theme.spacing(3),
    },
    box: {
      display: "flex",
      justifyContent: "center",
      margin: "20vh",
    },
    button: {
      width: 300,
      height: 100,
      fontSize: "2rem",
      borderRadius: "15px",
    },
  };
});
export default function ExportData() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );

  const download = async () => {
    const sendData = {
      date: format(selectedDate, "yyyy-MM-dd"),
    };
    const res = await exportData(sendData);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "downloadFile");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    console.log(res.data);
    console.log(url);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.input}
          disableToolbar
          variant="inlined"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="วันที่เข้าด่าน"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Box className={classes.box}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={download}
        >
          export data
        </Button>
      </Box>
    </>
  );
}
