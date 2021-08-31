import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import Paper from "@material-ui/core/Paper";
import Cookies from "js-cookie";
import DashBoardCalendar from "../components/DashBoardCalendar";
import LinearProgress from "@material-ui/core/LinearProgress";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import BarChart from "../components/BarChart";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import axios from "axios";

const apiURL = axios.create({
  baseURL: "http://202.183.167.92:3010/audit/api/v1",
});
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

const cardData = [
  { label: "จำนวนรายการทั้งหมดของวัน", value: "845,646" },
  { label: "จำนวนรายการตรวจสอบ", value: "1,809" },
  { label: "จำนวนรายการตรวจสอบแก้ไขแล้ว", value: "908" },
  { label: "จำนวนรายการตรวจสอบเสร็จสิ้น", value: "648" },
];

const dataChart = {
  labels: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
  datasets: [
    {
      label: "จำนวนรถ",
      data: [
        320000, 200000, 340000, 630000, 760000, 320000, 200000, 340000, 630000,
        760000, 320000, 200000, 340000, 630000, 760000, 320000, 200000, 340000,
        630000, 760000, 320000, 200000, 340000, 630000, 760000, 320000, 200000,
        340000, 630000, 760000, 760000,
      ],
      backgroundColor: ["rgba(153, 102, 255, 0.2)"],
      borderColor: ["rgb(153, 102, 255)"],
      borderWidth: 1,
    },
  ],
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
    card: {
      width: "80%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      textAlign: "center",
      height: "7vh",
      borderRadius: 10,
    },
    cardPopup: {
      width: "80%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      height: "30vh",
      borderRadius: 10,
    },
    btnContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 20,
      width: "80%",
      marginRight: "auto",
      marginLeft: "auto",
    },
    calendar: {
      "& .fc-daygrid-day-frame": {
        borderRadius: 10,
      },
      "& .fc-scrollgrid-sync-inner": {
        borderRadius: 10,
      },
      "& h2 .fc-toolbar-title": {
        fontSize: 12,
        color: "red",
      },
    },
    progress: {
      width: "90%",
      marginRight: "auto",
      marginLeft: "auto",
    },
  };
});

export default function DashBoard() {
  const classes = useStyle();

  const [popUP, setPopUP] = useState({
    status: "",
    C1: 0,
    c1SumAmount: 0,
    C2: 0,
    c2SumAmount: 0,
    C3: 0,
    c3SumAmount: 0,
    reject: 0,
    countReject: 0,
    sumAmountallClass: 0,
  });
  const [month, setMonth] = useState("");
  const handleClickDate = async (date) => {
    const res = await apiURL.post("/dashboard-listview", {
      date: date.dateStr,
    });
    setPopUP(res.data);

    console.log(res.data);
  };

  useEffect(() => {
    setMonth(format(new Date(), "MMMM yyyy", { locale: th }));
  }, []);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container>
        <Grid item lg={9} md={9}>
          <Grid
            component={Paper}
            item
            style={{
              width: "75%",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: 20,
              padding: "3rem",
              paddingTop: "1rem",
            }}
          >
            <Typography variant="h6">ข้อมูลปริมาณรถ เดือน {month}</Typography>
            <BarChart data={dataChart} />
          </Grid>
          <Grid
            component={Paper}
            item
            style={{
              width: "75%",
              marginRight: "auto",
              marginLeft: "auto",
              padding: "3rem",
              paddingTop: "1rem",
            }}
          >
            <Typography variant="h6">เลือกวันที่เพื่อดูข้อมูล</Typography>
            <FullCalendar
              className={classes.calendar}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              dateClick={handleClickDate}
              events={[]}
            />
          </Grid>
        </Grid>

        <Grid
          item
          lg={3}
          md={3}
          style={{ backgroundColor: "lightgray", height: "100vh" }}
        >
          <Typography variant="h6" align="center" style={{ marginTop: "1rem" }}>
            รายการเดือน
          </Typography>

          <div>
            {cardData.map((card) => (
              <Paper elevation={2} className={classes.card}>
                <Typography>{card.label}</Typography>
                <Divider
                  variant="middle"
                  style={{ marginTop: 10, marginBottom: 10 }}
                />
                <Typography>{card.value}</Typography>
              </Paper>
            ))}
          </div>

          <Paper elevation={2} className={classes.cardPopup}>
            <Typography>รายได้พึงได้รายวัน</Typography>
            <Divider variant="middle" />
            <Typography>
              C1 ({popUP.C1}):{popUP.c1SumAmount}
            </Typography>
            <Typography>
              {Math.round((popUP.C1 * 100) / popUP.c1SumAmount)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(popUP.C1 * 100) / popUP.c1SumAmount}
              className={classes.progress}
            />
            <Typography>
              C2 ({popUP.C2}):{popUP.c2SumAmount}
            </Typography>
            <Typography>
              {Math.round((popUP.C2 * 100) / popUP.c2SumAmount)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(popUP.C2 * 100) / popUP.c2SumAmount}
              className={classes.progress}
            />
            <Typography>
              C3 ({popUP.C3}):{popUP.c3SumAmount}
            </Typography>
            <Typography>
              {Math.round((popUP.C3 * 100) / popUP.c3SumAmount)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(popUP.C3 * 100) / popUP.c3SumAmount}
              className={classes.progress}
            />
            <Typography>รายได้รายวัน {popUP.reject}</Typography>
            <Typography>
              {Math.round((popUP.reject * 100) / popUP.countReject)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                popUP.countReject === 0
                  ? 0
                  : (popUP.reject * 100) / popUP.countReject
              }
              className={classes.progress}
            />
          </Paper>
          <div>{}</div>

          <div className={classes.btnContainer}>
            <Button variant="contained" color="primary" size="small">
              พิมพ์รายงาน
            </Button>
            <Button variant="contained" color="primary" size="small">
              ดูข้อมูลทั้งหมด
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
