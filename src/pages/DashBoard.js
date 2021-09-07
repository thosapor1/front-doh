import {
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Cookies from "js-cookie";
import LinearProgress from "@material-ui/core/LinearProgress";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import BarChart from "../components/BarChart";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import axios from "axios";

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V1}`,
});

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
      display: "flex",
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
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
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "green",
      },
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
  let event = [];

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
  const [eventCalendar, setEventCalendar] = useState({});
  const [cardData, setcardData] = useState([{}]);
  const [monthChart, setMonthChart] = useState("");
  const [dateCalendar, setDateCalendar] = useState(new Date());
  const [visible, setVisible] = useState("hidden");
  const dataChart = {
    labels: dayChart,
    datasets: [
      {
        label: "จำนวนรถ",
        data: valueChart,
        backgroundColor: ["rgba(153, 102, 255, 0.8)"],
        borderColor: ["rgb(153, 102, 255)"],
        borderWidth: 1,
      },
    ],
  };
  const handleClickDate = async (date) => {
    // console.log(date.dateStr);
    setVisible("visible");
    const res = await apiURL.post("/dashboard-listview", {
      date: date.dateStr,
    });
    setPopUP(res.data);
    console.log(res.data);
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
  };

  const getPopUpData = (dataInMonth) => {
    let data = [
      {
        label: "จำนวนรายการทั้งหมดของวัน",
        value: dataInMonth.st_total,
        color: "gary",
      },
      {
        label: "จำนวนรายการตรวจสอบ",
        value: dataInMonth.st_wait,
        color: "red",
      },

      {
        label: "จำนวนรายการตรวจสอบแก้ไขแล้ว",
        value: dataInMonth.st_edited,
        color: "orange",
      },

      {
        label: "จำนวนรายการตรวจสอบเสร็จสิ้น",
        value: dataInMonth.st_finish,
        color: "green",
      },
    ];

    setcardData(data);
    console.log(cardData);
  };

  const getChartData = (dataInMonth) => {
    if (!!dataInMonth) {
      dataInMonth.map((data) => {
        dateArray.push(data.date.slice(-2));
        valueArray.push(data.ts_count_all);
      });
    }
    setDayChart(dateArray);
    setValueChart(valueArray);
  };

  const getDataCalendar = (dataInMonth) => {
    if (!!dataInMonth) {
      dataInMonth.map((data) => {
        let temp = {
          title: data.ts_red,
          start: data.date,
          display: "list-item",
          backgroundColor: "rgb(200,0,0)",
        };
        event.push(temp);

        temp = {
          title: data.ts_green,
          start: data.date,
          display: "list-item",
          backgroundColor: "rgb(0,200,0)",
        };
        event.push(temp);

        temp = {
          title: data.ts_yellow,
          start: data.date,
          display: "list-item",
          backgroundColor: "rgb(200,200,0)",
        };
        event.push(temp);

        temp = {
          title: data.ts_gray,
          start: data.date,
          display: "list-item",
          backgroundColor: "rgb(200,200,200)",
        };
        event.push(temp);
      });
    }
    setEventCalendar(event);
  };

  const fetchData = (month = new Date()) => {
    apiURL.post("/dashboard-month", { dateTime: month }).then((res) => {
      const allData = res.data;
      const dataInMonth = res.data.month;
      console.log(dataInMonth);
      getChartData(dataInMonth);
      getDataCalendar(dataInMonth);
      getPopUpData(allData);
    });
    // console.log(dateCalendar);
  };

  useEffect(() => {
    fetchData();
    setMonthChart(format(dateCalendar, "MMMM yyyy", { locale: th }));
  }, []);

  const calendarRef = React.createRef();

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container>
        <Grid item lg={12} md={12} style={{ marginBottom: 10 }}>
          <Typography variant="h6">ข้อมูลประจำเดือน{monthChart} </Typography>
        </Grid>
        <Grid item lg={9} md={9}>
          <Grid
            component={Paper}
            item
            style={{
              height: "200px",
              width: "90%",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: 20,
              padding: "3rem",
              paddingTop: "1rem",
            }}
          >
            <Typography variant="h6">ข้อมูลปริมาณรถ</Typography>
            <BarChart data={dataChart} />
          </Grid>
          <Grid
            component={Paper}
            item
            style={{
              width: "90%",
              marginRight: "auto",
              marginLeft: "auto",
              padding: "3rem",
              paddingTop: "1rem",
            }}
          >
            <Typography variant="h6">เลือกวันที่เพื่อดูข้อมูล</Typography>
            <FullCalendar
              ref={calendarRef}
              customButtons={{
                custom1: {
                  text: "<",
                  click: function () {
                    let calendarApi = calendarRef.current.getApi();
                    let date = calendarApi.getDate();
                    date = date.setMonth(date.getMonth() - 1);
                    const sendData = format(date, "yyyy-MM-dd");
                    // console.log(sendData);
                    fetchData(sendData);
                    setMonthChart(
                      format(date, "MMMM yyyy", {
                        locale: th,
                      })
                    );
                    calendarApi.prev();
                  },
                },
                custom2: {
                  text: ">",
                  click: function () {
                    let calendarApi = calendarRef.current.getApi();
                    let date = calendarApi.getDate();
                    date = date.setMonth(date.getMonth() + 1);
                    const sendData = format(date, "yyyy-MM-dd");
                    // console.log(sendData);
                    fetchData(sendData);
                    setMonthChart(
                      format(date, "MMMM yyyy", {
                        locale: th,
                      })
                    );
                    calendarApi.next();
                  },
                },
                custom3: {
                  text: "today",
                  click: function () {
                    let calendarApi = calendarRef.current.getApi();
                    let date = new Date();
                    // date = date.setMonth(date.getMonth() + 1);
                    const sendData = format(date, "yyyy-MM-dd");
                    // console.log(sendData);
                    fetchData(sendData);
                    setMonthChart(
                      format(date, "MMMM yyyy", {
                        locale: th,
                      })
                    );
                    calendarApi.today();
                  },
                },
              }}
              headerToolbar={{
                left: "",
                center: "",
                right: "custom1,custom2 custom3",
              }}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              dateClick={handleClickDate}
              events={eventCalendar}
              height="550px"
            />
          </Grid>
        </Grid>

        <Grid
          component={Paper}
          item
          lg={3}
          md={3}
          style={{ backgroundColor: "#75338c" }}
        >
          <Typography
            variant="h6"
            align="center"
            style={{ marginTop: "1rem", color: "white" }}
          >
            รายการ
          </Typography>

          <div>
            {!!cardData
              ? cardData.map((card) => (
                  <Paper elevation={2} className={classes.card}>
                    <Typography>{card.label}</Typography>
                    <Divider
                      variant="middle"
                      style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <Typography
                      style={{ color: card.color }}
                      variant="subtitle2"
                    >
                      {card.value}
                    </Typography>
                  </Paper>
                ))
              : [{}]}
          </div>

          <Paper
            elevation={2}
            className={classes.cardPopup}
            style={{ visibility: visible }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Typography variant="subtitle2" style={{ fontSize: "1rem" }}>
                รายได้พึงได้รายวัน
              </Typography>
              <Typography variant="subtitle2" style={{ fontSize: "1rem" }}>
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
              <Typography>{popUP.percentC1}%</Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={popUP.percentC1}
              className={classes.progress}
            />

            <div className={classes.inPopup}>
              <Typography>
                C2 ({popUP.C2}) : {popUP.c2SumAmount}
              </Typography>
              <Typography>{popUP.percentC2}%</Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={popUP.percentC2}
                className={classes.progress}
              />
            </div>

            <div className={classes.inPopup}>
              <Typography>
                C3 ({popUP.C3}) : {popUP.c3SumAmount}
              </Typography>
              <Typography>{popUP.percentC3}%</Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={popUP.percentC3}
                className={classes.progress}
              />
            </div>

            <div className={classes.inPopup}>
              <Typography>รายได้รายวัน : {popUP.reject}</Typography>
              <Typography>{popUP.percentReject}%</Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={popUP.percentReject}
                className={classes.progress}
              />
            </div>
          </Paper>
          <div>{}</div>

          {/* <div className={classes.btnContainer}>
            <Button variant="contained" color="primary" size="small">
              พิมพ์รายงาน
            </Button>
            <Button variant="contained" color="primary" size="small">
              ดูข้อมูลทั้งหมด
            </Button>
          </div> */}
        </Grid>
      </Grid>
    </Container>
  );
}
