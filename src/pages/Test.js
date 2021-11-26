import {
  Button,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React, { useState } from "react";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    bodyModal: {
      height: "auto",
      width: "90%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      [theme.breakpoints.down("md")]: {
        marginTop: 700,
      },
    },
    head: {
      display: "flex",
      justifyContent: "space-between",
    },
    headCard: {
      display: "flex",
      margin: "10px 0px",
    },
    cardContainer: {},
    cardItem: {
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    },
    image: {
      height: "140px",
      width: "100%",
      border: "1px solid lightgray",
      marginRight: "auto",
      marginLeft: "auto",
    },
    tableHead1: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    tableHead2: {
      backgroundColor: "#ffac33",
      border: "1px solid white",
      color: "white",
    },
    tableHead3: {
      backgroundColor: "#64b5f6",
      border: "1px solid white",
      color: "white",
    },
    table: {
      width: "100%",
      paddingTop: "1rem",

      "& .MuiTableCell-root": {
        paddingTop: "0.2rem",
        paddingBottom: "0.2rem",
        fontSize: "0.8rem",
      },
    },
    btn: { marginTop: 10 },
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
      width: 100,
      "& .MuiInput-input": { fontSize: "0.75rem" },
      float: "right",
      "& .MuiOutlinedInput-inputMarginDense": {
        padding: "5px 5px",
      },
      // "& .MuiInputBase-root": {
      //   width: 50,
      // },
    },
    tab: {
      fontSize: "0.7rem",
      minWidth: "25%",
    },
    tabs: {
      height: "0.3rem",
      color: "blue",
      padding: "0px 10px",
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
  };
});

export default function Test() {
  const classes = useStyle();
  const [fileName, setFileName] = useState("");
  const [selectFile, setSelectFile] = useState("");

  const upload = () => {
    // const URL = `${process.env.REACT_APP_BASE_URL_V1}`;
    // const getDate = dataList.timestamp.split(" ").shift();
    // let formData = new FormData();
    // formData.append("file", selectFile);
    // formData.append("date", getDate);
    // formData.append("transactionId", dataList.transactionId);
    // if (fileName !== "") {
    //   axios
    //     .post(`${URL}/pk3-upload-file`, formData)
    //     .then((res) => {
    //       if (res.data.status === true) {
    //         Swal.fire({
    //           title: "Success",
    //           text: "ข้อมูลของคุณถูกอัพโหลดสำเร็จแล้ว",
    //           icon: "success",
    //           confirmButtonText: "OK",
    //         });
    //       } else {
    //         Swal.fire({
    //           title: "Fail",
    //           text: "อัพโหลดข้อมูลไม่สำเร็จ",
    //           icon: "error",
    //           confirmButtonText: "OK",
    //         });
    //       }
    //     })
    //     .then(() => setFileName(""));
  };

  return (
    <div style={{ display: "flex" }}>
      <Button
        onClick={() => document.getElementById("raised-button-file").click()}
      >
        <label htmlFor="raised-button-file">
          <TextField
            id="upload"
            disabled
            variant="outlined"
            className={classes.disableLabel2}
            label="choose file here"
            value={fileName}
            InputProps={{
              endAdornment: (
                <Tooltip title="cancel upload file" placement="top">
                  <IconButton onClick={() => setFileName("")}>
                    <HighlightOffTwoToneIcon />{" "}
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </label>
      </Button>
      <input
        // accept="image/*"
        className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        // multiple
        type="file"
        onChange={(e) => {
          setFileName(e.target.files[0].name);
          setSelectFile(e.target.files[0]);
          console.log(selectFile);
          // console.log(ref.current.value.split("\\").pop());
        }}
      />

      <Button
        variant="contained"
        className={classes.btn}
        color="secondary"
        onClick={() => {
          upload();
        }}
        style={{ fontSize: "0.7rem" }}
      >
        upload
      </Button>
    </div>
  );
}
