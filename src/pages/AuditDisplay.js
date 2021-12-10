import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
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
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import AllTsTableForActivity from "../components/AllTsTableForActivity";
import Swal from "sweetalert2";
import FilterListIcon from "@material-ui/icons/FilterList";
import ClassTable2 from "../components/ClassTable2";
import AllTsTableForActivity2 from "../components/AllTsTableForActivity2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
});
const apiURLv1 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },
    cardSection: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10,
      columnGap: 10,
    },
    gateAndClassSection: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    allTsTable: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    gateTable: {},
    classTable: {
      paddingLeft: 10,
      [theme.breakpoints.down("md")]: {
        padding: 0,
        marginTop: 20,
      },
    },
    card: {
      width: "100%",
      height: 100,
      display: "flex",
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    btn2: {
      backgroundColor: "green",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "darkgreen",
      },
    },
    input: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
    },
    filterSection: {
      padding: theme.spacing(1),
      marginTop: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    searchButton: {
      textAlign: "right",
      [theme.breakpoints.down("md")]: {},
    },
    input1: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 40,
      },
      "& .MuiInputLabel-outlined": {
        // transform: 'translate(14px, 14px) scale(1)',
        // paddingBottom: 20,
        fontSize: "0.8rem",
      },
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
    },
  };
});

export default function AuditDisplay() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [gateTable, setGateTable] = useState([]);
  const [classTable, setClassTable] = useState([]);
  const [allTsTable, setAllTsTable] = useState([]);
  const [summary, setSummary] = useState([]);
  const [checkpoint, setCheckpoint] = useState("");
  const [station, setStation] = useState(0);
  const [dropdown, setDropdown] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date("Sep 01, 2021")
  // );
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );

  const handlePageChange = (event, value) => {
    fetchData(value);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dataCard = [
    {
      value: !!summary.total ? summary.total : 0,
      status: "total",
      label: "รายการทั้งหมด",
    },
    {
      value: !!summary.normal ? summary.normal : 0,
      status: "normal",
      label: "ชำระปกติ",
    },
    {
      value: !!summary.unMatch ? summary.unMatch : 0,
      status: "unMatch",
      label: "ชำระล่าช้า 2-32 วัน",
    },
    {
      value: !!summary.miss ? summary.miss : 0,
      status: "miss",
      label: "ชำระโดยผู้รับจ้าง(มากกว่า32วัน)",
    },
  ];

  const getDropdown = () => {
    apiURLv1.post("/dropdown").then((res) => {
      console.log(res.data);
      setDropdown(res.data);
    });
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

    apiURL
      .post("/display", sendData)
      .then((res) => {
        Swal.close();
        setAllTsTable({
          summary: {
            total: 0,
            normal: 0,
            unMatch: 0,
            miss: 0,
          },
          ts_table: [],
        });
        console.log(
          "res: ",
          res.data,
          "tsClass:",
          res.data.ts_class,
          "tsGate: ",
          res.data.ts_gate_table,
          "ts_Table:",
          res.data.ts_table,
          "Summary: ",
          res.data.summary
        );
        setSummary(res.data.status !== false ? res.data.summary : []);
        setGateTable(res.data.status !== false ? res.data.ts_gate_table : []);
        setClassTable(res.data.status !== false ? res.data.ts_class : []);
        setAllTsTable(res.data.status !== false ? res.data : []);
      })
      .catch((error) => {
        // handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  const refresh = (pageId = 1) => {
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

    setSelectedDate(new Date().setDate(new Date().getDate() - 1));
    setCheckpoint(0);
    setSelectedTimeStart(new Date("Aug 10, 2021 00:00:00"));
    setSelectedTimeEnd(new Date("Aug 10, 2021 00:00:00"));
    const timeStart = "00:00:00";
    const timeEnd = "00:00:00";
    const date = format(
      new Date().setDate(new Date().getDate() - 1),
      "yyyy-MM-dd"
    );

    const sendData = {
      page: pageId,
      checkpoint_id: "0",
      datetime: date,
      startTime: timeStart,
      endTime: timeEnd,
      transactionStatus: "0",
    };
    console.log(sendData);

    apiURL.post("/display", sendData).then((res) => {
      Swal.close();
      setAllTsTable({
        summary: {
          total: 0,
          normal: 0,
          unMatch: 0,
          miss: 0,
        },
        ts_table: [],
      });
      console.log(
        "res: ",
        res.data,
        "tsClass:",
        res.data.ts_class,
        "tsGate: ",
        res.data.ts_gate_table,
        "ts_Table:",
        res.data.ts_table,
        "Summary: ",
        res.data.summary
      );
      setSummary(res.data.status !== false ? res.data.summary : []);
      setGateTable(res.data.status !== false ? res.data.ts_gate_table : []);
      setClassTable(res.data.status !== false ? res.data.ts_class : []);
      setAllTsTable(res.data.status !== false ? res.data : []);
    });
  };

  useEffect(() => {
    // fetchData();
    getDropdown();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          ตรวจสอบ (DOH) : รายได้พึงได้รายวัน
        </Typography>

        {/* Filter Section */}
        <Grid container component={Paper} className={classes.filterSection}>
          <Box>
            <TextField
              select
              variant="outlined"
              label="ด่าน"
              className={classes.input1}
              onChange={(event) => setStation(event.target.value)}
              name="station"
              value={station}
            >
              {!!dropdown.checkpoint
                ? dropdown.checkpoint.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.checkpoint_name}
                    </MenuItem>
                  ))
                : []}
            </TextField>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.input1}
                style={{ width: 170 }}
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                // minDate={selectedDate}
                id="date"
                label="วันที่เข้าด่าน"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>

            <Button
              className={classes.btn}
              color="primary"
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={() => {
                fetchData(1);
              }}
            >
              กรองข้อมูล
            </Button>
          </Box>
          <Box>
            <Button
              className={classes.btn}
              variant="contained"
              style={{ backgroundColor: "#ec407a" }}
            >
              พิมพ์รายงาน
            </Button>
          </Box>
        </Grid>

        {/* Card Section */}
        <div className={classes.cardSection}>
          {dataCard.map((card, index) => (
            <Paper
              key={index}
              className={classes.card}
              style={{
                borderLeft:
                  card.status === "total"
                    ? "3px solid gray"
                    : card.status === "normal"
                    ? "3px solid green"
                    : card.status === "unMatch"
                    ? "3px solid orange"
                    : "3px solid red",
              }}
            >
              <Grid container justifyContent="space-around" alignItems="center">
                <Grid item>
                  <Typography
                    style={{
                      color:
                        card.status === "total"
                          ? "gray"
                          : card.status === "normal"
                          ? "green"
                          : card.status === "unMatch"
                          ? "orange"
                          : "red",
                      fontSize: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    {card.label}
                  </Typography>
                  <Typography style={{ fontSize: "1rem" }}>
                    {`${card.value} บาท`}
                  </Typography>
                </Grid>
                <Grid>
                  <DescriptionTwoToneIcon />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>

        {/* Table Section */}
        <Grid
          container
          component={Paper}
          className={classes.gateAndClassSection}
        >
          {/* <Grid item md={12} sm={12} lg={5} className={classes.gateTable}>
            <GateTable dataList={gateTable} />
          </Grid> */}
          <Grid item md={12} sm={12} lg={5} className={classes.classTable}>
            <ClassTable2 dataList={classTable} />
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
          <AllTsTableForActivity2
            dataList={allTsTable}
            page={page}
            onChange={handlePageChange}
            onFetchData={fetchData}
          />
        </Grid>
      </Container>
    </>
  );
}
