import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import { KeyboardTimePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";

import AllTsTable from "../components/AllTsTable";
import axios from "axios";
import { format } from "date-fns";

const apiURL = axios.create({
  baseURL: "http://202.183.167.119:3015/audit/api/v2",
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
    cardSection: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10,
    },
    gateAndClassSection: {
      marginTop: 10,
      height: 300,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    allTsTable: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    card: {
      width: 290,
      height: 90,
      display: "flex",
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      width: "auto",
      height: 26,
      marginTop: 37,
      marginLeft: 30,
    },
  };
});

const valueOption = [
  {
    id: 0,
    value: 0,
    label: "ทุกด่าน",
  },
  {
    id: 1,
    value: 1,
    label: "ทับช้าง1",
  },
  {
    id: 2,
    value: 2,
    label: "ทับช้าง2",
  },
  {
    id: 3,
    value: 3,
    label: "ธัญบุรี1",
  },
  {
    id: 4,
    value: 4,
    label: "ธัญบุรี2",
  },
];

const valueStatus = [
  {
    id: "1",
    value: "1",
    label: "ปกติ",
  },
  {
    id: "2",
    value: "2",
    label: "ข้อมูลไม่ตรงกัน",
  },
  {
    id: "3",
    value: "3",
    label: "ข้อมูลสูญหาย",
  },
];

export default function AuditDisplay() {
  const [allTsTable, setAllTsTable] = useState("");
  const [summary, setSummary] = useState("");
  const [status_select, setStatus_select] = useState(null);
  const [checkpoint, setCheckpoint] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );
  const [page, setPage] = useState(1);

  const dataCard = [
    // {
    //   value: summary.ts_total,
    //   status: "ts_total",
    //   label: "จำนวนรายการทั้งหมดของวัน",
    // },
    // {
    //   value: summary.ts_normal,
    //   status: "ts_normal",
    //   label: "จำนวนรายการปกติ",
    // },
    {
      value: summary.ts_not_normal,
      status: "ts_not_normal",
      label: "จำนวนรายการตรวจสอบ",
    },
    // {
    //   value: summary.revenue,
    //   status: "revenue",
    //   label: "รายได้พึงได้รายวัน",
    // },
  ];

  const handlePageChange = (value) => {
    fetchData(value);
  };

  // const handleFilter = () => {
  //   const date = format(selectedDate, "yyyy-MM-dd");
  //   const timeStart = format(selectedTimeStart, "HH:mm:ss");
  //   const timeEnd = format(selectedTimeEnd, "HH:mm:ss");

  //   setPage(1);
  //   console.log(
  //     "gate_select: ",
  //     checkpoint,
  //     "status_select: ",
  //     selectedDate.toDateString(),
  //     "selectedTimeStart: ",
  //     selectedTimeStart,
  //     "selectedTimeEnd: ",
  //     selectedTimeEnd
  //   );
  //   const sendData = {
  //     page: page,
  //     checkpoint_id: checkpoint,
  //     datetime: date,
  //     startTime: timeStart,
  //     endTime: timeEnd,
  //   };
  //   console.log(sendData);
  //   apiURL.post("/pk3display", sendData).then((res) => {
  //     console.log(
  //       "res: ",
  //       res.data,
  //       "ts_Table:",
  //       res.data.ts_table,
  //       "Summary: ",
  //       res.data.summary
  //     );
  //     setSummary(res.data.summary);
  //     setAllTsTable(res.data.ts_table);
  //   });
  // };

  const fetchData = (pageId = 1) => {
    console.log(pageId)
    if (pageId == 1) {
      setPage(1);
    } else {
      setPage(pageId);
    }

    const date = format(selectedDate, "yyyy-MM-dd");
    const timeStart = format(selectedTimeStart, "HH:mm:ss");
    const timeEnd = format(selectedTimeEnd, "HH:mm:ss");

    const sendData = {
      page: pageId,
      checkpoint_id: checkpoint,
      datetime: date,
      startTime: timeStart,
      endTime: timeEnd,
    };
    console.log(sendData);
    apiURL.post("/pk3display", sendData).then((res) => {
      console.log(
        "res: ",
        res.data,
        "ts_Table:",
        res.data.ts_table,
        "Summary: ",
        res.data.summary
      );
      setSummary(res.data.summary);
      setAllTsTable(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h6">รายการรอการตรวจสอบ</Typography>

      {/* Filter Section */}
      <Paper className={classes.filterSection}>
        <TextField
          select
          label="ด่าน"
          value={checkpoint}
          onChange={(e) => setCheckpoint(e.target.value)}
          style={{ width: 120, marginTop: 16 }}
          name="gate_select"
        >
          {valueOption.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </TextField>

        <TextField
          select
          label="สถานะ"
          value={status_select}
          onChange={(e) => setStatus_select(e.target.value)}
          style={{ width: 120, marginTop: 16, marginLeft: 30 }}
          name="status_select"
          disabled
        >
          {valueStatus.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </TextField>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: 170, marginLeft: 30 }}
            disableToolbar
            variant="inlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="date"
            label="วันที่เข้าด่าน"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={false}
            id="startTime"
            variant="inline"
            label="เวลาเริ่มต้น"
            openTo="hours"
            views={["hours", "minutes", "seconds"]}
            format="HH:mm:ss"
            value={selectedTimeStart}
            onChange={(date) => setSelectedTimeStart(date)}
            style={{ width: 170, marginLeft: 30, marginTop: 16 }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={false}
            id="endTime"
            variant="inline"
            label="เวลาสิ้นสุด"
            openTo="hours"
            views={["hours", "minutes", "seconds"]}
            format="HH:mm:ss"
            value={selectedTimeEnd}
            onChange={(date) => setSelectedTimeEnd(date)}
            style={{ width: 170, marginLeft: 30, marginTop: 16 }}
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

      {/* Card Section */}
      <div className={classes.cardSection}>
        {!!dataCard
          ? dataCard.map((card) => (
              <Paper
                className={classes.card}
                style={{
                  borderLeft:
                    card.status === "ts_total"
                      ? "3px solid gray"
                      : card.status === "ts_normal"
                      ? "3px solid gray"
                      : card.status === "ts_not_normal"
                      ? "3px solid orange"
                      : "3px solid green",
                }}
              >
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      style={{
                        color:
                          card.status === "ts_total"
                            ? "gray"
                            : card.status === "ts_normal"
                            ? "gray"
                            : card.status === "ts_not_normal"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {card.label}
                    </Typography>
                    <Typography>
                      {card.value}{" "}
                      {card.status === "revenue" ? "บาท" : "รายการ"}
                    </Typography>
                  </Grid>
                  <Grid>
                    <DescriptionTwoToneIcon />
                  </Grid>
                </Grid>
              </Paper>
            ))
          : dataCard}
      </div>

      {/* Table Section */}

      <div className={classes.allTsTable}>
        <AllTsTable
          dataList={allTsTable}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </Container>
  );
}
