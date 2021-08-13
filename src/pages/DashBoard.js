import {
  Button,
  Container,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import Chart from "react-google-charts";
import Paper from "@material-ui/core/Paper";
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components,
} from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from "js-cookie";

const data = [
  ["วันที่", "จำนวนรถ"],
  ["1", 180000],
  ["2", 180000],
  ["3", 300000],
  ["4", 200000],
  ["5", 398742],
  ["6", 163000],
  ["7", 326547],
  ["8", 285478],
  ["9", 300000],
  ["10", 398742],
  ["11", 180000],
  ["12", 300000],
  ["13", 180000],
  ["14", 180000],
  ["15", 326547],
  ["16", 180000],
  ["17", 180000],
  ["18", 285478],
  ["19", 180000],
  ["20", 180000],
  ["21", 300000],
];

const localizer = momentLocalizer(moment);
const myEventsList = () => {
  console.log("test");
};

const useStyle = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    containerChartAndCalendar: {
      height: "100%",
      width: "70%",
    },
    paper: {
      width: "80%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    btnContainer: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: 20,
    },
  };
});

export default function DashBoard() {
  console.log(Cookies.get('name'))
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.containerChartAndCalendar}>
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={data}
          options={{
            title: "ข้อมูลปริมาณรถ มีนาคม 2564",
            colors: ["#2196f3"],
            fontName: "Prompt",
          }}
        />

        <Typography variant="body1">เลือกวันที่เพื่อดูข้อมูล</Typography>
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
      <div style={{ width: "25%", height: "100%", backgroundColor: "#fafafa" }}>
        <Typography variant="h6" align="center" style={{ marginTop: "1rem" }}>
          รายการเดือน มีนาคม 2564
        </Typography>

        <Paper elevation={0} className={classes.paper} align="center">
          <Typography>Text</Typography>
          <Divider variant="middle" light />
          <Typography>Number</Typography>
        </Paper>
        <Paper elevation={0} className={classes.paper} align="center">
          <Typography>Text</Typography>
          <Divider variant="middle" light />
          <Typography>Number</Typography>
        </Paper>
        <Paper elevation={0} className={classes.paper} align="center">
          <Typography>Text</Typography>
          <Divider variant="middle" light />
          <Typography>Number</Typography>
        </Paper>
        <Paper elevation={0} className={classes.paper} align="center">
          <Typography>Text</Typography>
          <Divider variant="middle" light />
          <Typography>Number</Typography>
        </Paper>
        <div className={classes.paperClassIncome}></div>
        <div className={classes.btnContainer}>
          <Button variant="contained" color="primary" size="small">
            พิมพ์รายงาน
          </Button>
          <Button variant="contained" color="primary" size="small">
            ดูข้อมูลทั้งหมด
          </Button>
        </div>
      </div>
    </div>
  );
}
