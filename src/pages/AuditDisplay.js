import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import { TimePicker } from "@material-ui/pickers";

import React, { useState } from "react";
import GateTable from "../components/GateTable";
import ClassTable from "../components/ClassTable";
import AllTsTable from "../components/AllTsTable";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },
    filterSection: {
      display: "flex",
      padding: theme.spacing(2),
      width: "auto",
      marginTop: 10,
    },
    cardSection: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10,
    },
    gateAndClassSection: {
      marginTop: 10,
      height: 300,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    allTsTable: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    card: {
      width: 290,
      height: 90,
      display: "flex",
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      width: "auto",
      height: 26,
      marginTop: 37,
      marginLeft: 30,
    },
  };
});

const valueOption = [
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
    label: "ธัญบุรี1",
  },
  {
    id: 5,
    value: 5,
    label: "ทุกด่าน",
  },
];

const dataTest = [
  {
    id: 1,
    name: "test1",
    value: 10,
  },
  {
    id: 2,
    name: "test2",
    value: 20,
  },
  {
    id: 3,
    name: "test3",
    value: 30,
  },
  {
    id: 4,
    name: "test4",
    value: 40,
  },
  {
    id: 5,
    name: "test5",
    value: 50,
  },
  {
    id: 6,
    name: "test6",
    value: 60,
  },
  {
    id: 7,
    name: "test7",
    value: 70,
  },
];

export default function AuditDisplay() {
  const [state, setState] = useState({
    gate_select: null,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const { gate_select } = state;

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h6">ตรวจสอบ (DOH):รายได้พึงได้รายวัน</Typography>

      <Paper className={classes.filterSection}>
        <TextField
          select
          label="ด่าน"
          value={gate_select}
          onChange={handleChange}
          style={{ width: 120, marginTop: 16 }}
          name="gate_select"
        >
          {valueOption.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </TextField>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: 170, marginLeft: 30 }}
            disableToolbar
            variant="inlined"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="วันที่เข้าด่าน"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <Button variant="contained" className={classes.btn}>
          ดูข้อมูล
        </Button>
      </Paper>

      <div className={classes.cardSection}>
        <Paper
          className={classes.card}
          style={{ borderLeft: "solid darkgray" }}
        >
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              <Typography>รายการทั้งหมด</Typography>
              <Typography> data รายการ</Typography>
            </Grid>
            <Grid>
              <DescriptionTwoToneIcon />
            </Grid>
          </Grid>
        </Paper>
      </div>

      <Grid container component="Paper" className={classes.gateAndClassSection}>
        <Grid component={Paper} item md={5} >
          <GateTable dataList={dataTest} />
        </Grid>
        <Grid item md={7} style={{paddingLeft:20}}>
          <ClassTable dataList={dataTest} />
        </Grid>
      </Grid>
      <div component="Paper" className={classes.allTsTable}>
        <AllTsTable />
      </div>
    </Container>
  );
}
