import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import SearchComponent2 from "../components/SearchComponent2";
import TablePk3CheckTrue from "../components/TablePk3CheckTrue";
import {
  StyledButtonInformation,
  StyledButtonRefresh,
} from "../styledComponent/StyledButton";
import SearchComponent from "../components/SearchComponent";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});
const apiURLv10 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V10}`
      : `${process.env.REACT_APP_BASE_URL_V10}`,
});

const useStyles = makeStyles((theme) => {
  return {
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
    cardSection: {
      display: "flex",
      margin: "10px 0px 0px 0px",
      justifyContent: "center",
      columnGap: 8,
    },
    gateAndClassSection: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    allTsTable: {
      padding: theme.spacing(1),
      backgroundColor: "white",
    },
    card: {
      padding: "1rem",
      height: 50,
      paddingTop: 5,
      width: "100%",
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
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
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
    typography: {
      fontSize: "0.8rem",
    },
  };
});

const valueStatus = [
  {
    id: 1,
    value: 3,
    label: "รอจัดเก็บตรวจสอบ",
  },
];

export default function PK3DataCheckTrue() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allTsTable, setAllTsTable] = useState([]);
  const [checkpoint, setCheckpoint] = useState("0");
  // const [status_select, setStatus_select] = useState("3");
  const [summary, setSummary] = useState([]);
  const [selectGate, setSelectGate] = useState("0");
  const [selectCarType, setSelectCarType] = useState("0");
  const [dropdown, setDropdown] = useState([]);
  // const [tsType, setTsType] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [eyesStatus, setEyesStatus] = useState([]);
  const [endpoint, setEndpoint] = useState("/search-transaction-hq");
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
  const getCheckpoint = (e) => {
    apiURL.post("/dropdown").then((res) => {
      console.log(res.data);
      setDropdown(res.data);
    });
  };

  const checkFormatSearch = (e) => {
    if (/^m/gi.test(e)) {
      setEndpoint("/search-transaction-match");
    } else if (/^t/gi.test(e)) {
      setEndpoint("/search-transaction-hq");
    } else if (/\d{6}/.test(e)) {
      setEndpoint("/search-transaction-audit");
    }
    console.log(endpoint);
  };

  const fetchData = async (pageId = 1) => {
    let eyes = [];
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

    // console.log(checkpoint);
    // console.log(selectGate);
    // console.log(selectCarType);
    // console.log(status_select);
    const sendData = {
      page: pageId.toString(),
      checkpoint_id: checkpoint,
      gate_id: selectGate,
      state: "0",
      vehicleClass: selectCarType,
      date: date,
      startTime: timeStart,
      endTime: timeEnd,
      status: "0",
    };
    // console.log(sendData);

    apiURL
      .post("/pk3-approve-display", sendData)
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
        console.log(res.data);
        console.log(
          "res: ",
          res.data,
          "ts_Table:",
          res.data.ts_table,
          "Summary: ",
          res.data.summary
        );

        setAllTsTable(res.data.status !== false ? res.data : []);
        setSummary(res.data.status !== false ? res.data.summary : []);
        if (!!res && !!res.data.resultsDisplay) {
          for (let i = 0; i <= res.data.resultsDisplay.length - 1; i++) {
            eyes.push({
              state: res.data.resultsDisplay[i].state,
              readFlag: res.data.resultsDisplay[i].pk3_readFlag,
              transactionId: res.data.resultsDisplay[i].transactionId,
            });
          }
          setEyesStatus(eyes);
        }
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
    // setStatus_select(0);
    setSelectedTimeStart(new Date("Aug 10, 2021 00:00:00"));
    setSelectedTimeEnd(new Date("Aug 10, 2021 00:00:00"));
    const timeStart = "00:00:00";
    const timeEnd = "00:00:00";
    const date = format(
      new Date().setDate(new Date().getDate() - 1),
      "yyyy-MM-dd"
    );

    const sendData = {
      page: pageId.toString(),
      checkpoint_id: "0",
      datetime: date,
      startTime: timeStart,
      endTime: timeEnd,
      state: "0",
    };

    apiURL
      .post("/display-pk3-activity", sendData)
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
        // console.log(
        //   "res: ",
        //   res.data,
        //   "tsClass:",
        //   res.data.ts_class,
        //   "tsGate: ",
        //   res.data.ts_gate_table,
        //   "ts_Table:",
        //   res.data.ts_table,
        //   "Summary: ",
        //   res.data.summary
        // );
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

  const dataCard = [
    {
      value: !!summary.ts_not_normal ? summary.ts_not_normal : "0",
      status: "checklist",
      label: "รายการตรวจสอบ",
    },
  ];

  useEffect(() => {
    // fetchData();
    getCheckpoint();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          รายการตรวจสอบแล้ว
        </Typography>

        {/* Filter Section */}
        <Grid container component={Paper} className={classes.filterSection}>
          <TextField
            select
            variant="outlined"
            label="ด่าน"
            value={checkpoint}
            onChange={(e) => setCheckpoint(e.target.value)}
            className={classes.input1}
            name="gate_select"
          >
            {!!dropdown.checkpoint
              ? dropdown.checkpoint.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.checkpoint_name}
                  </MenuItem>
                ))
              : []}
          </TextField>

          <TextField
            select
            variant="outlined"
            label="ช่อง"
            value={selectGate}
            onChange={(e) => setSelectGate(e.target.value)}
            className={classes.input1}
            name="gate"
          >
            {!!dropdown.gate
              ? dropdown.gate.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              : []}
          </TextField>

          <TextField
            select
            variant="outlined"
            label="ประเภทรถ"
            value={selectCarType}
            onChange={(e) => setSelectCarType(e.target.value)}
            className={classes.input1}
            name="carType"
          >
            {!!dropdown.vehicle
              ? dropdown.vehicle.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.class}
                  </MenuItem>
                ))
              : []}
          </TextField>

          {/* <TextField
            select
            variant="outlined"
            label="สถานะ"
            value={status_select}
            onChange={(e) => {
              setStatus_select(e.target.value);
            }}
            className={classes.input1}
            name="status_select"
          >
            {!!valueStatus
              ? valueStatus.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))
              : []}
          </TextField>

          <TextField
            select
            variant="outlined"
            label="ประเภทTS"
            value={tsType}
            onChange={(e) => {
              setTsType(e.target.value);
            }}
            className={classes.input1}
            name="tsType"
          >
            {!!dropdown.ts_status
              ? dropdown.ts_status
                  .filter(
                    (item) => item.id === 0 || item.id === 2 || item.id === 3
                  )
                  .map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
              : []}
          </TextField> */}

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.input}
              disableToolbar
              variant="inlined"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
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

          <StyledButtonInformation onClick={() => fetchData(1)}>
            ดูข้อมูล
          </StyledButtonInformation>
          <StyledButtonRefresh onClick={() => refresh(1)}>
            refresh
          </StyledButtonRefresh>
        </Grid>

        {/* Card Section */}

        <Box
          style={{
            display: "flex",
            margin: "10px 0px 0px 0px",
            justifyContent: "center",
          }}
        >
          <Box style={{ marginRight: "0.8rem" }}>
            <SearchComponent
              value={transactionId}
              date={selectedDate}
              handleOnChange={(e) => {
                setTransactionId(e.target.value);
                checkFormatSearch(e.target.value);
                // console.log(e.target.value);
              }}
              name="search"
              label="transaction id"
              setTable={setAllTsTable}
              endpoint={endpoint}
              setEyesStatus={setEyesStatus}
              eyesStatus={eyesStatus}
            />
          </Box>

          <Box
            style={{
              display: "flex",
              // margin: "10px 0px 0px 0px",
              justifyContent: "space-between",
            }}
          >
            {dataCard.map((card, index) => (
              <Paper
                className={classes.card}
                key={index}
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
                    fontSize: "0.9rem",
                  }}
                >
                  {card.label}
                </Typography>
                <Typography
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {!!card.value ? card.value.toLocaleString() : []}
                </Typography>
                <Typography style={{ fontSize: "0.7rem", textAlign: "center" }}>
                  {card.status === "revenue" ? " บาท" : " รายการ"}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Table Section */}
        <Grid
          container
          component={Paper}
          className={classes.gateAndClassSection}
        >
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <TablePk3CheckTrue
              dataList={allTsTable}
              page={page}
              onChange={handlePageChange}
              onFetchData={fetchData}
              dropdown={dropdown}
              checkDate={selectedDate}
              eyesStatus={eyesStatus}
              setEyesStatus={setEyesStatus}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
