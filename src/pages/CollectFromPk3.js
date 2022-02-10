import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import SearchComponent from "../components/SearchComponent";
import { getDataCollectFromPk3, getDropdown } from "../service/allService";
import TableCollectFromPk3 from "../components/TableCollectFromPk3";
import {
  StyledButtonInformation,
  StyledButtonRefresh,
} from "../styledComponent/StyledButton";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "rgba(235,176,129,0.15)",
      paddingTop: 20,
    },
    filterSection: {
      padding: theme.spacing(1),
      marginTop: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    gateAndClassSection: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
      columnGap: "1rem",
      justifyContent: "space-between",
    },
    allTsTable: {
      marginTop: 10,
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

export default function CollectFromPk3() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState([]);
  //   const [checkpoint, setCheckpoint] = useState(1);
  //   const [status_select, setStatus_select] = useState(0);
  //   const [selectGate, setSelectGate] = useState(0);
  //   const [selectCarType, setSelectCarType] = useState(0);
  const [summary, setSummary] = useState([]);
  const [eyesStatus, setEyesStatus] = useState([]);

  const [dropdown, setDropdown] = useState([]);
  //   const [tsType, setTsType] = useState(0);
  const [invoiceId, setInvoiceId] = useState("");

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

  const fetchData = async (pageId = 1) => {
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
      date: date,
      startTime: timeStart,
      endTime: timeEnd,
    };
    console.log(sendData);

    const res = await getDataCollectFromPk3(sendData);
    if (!!res) {
      setTable(!!res ? res.data : []);
      setSummary(!!res ? res.data.summary : summary);
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
      console.log("test");
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }

    console.log(eyesStatus);
  };

  // const refresh = (pageId = 1) => {
  //   Swal.fire({
  //     title: "Loading",
  //     allowOutsideClick: false,
  //     didOpen: () => Swal.showLoading(),
  //   });
  //   if (pageId === 1) {
  //     setPage(1);
  //   } else {
  //     setPage(pageId);
  //   }

  //   setSelectedDate(new Date().setDate(new Date().getDate() - 1));
  //   setCheckpoint(0);
  //   setStatus_select(0);
  //   setSelectedTimeStart(new Date("Aug 10, 2021 00:00:00"));
  //   setSelectedTimeEnd(new Date("Aug 10, 2021 00:00:00"));
  //   const timeStart = "00:00:00";
  //   const timeEnd = "00:00:00";
  //   const date = format(
  //     new Date().setDate(new Date().getDate() - 1),
  //     "yyyy-MM-dd"
  //   );

  //   const sendData = {
  //     page: pageId.toString(),
  //     checkpoint_id: checkpoint.toString() || "0",
  //     gate_id: selectGate.toString() || "0",
  //     state: status_select.toString() || "0",
  //     vehicleClass: selectCarType.toString() || "0",
  //     date: date,
  //     startTime: timeStart,
  //     endTime: timeEnd,
  //     status: tsType.toString(),
  //   };
  //   console.log(sendData);

  //   apiURLv1.post("/expect-income", sendData).then((res) => {
  //     Swal.close();
  //     setAllTsTable({
  //       summary: {
  //         total: 0,
  //         normal: 0,
  //         unMatch: 0,
  //         miss: 0,
  //       },
  //       ts_table: [],
  //     });
  //     console.log(
  //       "res: ",
  //       res.data,
  //       "tsClass:",
  //       res.data.ts_class,
  //       "tsGate: ",
  //       res.data.ts_gate_table,
  //       "ts_Table:",
  //       res.data.ts_table,
  //       "Summary: ",
  //       res.data.summary
  //     );
  //     setAllTsTable(res.data.status !== false ? res.data : []);
  //   });
  // };

  const dataCard = [
    {
      value:
        !!summary && !!summary.count_billing
          ? summary.count_billing.toLocaleString().toString()
          : "0",
      status: "total",
      label: "รายการแจ้งหนี้",
      type: "label",
    },
    {
      value:
        !!summary && !!summary.total_amount
          ? summary.total_amount.toLocaleString().toString()
          : "0",
      status: "normal",
      label: "จำนวนเงินแจ้งหนี้",
      type: "money",
    },
    {
      value:
        !!summary && !!summary.payment_totalAmount
          ? summary.payment_totalAmount.toLocaleString().toString()
          : "0",
      status: "not_normal",
      label: "จำนวนเงินจ่ายแล้ว",
      type: "money",
    },
    {
      value:
        !!summary && !!summary.overdue
          ? summary.overdue.toLocaleString().toString()
          : "0",
      status: "revenue",
      label: "ค้างจ่าย",
      type: "money",
    },
  ];

  useEffect(() => {
    // fetchData();
    async function fetchDropdown() {
      const res = await getDropdown();
      setDropdown(res.data);
    }
    fetchDropdown();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          ตรวจสอบ (DOH) : รายการจัดเก็บจาก PK3
        </Typography>

        {/* Filter Section */}
        <Paper className={classes.filterSection}>
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
          <StyledButtonRefresh
          // onClick={() => refresh(1)}
          >
            refresh
          </StyledButtonRefresh>
        </Paper>

        {/* Card Section */}
        <Box className={classes.cardSection}>
          <Box style={{ marginRight: "0.8rem" }}>
            <SearchComponent
              value={invoiceId}
              date={selectedDate}
              handleOnChange={(e) => {
                setInvoiceId(e.target.value);
                console.log(invoiceId);
              }}
              name="search"
              label="Invoice No."
              setTable={setTable}
              endpoint="/search-billing"
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
                    : card.status === "not_normal"
                    ? "3px solid red"
                    : card.status === "revenue"
                    ? "3px solid orange"
                    : "3px solid lightgrey",
              }}
            >
              <Typography
                style={{
                  color:
                    card.status === "total"
                      ? "gray"
                      : card.status === "normal"
                      ? "green"
                      : card.status === "not_normal"
                      ? "red"
                      : card.status === "revenue"
                      ? "orange"
                      : "lightgrey",
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

        <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
          <TableCollectFromPk3
            dataList={table}
            page={page}
            onChange={handlePageChange}
            onFetchData={fetchData}
            dropdown={dropdown}
            checkDate={selectedDate}
          />
        </Grid>
      </Container>
    </>
  );
}
