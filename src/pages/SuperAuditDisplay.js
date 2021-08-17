import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import { TimePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import AllTsTable from "../components/AllTsTable";
import axios from "axios";

const apiURL = axios.create({
  baseURL: "http://202.183.167.119:3012/audit/api",
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
    label: "ธัญบุรี1",
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

export default function AuditDisplay() {
  const [state, setState] = useState();
  const [allTsTable, setAllTsTable] = useState("");
  const [summary, setSummary] = useState("");
  const [gate_select, setGate_select] = useState(null);
  const [status_select, setStatus_select] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeStart, setSelectedTimeStart] = useState(new Date());
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(new Date());

  const dataCard = [
    // {
    //   value: summary.ts_total,
    //   status: "ts_total",
    //   label: "จำนวนรายการทั้งหมดของวัน",
    // },
    // {
    //   value: summary.ts_normal,
    //   status: "ts_normal",
    //   label: "จำนวนรายการปกติ",
    // },
    {
      value: summary.ts_not_normal,
      status: "ts_not_normal",
      label: "จำนวนรายการตรวจสอบ",
    },
    // {
    //   value: summary.revenue,
    //   status: "revenue",
    //   label: "รายได้พึงได้รายวัน",
    // },
  ];

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
    const sendData = {
      checkpoint_id: gate_select,
      datetime: selectedDate,
      startTime: selectedTimeStart,
      endTime: setSelectedTimeEnd,
      transactionStatus: status_select,
    };
    console.log(sendData);
    apiURL.post("/pk3display-superaudit", sendData).then((res) => {
      console.log(
        "res: ",
        res.data,
        "ts_Table:",
        res.data.ts_table,
        "Summary: ",
        res.data.summary
      );
      setSummary(res.data.summary);
      setAllTsTable(res.data.ts_table);
    });
  };

  const fetchData = () => {
    const sendData = {
      checkpoint_id: "1",
      datetime: "2021-08-10",
      startTime: "01:00:00",
      endTime: "23:00:00",
    };
    console.log(sendData);
    apiURL.post("/pk3display-superaudit", sendData).then((res) => {
      console.log(
        "res: ",
        res.data,
        "ts_Table:",
        res.data.ts_table,
        "Summary: ",
        res.data.summary
      );
      setSummary(res.data.summary);
      setAllTsTable(res.data.ts_table);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h6">super admin display</Typography>

      {/* Filter Section */}
      <Paper className={classes.filterSection}>
        <TextField
          select
          label="ด่าน"
          value={gate_select}
          onChange={(e) => setGate_select(e.target.value)}
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
          onChange={(e) => setStatus_select(e.target.value)}
          style={{ width: 120, marginTop: 16, marginLeft: 30 }}
          name="status_select"
          disabled
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
          <TimePicker
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
          <TimePicker
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
                card.status === "ts_total"
                  ? "3px solid gray"
                  : card.status === "ts_normal"
                  ? "3px solid gray"
                  : card.status === "ts_not_normal"
                  ? "3px solid orange"
                  : "3px solid green",
            }}
          >
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item>
                <Typography
                  style={{
                    color:
                      card.status === "ts_total"
                        ? "gray"
                        : card.status === "ts_normal"
                        ? "gray"
                        : card.status === "ts_not_normal"
                        ? "orange"
                        : "green",
                  }}
                >
                  {card.label}
                </Typography>
                <Typography>
                  {card.value} {card.status === "revenue" ? "บาท" : "รายการ"}
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

      <div className={classes.allTsTable}>
        <AllTsTable dataList={allTsTable} />
      </div>
    </Container>
  );
}
