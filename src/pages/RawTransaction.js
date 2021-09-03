import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, makeStyles, MenuItem, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React from "react";
import { useState, useEffect } from "react";
import AuditTable from "../components/AuditTable";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import FilterListIcon from "@material-ui/icons/FilterList";
import axios from "axios";
import { format } from "date-fns";

const useStyle = makeStyles((theme) => {
  return {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.3em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px  lightgray",
      },
    },
    root: {
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },
    allSelect: {
      display: "flex",
      marginTop: 20,
    },
    containedSelect: {
      display: "flex",
    },
    containedPaper: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 20,
    },
    containedTable: {
      marginTop: 20,
    },
    select: {},
    paper: {
      width: 290,
      height: 90,
      display: "flex",
    },
    btn: {
      width: 150,
      height: 40,
      backgroundColor: "#46005E",
    },
    textField: {
      width: 150,
      marginTop: 16,
      marginLeft: 50,
    },
    card: {
      width: "100%",
      height: 100,
      display: "flex",
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    cardSection: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10,
    },
    filterSection: {
      display: "flex",
      padding: theme.spacing(2),
      width: "auto",
      marginTop: 10,
    },
  };
});

const stations = [
  { value: "1", label: "ทับช้าง1" },
  { value: "2", label: "ทับช้าง2" },
  { value: "3", label: "ธัญบุรี1" },
  { value: "4", label: "ธัญบุรี2" },
  { value: "0", label: "ทุกด่าน" },
];
const statusValue = [
  { id: 0, value: "0", label: "ทุกสถานะ" },
  { id: 1, value: "1", label: "รายการปกติ" },
  { id: 2, value: "2", label: "รายการข้อมูลไม่ตรงกัน" },
  { id: 3, value: "3", label: "รายการสูญหาย" },
];

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V2}`,
});

export default function RawTransaction() {
  const [state, setState] = useState({
    summary: {
      total: 0,
      normal: 0,
      unMatch: 0,
      miss: 0,
    },
    record: [{}],
  });

  const [summary, setSummary] = useState([]);
  const [page, setPage] = useState(1);
  const [station, setStation] = useState(0);
  const [id, setId] = useState(0);
  const [status, setStatus] = useState(0);
  const [subState, setSubState] = useState(0);
  const classes = useStyle();
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const handlePageChange = (event, value) => {
    // setPage(value);
    fetchData(value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dataCard = [
    {
      value: summary.total,
      status: "total",
      label: "รายการทั้งหมด",
    },
    {
      value: summary.normal,
      status: "normal",
      label: "รายการปกติ",
    },
    {
      value: summary.unMatch,
      status: "unMatch",
      label: "รายการข้อมูลไม่ตรงกัน",
    },
    {
      value: summary.miss,
      status: "miss",
      label: "รายการสูญหาย",
    },
  ];

  const handleStatusChange = (event) => {
    setId(event.target.value);
    setStatus(event.target.value);
    if (event.target.value == 3) {
      setStatus(2);
      setSubState(2);
    } else if (event.target.value == 2) {
      setStatus(2);
      setSubState(1);
    } else if (event.target.value == 1) {
      setStatus(1);
      setSubState(1);
    } else if (event.target.value == 0) {
      setStatus(0);
      setSubState(0);
    }
    console.log(`subState: ${subState}`);
    console.log(`status: ${status}`);
  };
  async function fetchData(pageId = 1) {
    const date = format(selectedDate, "yyyy-MM-dd");
    // const date = "2021-08-10";

    if (pageId == 1) {
      setPage(1);
    } else {
      setPage(pageId);
    }

    const sendData = {
      checkpoint_id: station,
      datetime: date,
      transactionStatus: status,
      page: pageId,
      subState: subState,
    };
    console.log(`sendData: ${JSON.stringify(sendData)}`);
    await apiURL.post("/rawdata", sendData).then((res) => {
      setState({
        summary: {
          total: 0,
          normal: 0,
          unMatch: 0,
          miss: 0,
        },
        record: [],
      });
      setState(res.data);
      setSummary(!!res.data.summary ? res.data.summary : summary);
      console.log(res.data);
      // console.log(`state_length: ${state.record.length}`);
    });
  }

  useEffect(() => {
    fetchData();
    // console.log('hello test')
  }, []);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h6">ตรวจสอบ (DOH) : รายการฐานข้อมูลรถ</Typography>
      {/* Search Block */}
      <Paper className={classes.filterSection}>
        <Grid item className={classes.containedSelect} md={8}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ width: 170 }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date"
              label="วันที่เข้าด่าน"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            select
            label="ด่าน"
            className={classes.textField}
            onChange={(event) => setStation(event.target.value)}
            name="station"
            value={station}
          >
            {stations.map((station) => (
              <MenuItem key={station.value} value={station.value}>
                {station.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="status"
            select
            label="สถานะ"
            className={classes.textField}
            value={id}
            onChange={(event) => {
              handleStatusChange(event);
            }}
          >
            {statusValue.map((item) => (
              <MenuItem key={item.label} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            className={classes.btn}
            color="primary"
            variant="contained"
            style={{ marginTop: 23, marginLeft: 20 }}
            startIcon={<FilterListIcon />}
            onClick={() => {
              fetchData(1);
            }}
          >
            กรองข้อมูล
          </Button>
        </Grid>
        <Grid item md={4} style={{ textAlign: "right", paddingTop: 16 }}>
          <TextField
            id="search"
            label="ค้นหา"
            autoComplete="off"
            style={{ width: 170 }}
          ></TextField>
          <Button
            className={classes.btn}
            color="primary"
            variant="contained"
            style={{ marginTop: 7, marginLeft: 20 }}
            startIcon={<SearchTwoToneIcon />}
          >
            ค้นหา
          </Button>
        </Grid>
      </Paper>

      {/* Card Section */}
      <div className={classes.cardSection}>
        {dataCard.map((card) => (
          <Paper
            className={classes.card}
            style={{
              borderLeft:
                card.status === "total"
                  ? "3px solid gray"
                  : card.status === "normal"
                  ? "3px solid green"
                  : card.status === "unMatch"
                  ? "3px solid orange"
                  : "3px solid red",
            }}
          >
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item>
                <Typography
                  style={{
                    color:
                      card.status === "total"
                        ? "gray"
                        : card.status === "normal"
                        ? "green"
                        : card.status === "unMatch"
                        ? "orange"
                        : "red",
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

      {/* Table Blcok */}
      <div>
        <AuditTable datalist={state} page={page} onChange={handlePageChange} />
      </div>
    </Container>
  );
}
