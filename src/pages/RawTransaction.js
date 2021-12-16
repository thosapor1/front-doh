import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React from "react";
import { useState, useEffect } from "react";
import AuditTable from "../components/AuditTable";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import FilterListIcon from "@material-ui/icons/FilterList";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";

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
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },
    allSelect: {
      display: "flex",
      marginTop: 20,
    },
    containedSelect: {},
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    textField: {
      width: 150,
      margin: theme.spacing(1),
      "& .MuiInputBase-input ": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
    },
    card: {
      width: "100%",
      height: 100,
      display: "flex",
    },
    cardSection: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10,
      columnGap: 10,
    },
    filterSection: {
      padding: theme.spacing(1),
      marginTop: 10,
      justifyContent: "center",
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

export default function RawTransaction() {
  const [state, setState] = useState([]);
  const [summary, setSummary] = useState([]);
  const [page, setPage] = useState(1);
  const [station, setStation] = useState(0);
  const [status, setStatus] = useState(0);
  const [dropdown, setDropdown] = useState([]);
  const classes = useStyle();
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const handlePageChange = (event, value) => {
    // setPage(value);
    fetchData(value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dataCard = [
    {
      value: !!summary.ts_total ? summary.ts_total : 0,
      status: "total",
      label: "รายการทั้งหมด",
    },
    {
      value: !!summary.ts_normal ? summary.ts_normal : 0,
      status: "normal",
      label: "รายการปกติ",
    },
    {
      value: !!summary.ts_not_normal ? summary.ts_not_normal : 0,
      status: "unMatch",
      label: "รายการข้อมูลไม่ตรงกัน",
    },
    {
      value: !!summary.ts_miss ? summary.ts_miss : 0,
      status: "miss",
      label: "รายการสูญหาย",
    },
  ];

  const getDropdown = () => {
    apiURLv1.post("/dropdown").then((res) => {
      console.log(res.data);
      setDropdown(res.data);
    });
  };

  async function fetchData(pageId = 1) {
    const date = format(selectedDate, "yyyy-MM-dd");
    // const date = "2021-08-10";
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

    const sendData = {
      page: pageId.toString(),
      checkpoint: station.toString(),
      date: date,
      state: status.toString(),
    };
    // console.log(`sendData: ${JSON.stringify(sendData)}`);
    await apiURLv1
      .post("/raw-data", sendData)
      .then((res) => {
        console.log(sendData);
        Swal.close();
        setState(res.data);
        setSummary(!!res.data.summary ? res.data.summary : summary);
        console.log(res.data.dropdown_Checkpoint);
        // console.log(`state_length: ${state.record.length}`);
      })
      .catch((error) => {
        // handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  }

  useEffect(() => {
    // fetchData();
    getDropdown();
    // console.log('hello test')
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          ตรวจสอบ (DOH) : รายการฐานข้อมูลรถ
        </Typography>
        {/* Search Block */}
        <Grid container component={Paper} className={classes.filterSection}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.input1}
              style={{ width: 200 }}
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
          <TextField
            name="status"
            select
            variant="outlined"
            label="สถานะ"
            className={classes.input1}
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            {!!dropdown.ts_status
              ? dropdown.state.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              : []}
          </TextField>

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
                    {card.value} {card.status === "revenue" ? "บาท" : "รายการ"}
                  </Typography>
                </Grid>
                <Grid>
                  <DescriptionTwoToneIcon />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>

        {/* Table Blcok */}
        <Paper style={{ marginTop: 10, padding: "0px 10px" }}>
          <AuditTable
            dataList={state}
            page={page}
            onChange={handlePageChange}
            onFetchData={fetchData}
            checkDate={selectedDate}
          />
        </Paper>
      </Container>
    </>
  );
}
