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

export default function FilterSection7(props) {
  const { onFetchData, setStartDate, report, startDate, transactionReport } =
    props;
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
            format="MM/yyyy"
            margin="normal"
            id="date"
            label="เดือน / ปี"
            views={["year", "month"]}
            value={startDate}
            onChange={(date) => setStartDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

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
            report(startDate);
          }}
        >
          summary pdf
        </StyledButtonGoToPage>
        <StyledButtonRefresh
          onClick={() => {
            transactionReport(startDate);
          }}
        >
          transaction pdf
        </StyledButtonRefresh>
      </Grid>
    </>
  );
}
