import {
  Button,
  Container,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserLogsTAble from "../components/UserLogsTable";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V1}`,
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
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },
    filterSection: {
      display: "flex",
      padding: theme.spacing(2),
      width: "auto",
      marginTop: 10,
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      width: 150,
      height: 40,
      marginTop: 23,
      marginLeft: 30,
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
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());

  const [page, setPage] = useState(1);
  const [dataForTable, setDataForTable] = useState([]);

  const handlePageChange = (value) => {
    fetchData(value);
  };

  const fetchData = (pageId = 1) => {
    if (pageId == 1) {
      setPage(1);
    } else {
      setPage(pageId);
    }

    const startDate = format(selectedDateStart, "yyyy-MM-dd");
    const endDate = format(selectedDateEnd, "yyyy-MM-dd");

    const sendData = {
      page: pageId,
      //   user_id: "0",
      //   eventSelect: "0",
      user_id: username,
      eventSelect: event,
      //   startDate: "2021-09-01",
      //   endDate: "2021-10-01",
      startDate: startDate,
      endDate: endDate,
    };
    console.log("sendData", sendData);

    apiURL.post("/datalogging", sendData).then((res) => {
      console.log("res: ", res.data);
      setDataForTable(res.data);
      setDropDrawUser(res.data.dropdownUserId);
      setDropDrawEvent(res.data.dropdownEvents);
    });
    //   .then((res) => setDataForTable(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant='h6' style={{marginBottom:'1rem'}}>ตั้งค่า : รายงานความเคลื่อนไหวผู้ใช้งาน</Typography>
      <Paper className={classes.filterSection}>
        <TextField
          select
          label="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          style={{ width: 120, marginTop: 16 }}
          name="gate_select"
        >
          {!!dropDrawUser?
           dropDrawUser.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.username}
            </MenuItem>
          )):[]}
        </TextField>

        <TextField
          select
          label="สถานะ"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          style={{ width: 120, marginTop: 16, marginLeft: 30 }}
          name="status_select"
        >
          {!!dropDrawEvent?
          dropDrawEvent.map((item) => (
            <MenuItem key={item.value} value={item.id}>
              {item.events_name}
            </MenuItem>
          )):[]}
        </TextField>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: 170, marginLeft: 30 }}
            disableToolbar
            variant="inlined"
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
          <KeyboardDatePicker
            style={{ width: 170, marginLeft: 30 }}
            disableToolbar
            variant="inlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="endDate"
            label="วันที่สิ้นสุด"
            value={selectedDateEnd}
            onChange={(date) => setSelectedDateEnd(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <Button
          variant="contained"
          className={classes.btn}
          onClick={() => {
            fetchData(1);
          }}
        >
          ดูข้อมูล
        </Button>
      </Paper>

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
