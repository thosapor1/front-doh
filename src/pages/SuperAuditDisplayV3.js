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
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import TableSuperdisplay2 from "../components/TableSuperdisplay2";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import SearchComponent from "../components/SearchComponent";
import { getDataSuperAudit, getDataSuperAuditV3 } from "../service/allService";
import TableSuperdisplay3 from "../components/TableSuperdisplay3";
import {
  StyledButtonInformation,
  StyledButtonRefresh,
} from "../styledComponent/StyledButton";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
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
      width: "10%",
    },
    cardSection: {
      display: "flex",
      margin: "10px 0px 0px 0px",
      justifyContent: "center",
      columnGap: 8,
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
    id: 0,
    value: 0,
    label: "ทุกสถานะ",
  },
  {
    id: 1,
    value: 4,
    label: "รอ super audit ตรวจสอบ",
  },
  {
    id: 2,
    value: 5,
    label: "รอพิจารณา",
  },
];

export default function SuperAuditDisplayV3() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allTsTable, setAllTsTable] = useState([]);
  const [checkpoint, setCheckpoint] = useState("1");
  const [status_select, setStatus_select] = useState("0");
  const [summary, setSummary] = useState([]);
  const [eyesStatus, setEyesStatus] = useState([]);
  const [selectGate, setSelectGate] = useState("0");
  const [selectCarType, setSelectCarType] = useState("0");
  const [dropdown, setDropdown] = useState([]);
  const [tsType, setTsType] = useState(0);
  const [transactionId, setTransactionId] = useState("");

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

    const sendData = {
      page: pageId.toString(),
      checkpoint: checkpoint.toString(),
      gate: selectGate,
      state: status_select.toString(),
      vehicleClass: selectCarType,
      date: date,
      startTime: timeStart,
      endTime: timeEnd,
      status: tsType.toString(),
    };
    console.log(sendData);

    const res = await getDataSuperAuditV3(sendData);
    if (!!res) {
      setAllTsTable(!!res ? res.data : []);
      setSummary(!!res ? res.data.summary : []);
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
      console.log("test");
    }
    if (!!res && !!res.data.resultsDisplay) {
      for (let i = 0; i < res.data.resultsDisplay.length; i++) {
        eyes.push({
          state: res.data.resultsDisplay[i].state,
          readFlag: res.data.resultsDisplay[i].readFlag,
          transactionId: res.data.resultsDisplay[i].transactionId,
        });
      }
      setEyesStatus(eyes);
    }

    if (!!res && res.data.status !== false) {
      Swal.close();
    }
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
    setStatus_select(0);
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
      state: "0",
    };

    apiURL
      .post("/display-superaudit-activity2", sendData)
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
      value:
        !!summary && !!summary.ts_count
          ? summary.ts_count.toLocaleString().toString()
          : "0",
      status: "checklist",
      label: "จำนวนรายการตรวจสอบ",
    },
    // {
    //   value: !!summary.normal ? summary.normal : 0,
    //   status: "normal",
    //   label: "รายการปกติ",
    // },
    // {
    //   value: !!summary.unMatch ? summary.unMatch : 0,
    //   status: "unMatch",
    //   label: "รายการข้อมูลไม่ตรงกัน",
    // },
    // {
    //   value: !!summary.miss ? summary.miss : 0,
    //   status: "miss",
    //   label: "รายการสูญหาย",
    // },
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
          super audit display
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
              ? dropdown.checkpoint
                  .filter((item) => item.id > 0)
                  .map((item, index) => (
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

          {/* <TextField
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
          </TextField> */}

          <TextField
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
              ? dropdown.ts_status.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
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
        <Box className={classes.cardSection}>
          <Box style={{ marginRight: "0.8rem" }}>
            <SearchComponent
              value={transactionId}
              date={selectedDate}
              handleOnChange={(e) => {
                setTransactionId(e.target.value);
                console.log(transactionId);
              }}
              name="search"
              label="transaction id"
              setTable={setAllTsTable}
              endpoint="/super-audit-search"
            />
          </Box>

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
                {!!card.value ? card.value.toLocaleString() : "0"}
              </Typography>
              <Typography style={{ fontSize: "0.7rem", textAlign: "center" }}>
                {card.type === "money" ? " บาท" : " รายการ"}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Table Section */}
        <Grid
          container
          component={Paper}
          className={classes.gateAndClassSection}
        >
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <TableSuperdisplay3
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
