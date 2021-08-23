import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, makeStyles, TextField } from "@material-ui/core";
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
  { value: "0", label: "ทุกสถานะ" },
  { value: "1", label: "รายการปกติ" },
  { value: "2", label: "รายการข้อมูลไม่ตรงกัน" },
  { value: "3", label: "รายการสูญหาย" },
];

const apiURL = axios.create({
  baseURL: "http://202.183.167.119:3014/audit/api/v3",
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

  const [page, setPage] = useState(1);
  const [station, setStation] = useState(0);
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

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    if(event.target.value == 3){
      setStatus(2)
      setSubState(2)
    }else if(event.target.value== 2){
      setStatus(2)
      setSubState(1)
    }else if(event.target.value==1){
      setStatus(1)
      setSubState(1)
    }else if(event.target.value==0){
      setStatus(0)
      setSubState(0)
    }
    console.log(`subState: ${subState}`)
    console.log(`status: ${status}`)
  };
  async function fetchData(pageId = 1) {
    const date = format(selectedDate, "yyyy-MM-dd");

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
      console.log(res.data);
      // console.log(`state_length: ${state.record.length}`);
    });
  }

  useEffect(() => {
    fetchData();
    // console.log('hello test')
  }, []);

  return (
    <Container className={classes.root}>
      <Typography variant="h6">ตรวจสอบ (DOH) : รายการฐานข้อมูลรถ</Typography>
      {/* Search Block */}
      <Grid container className={classes.allSelect}>
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
              <option key={station.value} value={station.value}>
                {station.label}
              </option>
            ))}
          </TextField>
          <TextField
            name="status"
            select
            label="สถานะ"
            className={classes.textField}
            value={status}
            onChange={(event) => {handleStatusChange(event)}}
          >
            {statusValue.map((item) => (
              <option key={item.label} value={item.value} >
                {item.label}
              </option>
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
      </Grid>

      {/* CardMedia block */}
      <div className={classes.containedPaper}>
        <Paper
          className={classes.paper}
          style={{ borderLeft: "solid darkgray" }}
        >
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              <Typography>รายการทั้งหมด</Typography>
              <Typography>
                {state.summary.total}
                รายการ
              </Typography>
            </Grid>
            <Grid>
              <DescriptionTwoToneIcon />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper} style={{ borderLeft: "solid green" }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              <Typography style={{ color: "green" }}>รายการปกติ</Typography>
              <Typography> {state.summary.normal} รายการ</Typography>
            </Grid>
            <Grid>
              <DescriptionTwoToneIcon />
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.paper}
          style={{ borderLeft: "solid #ffa726" }}
        >
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              <Typography style={{ color: "#ffa726" }}>
                รายการข้อมูลไม่ตรงกัน
              </Typography>
              <Typography> {state.summary.unMatch} รายการ</Typography>
            </Grid>
            <Grid>
              <DescriptionTwoToneIcon />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper} style={{ borderLeft: "solid red" }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              <Typography style={{ color: "red" }}>
                รายการข้อมูลสูญหาย
              </Typography>
              <Typography> {state.summary.miss} รายการ</Typography>
            </Grid>
            <Grid>
              <DescriptionTwoToneIcon />
            </Grid>
          </Grid>
        </Paper>
      </div>

      {/* Table Blcok */}
      <div>
        <AuditTable datalist={state} page={page} onChange={handlePageChange} />
      </div>
    </Container>
  );
}
