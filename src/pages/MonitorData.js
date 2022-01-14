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
import { format, set } from "date-fns";
import Swal from "sweetalert2";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import TableMonitor from "../components/TableMonitorData";

const apiURL = axios.create({
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
    filterSection: {
      padding: theme.spacing(1),
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    cardSection: {
      display: "flex",
      marginTop: 10,
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
      height: 112,
      paddingTop: 30,
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
      width: 165,
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

export default function MonitorData() {
  const [summary, setSummary] = useState([]);
  const [hqAndLane, setHqAndLane] = useState([]);
  const [typeHq, setTypeHq] = useState([]);
  const [TSAudit, setTSAudit] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate())
  );
  const fetchData = async () => {
    // Swal.fire({
    //   title: "Loading",
    //   allowOutsideClick: false,
    //   didOpen: () => Swal.showLoading(),
    // });

    const data1 = 0;

    const data2 = 0;

    const data3 = 0;

    setHqAndLane(data1);
    setTypeHq(data2);
    setTSAudit(data3);
  };

  const date = format(selectedDate, "yyyy-MM-dd");

  const dataCard = [
    {
      value: !!summary.ts_count
        ? summary.ts_count.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "จำนวนรถ",
      color: "red",
    },
    {
      value: !!summary.ts_count
        ? summary.ts_count.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "จำนวน HQ Type",
      color: "green",
    },
    {
      value: !!summary.ts_count
        ? summary.ts_count.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "จำนวน TS Full Audit",
      color: "blue",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          Monitor Display
        </Typography>

        {/* Filter Section */}
        <Grid container component={Paper} className={classes.filterSection}>
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

          <Button
            variant="contained"
            className={classes.btn}
            onClick={() => fetchData(1)}
          >
            ดูข้อมูล
          </Button>
        </Grid>

        {/* Card Section */}
        <Box className={classes.cardSection}>
          <Grid container style={{ display: "flex", columnGap: "0.8rem" }}>
            {dataCard.map((card, index) => (
              <Grid
                item
                component={Paper}
                key={index}
                lg={2}
                className={classes.card}
                style={{
                  borderLeft: `3px solid ${card.color}`,
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
                        color: card.color,
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      {card.label}
                    </Typography>
                    <Typography style={{ fontSize: "1rem" }}>
                      {card.value}
                      {card.status === "revenue" ? ` บาท` : ` รายการ`}
                    </Typography>
                  </Grid>
                  <Grid>
                    <DescriptionTwoToneIcon />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Table Section */}

        <Grid
          container
          component={Paper}
          className={classes.gateAndClassSection}
        >
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <TableMonitor data={hqAndLane} />
          </Grid>
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <TableMonitor data={typeHq} />
          </Grid>
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <TableMonitor data={TSAudit} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
