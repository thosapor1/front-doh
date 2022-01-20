import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import axios from "axios";
import Swal from "sweetalert2";
import TableDataVolume from "../components/TableDataVolume";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
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

    card: {
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 8,
      textAlign: "center",
      borderRadius: 10,
      [theme.breakpoints.only["md"]]: {
        padding: 100,
      },
    },
    cardPopup: {
      width: "65%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      height: "30vh",
      borderRadius: 10,
      display: "sticky",
      padding: 20,
      fontSize: "0.8rem",
      [theme.breakpoints.down("md")]: {
        marginBottom: 10,
        width: "45%",
      },
    },
    cardContainer: {
      [theme.breakpoints.down("md")]: {
        justifyContent: "space-evenly",
      },
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
      "& .fc": {
        fontFamily: "Prompt",
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
    orderList: {
      backgroundColor: "#75338c",
      marginBottom: 10,
      [theme.breakpoints.down("md")]: {},
    },
    filterSection: {
      padding: theme.spacing(1),
      paddingLeft: "35%",
      marginBottom: 10,
      [theme.breakpoints.only("sm")]: {
        paddingLeft: "27%",
      },
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    tableSection: {},
    textField: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiOutlinedInput-input": {
        padding: "12px 14px",
      },
      // width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        // width: 150,
      },
    },
  };
});

export default function DataVolume() {
  const classes = useStyle();

  // const [monthChart, setMonthChart] = useState("");
  const [dateCalendar, setDateCalendar] = useState(new Date());
  const [dataTable, setDataTable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );

  const fetchData = (month = format(new Date(), "yyyy-MM")) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    month = format(selectedDate, "yyyy-MM");
    const sendData = { date: month };
    apiURL
      .post("/data-monitor", sendData)
      .then((res) => {
        Swal.close();
        const allData = res;
        setDataTable(allData);
      })
      .catch((error) => {
        // handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  useEffect(() => {
    fetchData();
    // setMonthChart(format(dateCalendar, "MMMM yyyy", { locale: th }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12}>
          <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
            ปริมาณข้อมูลประจำเดือน
            {format(selectedDate, "MMMM yyyy", { locale: th })}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <Grid item component={Paper} className={classes.filterSection}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                className={classes.textField}
                disableToolbar
                views={["year", "month"]}
                variant="inlined"
                format="MM/yyyy"
                margin="normal"
                id="date"
                label="เดือน"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <Button className={classes.btn} onClick={() => fetchData()}>
              ดูข้อมูล
            </Button>
          </Grid>
          <Grid
            component={Paper}
            item
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              padding: "1rem",
              marginBottom: 10,
            }}
          >
            <TableDataVolume dataList={dataTable} onFetchData={fetchData} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
