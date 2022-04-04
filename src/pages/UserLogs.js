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
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserLogsTAble from "../components/UserLogsTable";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import Swal from "sweetalert2";
import { StyledButtonInformation } from "../styledComponent/StyledButton";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

const useStyles = makeStyles((theme) => {
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
      backgroundColor: "rgba(235,176,129,0.15)",
      paddingTop: 20,
    },
    filterSection: {
      padding: theme.spacing(1),
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    input: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 40,
      },
      width: 160,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 160,
      },
    },
  };
});

export default function UserLogs() {
  const classes = useStyles();

  const [dropDrawUser, setDropDrawUser] = useState([]);
  const [dropDrawEvent, setDropDrawEvent] = useState([]);
  const [username, setUserName] = useState("0");
  const [event, setEvent] = useState("0");
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );

  const [page, setPage] = useState(1);
  const [dataForTable, setDataForTable] = useState([]);

  const handlePageChange = (event, value) => {
    fetchData(value);
  };

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

    const startDate = format(selectedDateStart, "yyyy-MM-dd");
    const timeStart = format(selectedTimeStart, "HH:mm:ss");
    const timeEnd = format(selectedTimeEnd, "HH:mm:ss");

    const sendData = {
      page: pageId,
      date: startDate,
      user_id: username.toString(),
      events: event.toString(),
      startTime: timeStart,
      endTime: timeEnd,
    };
    console.log("sendData", sendData);

    apiURL.post("/datalogging", sendData).then((res) => {
      Swal.close();
      console.log("res: ", res.data);
      setDataForTable(res.data);
      setDropDrawUser(res.data.dropdownUserId);
      setDropDrawEvent(res.data.dropdownEvents);
    });
    //   .then((res) => setDataForTable(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography
        variant="h6"
        style={{ marginBottom: "1rem", fontSize: "0.9rem" }}
      >
        ตั้งค่า : รายงานความเคลื่อนไหวผู้ใช้งาน
      </Typography>
      <Grid
        container
        component={Paper}
        maxWidth="xl"
        className={classes.filterSection}
      >
        <TextField
          select
          variant="outlined"
          className={classes.input}
          label="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
        >
          {!!dropDrawUser
            ? dropDrawUser.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.username}
                </MenuItem>
              ))
            : []}
        </TextField>

        <TextField
          select
          variant="outlined"
          className={classes.input}
          label="สถานะ"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          name="status_select"
        >
          {!!dropDrawEvent
            ? dropDrawEvent.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.events_name}
                </MenuItem>
              ))
            : []}
        </TextField>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.input}
            disableToolbar
            variant="inlined"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="startDate"
            label="วันที่เริ่มต้น"
            value={selectedDateStart}
            onChange={(date) => setSelectedDateStart(date)}
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

        <StyledButtonInformation
          onClick={() => {
            fetchData(1);
          }}
        >
          ดูข้อมูล
        </StyledButtonInformation>
      </Grid>

      <Paper style={{ marginTop: "1rem" }}>
        <UserLogsTAble
          dataList={dataForTable}
          page={page}
          onChange={handlePageChange}
        />
      </Paper>
    </Container>
  );
}
