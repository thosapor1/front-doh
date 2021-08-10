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
  { value: "all", label: "ทุกด่าน" },
  { value: "tc1", label: "ทับช้าง1" },
  { value: "tc2", label: "ทับช้าง2" },
  { value: "ty1", label: "ธัญบุรี1" },
  { value: "ty2", label: "ธัญบุรี2" },
];
const status = [
  { value: "all", label: "ทุกสถานะ" },
  { value: "normal", label: "รายการปกติ" },
  { value: "unMatch", label: "รายการข้อมูลไม่ตรงกัน" },
  { value: "miss", label: "รายการสูญหาย" },
];

const url = "http://202.183.167.92:5010/audit/api/rawdata";

export default function RawTransaction(props) {
  const [state, setState] = useState({
    state: "",
    summary: {
      total: "",
      normal: "",
      unMatch: "",
      miss: "",
    },
    record: [
      {
        transactionId: "",
        lane_id: "",
        timestamp: "",
        vehicleClass: "",
        path_images: "",
        wheel_description: "",
        cameras_plateNo1: "",
        province_description: "",
        brand_description: "",
        colors_description: "",
        laserTimestamp: "",
        cameras_cameraTimestamp: "",
        cameras_platePicture: "",
        state: 1,
        sub_state: 1,
      },
    ],
  });

  const [textField, setTextField] = useState("all");

  const classes = useStyle();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setTextField(event.target.value);
  };

  async function fetchData() {
    axios.get(url).then((res) => {
      setState(res.data);
      console.log(res.data);
    });
  }

  useEffect(() => {
    fetchData();
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
          <TextField
            id="station"
            select
            label="ด่าน"
            className={classes.textField}
            onChange={handleChange}
          >
            {stations.map((station) => (
              <option key={station.value} value={station.value}>
                {station.name}
              </option>
            ))}
          </TextField>
          <TextField
            id="status"
            select
            label="สถานะ"
            className={classes.textField}
          >
            {status.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </TextField>

          <Button
            className={classes.btn}
            color="primary"
            variant="contained"
            style={{ marginTop: 23, marginLeft: 20 }}
            startIcon={<FilterListIcon />}
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
              <Typography> {state.summary.total} รายการ</Typography>
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
        <AuditTable datalist={state.record} />
      </div>
    </Container>
  );
}
