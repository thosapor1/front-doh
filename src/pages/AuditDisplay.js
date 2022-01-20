import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import React, { useEffect, useState } from "react";
import GateTable from "../components/GateTable";
import ClassTable from "../components/ClassTable";
import axios from "axios";
import { format } from "date-fns";
import AllTsTableForActivity from "../components/AllTsTableForActivity";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
});

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },
    filterSection: {
      padding: theme.spacing(2),
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    cardSection: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10,
    },
    gateAndClassSection: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    allTsTable: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    gateTable: {},
    classTable: {
      paddingLeft: 10,
      [theme.breakpoints.down("md")]: {
        padding: 0,
        marginTop: 20,
      },
    },
    card: {
      width: "100%",
      height: 100,
      display: "flex",
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    btn2: {
      backgroundColor: "green",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "darkgreen",
      },
    },
    input: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
    },
  };
});

const valueStatus = [
  {
    id: 0,
    value: 0,
    label: "ทุกสถานะ",
  },
  {
    id: 1,
    value: 1,
    label: "ปกติ",
  },
  {
    id: 2,
    value: 2,
    label: "ข้อมูลไม่ตรงกัน",
  },
  {
    id: 3,
    value: 3,
    label: "ข้อมูลสูญหาย",
  },
];

export default function AuditDisplay() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [gateTable, setGateTable] = useState([]);
  const [classTable, setClassTable] = useState([]);
  const [allTsTable, setAllTsTable] = useState([]);
  const [summary, setSummary] = useState([]);
  const [checkpoint, setCheckpoint] = useState("");
  const [status_select, setStatus_select] = useState(0);
  const [status, setStatus] = useState(0);
  const [valueMenuItem, setValueMenuItem] = useState([]);
  const [subState, setSubState] = useState(0);
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date("Sep 01, 2021")
  // );
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );

  const handlePageChange = (event, value) => {
    fetchData(value);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const dataCard = [
    {
      value: summary.ts_total,
      status: "ts_total",
      label: "จำนวนรายการทั้งหมด",
    },
    {
      value: summary.ts_normal,
      status: "ts_normal",
      label: "จำนวนรายการปกติ",
    },
    {
      value: summary.ts_not_normal,
      status: "ts_not_normal",
      label: "จำนวนรายการตรวจสอบ",
    },
    {
      value: summary.revenue,
      status: "revenue",
      label: "รายได้พึงได้รายวัน",
    },
  ];

  const fetchData = (pageId = 1) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    if (pageId === 1) {
      setPage(1);
    } else {
      setPage(pageId);
    }

    const date = format(selectedDate, "yyyy-MM-dd");
    const timeStart = format(selectedTimeStart, "HH:mm:ss");
    const timeEnd = format(selectedTimeEnd, "HH:mm:ss");

    const sendData = {
      page: pageId,
      checkpoint_id: checkpoint,
      datetime: date,
      startTime: timeStart,
      endTime: timeEnd,
      transactionStatus: status,
      sub_state: subState,
    };
    console.log(sendData);

    apiURL.post("/display", sendData).then((res) => {
      Swal.close();
      setAllTsTable({
        summary: {
          total: 0,
          normal: 0,
          unMatch: 0,
          miss: 0,
        },
        ts_table: [],
      });
      console.log(
        "res: ",
        res.data,
        "tsClass:",
        res.data.ts_class,
        "tsGate: ",
        res.data.ts_gate_table,
        "ts_Table:",
        res.data.ts_table,
        "Summary: ",
        res.data.summary
      );
      setSummary(res.data.status !== false ? res.data.summary : []);
      setGateTable(res.data.status !== false ? res.data.ts_gate_table : []);
      setClassTable(res.data.status !== false ? res.data.ts_class : []);
      setAllTsTable(res.data.status !== false ? res.data : []);
      setValueMenuItem(
        res.data.status !== false ? res.data.dropdown_Checkpoint : []
      );
    });
  };

  const refresh = (pageId = 1) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    if (pageId === 1) {
      setPage(1);
    } else {
      setPage(pageId);
    }

    setSelectedDate(new Date().setDate(new Date().getDate() - 1));
    setCheckpoint(0);
    setStatus_select(0);
    setSelectedTimeStart(new Date("Aug 10, 2021 00:00:00"));
    setSelectedTimeEnd(new Date("Aug 10, 2021 00:00:00"));
    const timeStart = "00:00:00";
    const timeEnd = "00:00:00";
    const date = format(
      new Date().setDate(new Date().getDate() - 1),
      "yyyy-MM-dd"
    );

    const sendData = {
      page: pageId,
      checkpoint_id: "0",
      datetime: date,
      startTime: timeStart,
      endTime: timeEnd,
      transactionStatus: "0",
      sub_state: subState,
    };
    console.log(sendData);

    apiURL.post("/display", sendData).then((res) => {
      Swal.close();
      setAllTsTable({
        summary: {
          total: 0,
          normal: 0,
          unMatch: 0,
          miss: 0,
        },
        ts_table: [],
      });
      console.log(
        "res: ",
        res.data,
        "tsClass:",
        res.data.ts_class,
        "tsGate: ",
        res.data.ts_gate_table,
        "ts_Table:",
        res.data.ts_table,
        "Summary: ",
        res.data.summary
      );
      setSummary(res.data.status !== false ? res.data.summary : []);
      setGateTable(res.data.status !== false ? res.data.ts_gate_table : []);
      setClassTable(res.data.status !== false ? res.data.ts_class : []);
      setAllTsTable(res.data.status !== false ? res.data : []);
    });
  };

  const changeSubState = (e) => {
    console.log(e);
    if (e === 0) {
      setStatus_select(0);
      setStatus(0);
      setSubState(0);
    } else if (e === 1) {
      setStatus_select(1);
      setStatus(1);
      setSubState(1);
    } else if (e === 2) {
      setStatus_select(2);
      setStatus(2);
      setSubState(1);
    } else if (e === 3) {
      setStatus_select(3);
      setStatus(2);
      setSubState(2);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          ตรวจสอบ (DOH) : รายได้พึงได้รายวัน
        </Typography>

        {/* Filter Section */}
        <Grid container component={Paper} className={classes.filterSection}>
          <TextField
            select
            variant="outlined"
            label="ด่าน"
            value={checkpoint}
            onChange={(e) => setCheckpoint(e.target.value)}
            className={classes.input}
            name="gate_select"
          >
            {valueMenuItem.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.checkpoint_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            variant="outlined"
            label="สถานะ"
            value={status_select}
            onChange={(e) => {
              changeSubState(e.target.value);
            }}
            className={classes.input}
            name="status_select"
          >
            {valueStatus.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>

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

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              inputVariant="outlined"
              ampm={false}
              variant="inline"
              label="เวลาเริ่มต้น"
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              format="HH:mm:ss"
              value={selectedTimeStart}
              onChange={setSelectedTimeStart}
              className={classes.input}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              inputVariant="outlined"
              ampm={false}
              variant="inline"
              label="เวลาสิ้นสุด"
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              format="HH:mm:ss"
              value={selectedTimeEnd}
              onChange={setSelectedTimeEnd}
              className={classes.input}
            />
          </MuiPickersUtilsProvider>

          <Button
            variant="contained"
            className={classes.btn}
            onClick={() => fetchData(1)}
          >
            ดูข้อมูล
          </Button>
          <Button
            variant="contained"
            className={classes.btn2}
            onClick={() => refresh(1)}
          >
            refresh
          </Button>
        </Grid>

        {/* Card Section */}
        <div className={classes.cardSection}>
          {!!dataCard
            ? dataCard.map((card, index) => (
                <Paper
                  key={index}
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
                  <Grid
                    container
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid item sm={12} md={6} lg={6}>
                      <Typography
                        style={{
                          fontSize: "0.9rem",
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
                      <Typography style={{ fontSize: "0.9rem" }}>
                        {card.value}
                        {card.status === "revenue" ? "บาท" : "รายการ"}
                      </Typography>
                    </Grid>
                    <Grid>
                      <DescriptionTwoToneIcon />
                    </Grid>
                  </Grid>
                </Paper>
              ))
            : []}
        </div>

        {/* Table Section */}
        <Grid
          container
          component={Paper}
          className={classes.gateAndClassSection}
        >
          <Grid item md={12} sm={12} lg={5} className={classes.gateTable}>
            <GateTable dataList={gateTable} />
          </Grid>
          <Grid item md={12} sm={12} lg={7} className={classes.classTable}>
            <ClassTable dataList={classTable} />
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
          <AllTsTableForActivity
            dataList={allTsTable}
            page={page}
            onChange={handlePageChange}
            onFetchData={fetchData}
          />
        </Grid>
      </Container>
    </>
  );
}
