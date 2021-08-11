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
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import { TimePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import GateTable from "../components/GateTable";
import ClassTable from "../components/ClassTable";
import AllTsTable from "../components/AllTsTable";
import axios from "axios";

const apiURL = axios.create({
  baseURL: "http://202.183.167.119:3010/audit/api",
});

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

const valueStatus = [
  {
    id: "1",
    value: "1",
    label: "ปกติ",
  },
  {
    id: "2",
    value: "2",
    label: "ข้อมูลไม่ตรงกัน",
  },
  {
    id: "3",
    value: "3",
    label: "ข้อมูลสูญหาย",
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

const dataCard = [
  {
    value: 20,
    status: "all",
    label: "จำนวนรายการทั้งหมดของวัน",
  },
  {
    value: 10,
    status: "normal",
    label: "จำนวนรายการปกติ",
  },
  {
    value: 30,
    status: "waitToCheck",
    label: "จำนวนรายการตรวจสอบ",
  },
  {
    value: 500,
    status: "summary",
    label: "รายได้พึงได้รายวัน",
  },
];

export default function AuditDisplay() {

  const [state, setState] = useState({});
  const [gate_select, setGate_select] = useState(null)
  const [status_select, setStatus_select] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeStart, setSelectedTimeStart] = useState(new Date());
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(new Date());

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFilter = () => {
    console.log(
      "gate_select: ",
      gate_select,
      "status_select: ",
      status_select,
      "selectedDate: ",
      selectedDate,
      "selectedTimeStart: ",
      selectedTimeStart,
      "selectedTimeEnd: ",
      selectedTimeEnd
    );
  };

  useEffect(() => {
    const sendData = {
      checkpoint_id: "1",
      datetime: "0",
      startTime: "0",
      endTime: "0",
      transactionStatus: "0",
    };
    console.log(sendData);
    apiURL.get("/display", sendData).then((res) => {
      console.log(res.data);
    });
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h6">ตรวจสอบ (DOH):รายได้พึงได้รายวัน</Typography>

      {/* Filter Section */}
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

        <TextField
          select
          label="สถานะ"
          value={status_select}
          onChange={handleChange}
          style={{ width: 120, marginTop: 16, marginLeft: 30 }}
          name="status_select"
        >
          {valueStatus.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </TextField>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: 170, marginLeft: 30 }}
            disableToolbar
            variant="inlined"
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

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={false}
            variant="inline"
            label="เวลาเริ่มต้น"
            openTo="hours"
            views={["hours", "minutes", "seconds"]}
            format="HH:mm:ss"
            value={selectedTimeStart}
            onChange={setSelectedTimeStart}
            style={{ width: 170, marginLeft: 30, marginTop: 16 }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={false}
            variant="inline"
            label="เวลาสิ้นสุด"
            openTo="hours"
            views={["hours", "minutes", "seconds"]}
            format="HH:mm:ss"
            value={selectedTimeEnd}
            onChange={setSelectedTimeEnd}
            style={{ width: 170, marginLeft: 30, marginTop: 16 }}
          />
        </MuiPickersUtilsProvider>

        <Button
          variant="contained"
          className={classes.btn}
          onClick={handleFilter}
        >
          ดูข้อมูล
        </Button>
      </Paper>

      {/* Card Section */}
      <div className={classes.cardSection}>
        {dataCard.map((card) => (
          <Paper
            className={classes.card}
            style={{
              borderLeft:
                card.status === "all"
                  ? "3px solid gray"
                  : card.status === "normal"
                  ? "3px solid gray"
                  : card.status === "waitToCheck"
                  ? "3px solid red"
                  : "3px solid green",
            }}
          >
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item>
                <Typography
                  style={{
                    color:
                      card.status === "all"
                        ? "gray"
                        : card.status === "normal"
                        ? "gray"
                        : card.status === "waitToCheck"
                        ? "red"
                        : "green",
                  }}
                >
                  {card.label}
                </Typography>
                <Typography>
                  {card.value} {card.status === "summary" ? "บาท" : "รายการ"}
                </Typography>
              </Grid>
              <Grid>
                <DescriptionTwoToneIcon />
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>

      {/* Table Section */}
      <Grid container component="Paper" className={classes.gateAndClassSection}>
        <Grid component={Paper} item md={5}>
          <GateTable dataList={dataTest} />
        </Grid>
        <Grid item md={7} style={{ paddingLeft: 20 }}>
          <ClassTable dataList={dataTest} />
        </Grid>
      </Grid>
      <div component="Paper" className={classes.allTsTable}>
        <AllTsTable />
      </div>
    </Container>
  );
}
