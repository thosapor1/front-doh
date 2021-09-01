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
      width: "70%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      height: "30vh",
      borderRadius: 10,
      display: "sticky",
      padding: 20,
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
      marginBottom: "1rem",
    },
    inPopup: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem",
    },
  };
});

export default function DashBoard() {
  let dateArray = [];
  let valueArray = [];
  let event = []
  let cardData = [{}];
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
  const [dayChart, setDayChart] = useState([]);
  const [valueChart, setValueChart] = useState([]);
  const [eventCalendar, setEventCalendar] = useState({})
  const [st_total, setSt_total] = useState();
  const [st_wait, setSt_wait] = useState(0);
  const [st_edited, setSt_edited] = useState(0);
  const [st_finish, setSt_finish] = useState(0);
  const [state, setState] = useState({});
  const [month, setMonth] = useState("");

  const dataChart = {
    labels: dayChart,
    datasets: [
      {
        label: "จำนวนรถ",
        data: valueChart,
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgb(153, 102, 255)"],
        borderWidth: 1,
      },
    ],
  };
  const handleClickDate = async (date) => {
    const res = await apiURL.post("/dashboard-listview", {
      date: date.dateStr,
    });
    setPopUP(res.data);

    return [
      {
        label: "C1",
        value: popUP.C1,
        sumValue: popUP.c1SumAmount,
      },
      {
        label: "C2",
        value: popUP.C2,
        sumValue: popUP.c2SumAmount,
      },
      {
        label: "C3",
        value: popUP.C3,
        sumValue: popUP.c3SumAmount,
      },
      {
        label: "รายได้รายวัน",
        value: popUP.reject,
        sumValue: popUP.countReject,
      },
    ];

    // console.log(res.data);
  };

  const dataForCalendar = () => {};

  // const fetchData = () => {

  // };

  useEffect(() => {
    // fetchData();
    const dateCalendar = format(new Date(), "yyyy-MM-dd");
    const sendData = {dateTime: dateCalendar} ;
    apiURL.post("/dashboard-month",  sendData).then((res) => {
      setSt_total(res.data.st_total);
      setSt_edited(res.data.st_edited);
      setSt_wait(res.data.st_wait);
      setSt_finish(res.data.st_finish);

      const dataInMonth = res.data.month;
      const chartData = () => {
        dataInMonth.map((data) => {
          dateArray.push(data.date.slice(-2));
          valueArray.push(data.ts_count_all);
        });
        setDayChart(dateArray);
        setValueChart(valueArray);
      };

      const eventCalendar = () => {
        dataInMonth.map((data)=>{
          var temp =  {
            title: data.ts_red,
            start: data.date,
            display : 'list-item',
            backgroundColor : 'rgb(200,0,0)'
           };
        
          event.push(temp);
        
          var temp =  {
            title: data.ts_green,
            start: data.date,
            display : 'list-item',
            backgroundColor : 'rgb(0,200,0)'
           };
        
          event.push(temp);
        
           var temp =  {
            title: data.ts_yellow,
            start: data.date,
            display : 'list-item',
            backgroundColor : 'rgb(200,200,0)'
           };
        
          event.push(temp);
        
        
           var temp =  {
            title: data.ts_gray,
            start: data.date,
            display : 'list-item',
            backgroundColor : 'rgb(200,200,200)'
           };
        
          event.push(temp);
        })
        setEventCalendar(event)
      };
      chartData();
      eventCalendar()
    });
    // .then(() => {
    //   console.log(st_total);
    // });
    setMonth(format(new Date(), "MMMM yyyy", { locale: th }));
    let cardData = [
      { label: "จำนวนรายการทั้งหมดของวัน", value: st_total },
      { label: "จำนวนรายการตรวจสอบ", value: st_wait },
      { label: "จำนวนรายการตรวจสอบแก้ไขแล้ว", value: st_edited },
      { label: "จำนวนรายการตรวจสอบเสร็จสิ้น", value: st_finish },
    ];
    return cardData;
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
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              dateClick={handleClickDate}
              events={eventCalendar}
            />
          </Grid>
        </Grid>

        <Grid item lg={3} md={3} style={{ backgroundColor: "lightgray" }}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Typography>รายได้พึงได้รายวัน</Typography>
              <Typography variant="subtitle2">
                {popUP.sumAmountallClass}
              </Typography>
            </div>
            <div>
              <Divider
                variant="middle"
                style={{ marginTop: 10, marginBottom: "1rem" }}
              />
            </div>

            <div className={classes.inPopup}>
              <Typography>
                C1 ({popUP.C1}) : {popUP.c1SumAmount}
              </Typography>
              <Typography>
                {Math.round((popUP.C1 * 100) / popUP.c1SumAmount)}%
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={(popUP.C1 * 100) / popUP.c1SumAmount}
              className={classes.progress}
            />

            <div className={classes.inPopup}>
              <Typography>
                C2 ({popUP.C2}) : {popUP.c2SumAmount}
              </Typography>
              <Typography>
                {Math.round((popUP.C2 * 100) / popUP.c2SumAmount)}%
              </Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={(popUP.C2 * 100) / popUP.c2SumAmount}
                className={classes.progress}
              />
            </div>

            <div className={classes.inPopup}>
              <Typography>
                C3 ({popUP.C3}) : {popUP.c3SumAmount}
              </Typography>
              <Typography>
                {Math.round((popUP.C3 * 100) / popUP.c3SumAmount)}%
              </Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={(popUP.C3 * 100) / popUP.c3SumAmount}
                className={classes.progress}
              />
            </div>

            <div className={classes.inPopup}>
              <Typography>รายได้รายวัน : {popUP.reject}</Typography>
              <Typography>
                {Math.round((popUP.reject * 100) / popUP.countReject)}%
              </Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={(popUP.reject * 100) / popUP.countReject}
                className={classes.progress}
              />
            </div>
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
