import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  StyledButtonGoToPage,
  StyledButtonInformation,
  StyledButtonPrint,
  StyledButtonRefresh,
  StyledButtonSearch,
} from "../../styledComponent/StyledButton";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    filterSection: {
      padding: theme.spacing(1),
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
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

const valueMenuItem = [
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

export default function FilterSection6(props) {
  const {
    onFetchData,
    report,
    startDate,
    setStartDate,
    setEndDate,
    endDate,
    checkpoint,
    setCheckpoint,
    transactionReport,
  } = props;
  const classes = useStyles();

  useEffect(() => {}, []);
  return (
    <>
      <Grid
        container
        component={Paper}
        maxWidth="xl"
        className={classes.filterSection}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            className={classes.input}
            disableToolbar
            variant="inlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="date"
            label="วันที่เริ่มต้น"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            className={classes.input}
            disableToolbar
            variant="inlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="date"
            label="วันที่สิ้นสุด"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <TextField
          variant="outlined"
          className={classes.input}
          select
          label="ด่าน"
          value={checkpoint}
          onChange={(e) => setCheckpoint(e.target.value)}
          name="gate_select"
        >
          {valueMenuItem.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <StyledButtonInformation
          onClick={() => {
            onFetchData();
          }}
        >
          ดูข้อมูล
        </StyledButtonInformation>
        <StyledButtonGoToPage
          style={{ height: 39 }}
          onClick={() => {
            report(startDate, checkpoint);
          }}
        >
          summary pdf
        </StyledButtonGoToPage>
        <StyledButtonRefresh
          onClick={() => {
            transactionReport(startDate, checkpoint);
          }}
        >
          transaction pdf
        </StyledButtonRefresh>
      </Grid>
    </>
  );
}
