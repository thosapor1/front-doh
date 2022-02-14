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
import { format } from "date-fns";
import axios from "axios";
import Swal from "sweetalert2";
import TableDashBoard2 from "../components/TableDashBorad2";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getDataDashBoard } from "../service/allService";
import { StyledButtonInformation } from "../styledComponent/StyledButton.js";

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
      backgroundColor: "rgba(235,176,129,0.15)",
      paddingTop: 20,
    },

    filterSection: {
      padding: theme.spacing(1),
      paddingLeft: "35%",
      marginBottom: 10,
      [theme.breakpoints.only("sm")]: {
        paddingLeft: "27%",
      },
    },
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
      width: 200,
      margin: theme.spacing(1),
    },
  };
});

export default function DashBoard2() {
  let dateArray = [];
  let valueArray = [];

  const classes = useStyle();

  const [dataTable, setDataTable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );

  const getChartData = (dataInMonth) => {
    if (!!dataInMonth) {
      dataInMonth.map((data) => {
        if (!!data.date) dateArray.push(data.date.slice(-2));
        valueArray.push(data.ts_count_all);
        return console.log("success");
      });
    }
  };

  const fetchData = async (month = format(new Date(), "yyyy-MM")) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    month = format(selectedDate, "yyyy-MM");
    const sendData = { date: month };
    const res = await getDataDashBoard(sendData);
    if (!!res) {
      setDataTable(!!res ? res.data : []);
      getChartData(!!res ? res.data.month : []);
      // getPopUpData(!!res ? res.data : []);
    }

    if (!!res && res.data.status === false) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }
  };

  useEffect(() => {
    fetchData();
    console.log(new Date().toLocaleDateString("th-TH"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12}>
          <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
            ข้อมูลประจำเดือน
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
                // onClose={() => fetchData(format(selectedDate, "yyyy-MM"))}
              />
            </MuiPickersUtilsProvider>
            <StyledButtonInformation onClick={() => fetchData()}>
              ดูข้อมูล
            </StyledButtonInformation>
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
            <TableDashBoard2 dataList={dataTable} onFetchData={fetchData} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
