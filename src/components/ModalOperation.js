import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

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
    root: {},
    bodyModal: {
      height: "auto",
      width: "27%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      // [theme.breakpoints.only("md")]: {
      //   marginTop: "1%",
      // },
      // [theme.breakpoints.only("sm")]: {
      //   marginTop: "20%",
      // },
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      // padding: "6px",
      zIndex: 1,
    },
    header2: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 38,
      zIndex: 1,
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#e8eaf6 !important",
      },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        height: 25,
        minWidth: 25,
        fontSize: "0.8rem",
        [theme.breakpoints.down("lg")]: {
          fontSize: "0.7rem",
        },
      },
      paddingTop: 5,
    },
    tableCell: {
      cursor: "pointer",
      fontSize: "0.75rem",
      padding: "6px",
      height: 28,
    },
    btn: {
      color: "white",
      width: "100%",
      marginTop: 5,
    },
    textField: {
      height: 20,
      bottom: 5,
      width: 50,
      "& .MuiInput-input": { fontSize: "0.8rem" },
      float: "right",
    },
    textField2: {
      height: 20,
      bottom: 5,
      width: "100px",
      "& .MuiInput-input": { fontSize: "0.75rem" },
      float: "right",
      "& .MuiOutlinedInput-inputMarginDense": {
        padding: "5px 5px",
      },
      // [theme.breakpoints.down('lg')]: {
      //   width: '300%'
      // }
      // "& .MuiInputBase-root": {
      //   width: 50,
      // },
    },
    tab: {
      fontSize: "0.7rem",
      minWidth: "25%",
    },
    tabs: {
      color: "white",
      backgroundColor: "#6200ea",
    },
    headTable: {
      fontSize: "0.75rem",
      color: "white",
    },
    checkType: {
      "& .MuiTableRow-root": {
        backgroundColor: "red",
      },
    },
    tableContainer: {
      height: "23vh",
      [theme.breakpoints.down("lg")]: {
        height: "23vh",
      },
    },
    inputContainer: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down["lg"]]: {
        display: "block",
      },
    },
  };
});

export default function ModalOperation(props) {
  const classes = useStyle();

  const { open, close } = props;
  const [value, setValue] = useState("gather");
  const [ts1, setTs1] = useState("");
  const [ts2, setTs2] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const body = (
    <div className={classes.bodyModal}>
      <div className={classes.head}>
        {/* <div>
          <Tooltip title="close">
            <CancelRoundedIcon
              onClick={close}
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                paddingTop: 5,
                color: "gray",
                float: "right",
              }}
            />
          </Tooltip>
        </div> */}
      </div>
      <FormControl component="fieldset">
        <FormLabel component="legend">การดำเนินการ</FormLabel>
        <RadioGroup
          aria-label="operation"
          name="operation"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="gather"
            control={<Radio />}
            label="รวมรายการ"
          />
          <FormControlLabel
            value="separate"
            control={<Radio />}
            label="แยกรายการ"
          />
          <FormControlLabel
            value="delete"
            control={<Radio />}
            label="ลบรายการ"
          />
        </RadioGroup>
      </FormControl>
      <Box className={classes.inputContainer}>
        <TextField
          name="ts1"
          label="Transaction"
          variant="outlined"
          value={ts1}
          onChange={(e) => setTs1(e.target.value)}
          size="small"
        />
        <TextField
          name="ts1"
          label="Transaction"
          variant="outlined"
          value={ts2}
          onChange={(e) => setTs2(e.target.value)}
          disabled={value === "separate" || value === "delete" ? true : false}
          size="small"
          style={{ fontSize: "0.8rem" }}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "10px 5px 0px 5px" }}
        >
          ตกลง
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ margin: "10px 5px 0px 5px" }}
          onClick={close}
        >
          ยกเลิก
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        // onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          overflow: "scroll",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
