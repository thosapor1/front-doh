import {
  Button,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    textField: {
      width: 150,
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      height: 40,
      width: 100,
      marginTop: 22,
      marginLeft: 30,
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    input: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
    },
  };
});

const valueMenuItem = [
  {
    id: 0,
    value: 0,
    label: "ทุกด่าน",
  },
  {
    id: 1,
    value: 1,
    label: "ทับช้าง1",
  },
  {
    id: 2,
    value: 2,
    label: "ทับช้าง2",
  },
  {
    id: 3,
    value: 3,
    label: "ธัญบุรี1",
  },
  {
    id: 4,
    value: 4,
    label: "ธัญบุรี2",
  },
];

export default function FilterSection(props) {
  const { onFetchData, report } = props;
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [checkpoint, setCheckpoint] = useState(0);

  useEffect(() => {}, []);
  return (
    <div>
      <Paper style={{ height: "80px" }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.input}
            style={{
              width: 170,
              marginLeft: 30,
              fontSize: "0.8rem",
              marginTop: 20,
            }}
            disableToolbar
            variant="inlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="date"
            label="วันที่"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <TextField
          className={classes.input}
          select
          label="ด่าน"
          value={checkpoint}
          onChange={(e) => setCheckpoint(e.target.value)}
          style={{ width: 170, marginTop: 16, marginLeft: 30 }}
          name="gate_select"
        >
          {valueMenuItem.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          className={classes.btn}
          onClick={() => {
            onFetchData();
          }}
        >
          ดูข้อมูล
        </Button>
        <Button
          variant="contained"
          className={classes.btn}
          style={{ backgroundColor: "lightpink" }}
          onClick={() => {
            report();
          }}
        >
          pdf
        </Button>
      </Paper>
    </div>
  );
}
