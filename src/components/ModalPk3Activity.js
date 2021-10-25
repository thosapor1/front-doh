import {
  Button,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Modal,
  Tab,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CameraEnhanceTwoToneIcon from "@material-ui/icons/CameraEnhanceTwoTone";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import RemoveTwoToneIcon from "@material-ui/icons/RemoveTwoTone";
import Cookies from "js-cookie";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { format } from "date-fns";

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V2}`,
});

const apiURLv1 = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V1}`,
});

function TabPanel1(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabs1-${index}`}
      aria-labelledby={`tab1-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function TabPanel2(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`taps2-${index}`}
      aria-labelledby={`taps2-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function TabPanel3(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`taps3-${index}`}
      aria-labelledby={`taps3-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function TabPanel4(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`taps3-${index}`}
      aria-labelledby={`taps3-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    modal: {
      width: "70%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
      height: "300px",
      width: "90%",
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
      padding: "1rem",
      "& .MuiTableCell-root": { paddingTop: "0.2rem", paddingBottom: "0.2rem" },
    },
    btn: {
      margin: theme.spacing(1),
      fontSize: 12,
    },
    btnUpload: {
      margin: theme.spacing(1),
      fontSize: 12,
      background: "#3f51b5",
      color: "white",
      "&:hover": {
        background: "#303F9F",
      },
    },
    textField: {
      height: 20,
      bottom: 5,
      width: 130,
      "& .MuiInput-input": { fontSize: "0.9rem" },
    },
    tab: {
      fontSize: "0.7rem",
      minWidth: "25%",
    },
    disableLabel: {
      "& .MuiInputLabel-root": {
        color: "blue",
      },
      marginLeft: 20,
      marginRight: 20,
      width: "91%",
      marginTop: 2,
    },
    disableLabel2: {
      // "& .MuiInputLabel-root": {
      //   color: "blue",
      // },
      marginLeft: 15,
      marginRight: 20,
      marginTop: 20,
      width: "91%",
    },
    input: {
      // color:'red'
    },
  };
});

export default function ModalPk3Activity(props) {
  const classes = useStyle();
  const { dataList } = props;

  const [fileName, setFileName] = useState("");
  const [selectFile, setSelectFile] = useState("");

  const [value1, setValue1] = React.useState(2);
  const [value2, setValue2] = React.useState(2);
  const [value3, setValue3] = React.useState(2);
  const [value4, setValue4] = React.useState(2);

  const handleChangeTabs1 = (event, newValue) => {
    setValue1(newValue);
  };
  const handleChangeTabs2 = (event, newValue) => {
    setValue2(newValue);
  };
  const handleChangeTabs3 = (event, newValue) => {
    setValue3(newValue);
  };
  const handleChangeTabs4 = (event, newValue) => {
    setValue4(newValue);
  };

  const [fileDownload, setFileDownload] = useState(true);

  const upload = () => {
    const URL = `${process.env.REACT_APP_BASE_URL_V1}`;
    const getDate = dataList.timestamp.split(" ").shift();
    let formData = new FormData();
    formData.append("file", selectFile);
    formData.append("date", getDate);
    formData.append("transactionId", dataList.transactionId);

    if (fileName !== "") {
      axios
        .post(`${URL}/pk3-upload-file`, formData)
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              title: "Success",
              text: "ข้อมูลของคุณถูกอัพโหลดสำเร็จแล้ว",
              icon: "success",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Fail",
              text: "อัพโหลดข้อมูลไม่สำเร็จ",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        })
        .then(() => setFileName(""));
    }
  };

  const download = () => {
    const header = {
      "Content-Type": "application/pdf",
      responseType: "blob",
    };
    const sendData = {
      transactionId: dataList.transactionId,
      date: dataList.timestamp.split(" ").shift(),
    };
    apiURLv1.post("/download-file-pk3", sendData, header).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "downloadFromPk3.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      console.log(res.data);
      console.log(url);
    });
  };

  const mockPic = 0;
  const [state, setState] = useState({
    pk3_lp: "",
    pk3_province: "",
    pk3_comment: "",
  });
  const { pk3_lp, pk3_province, pk3_comment } = state;

  const [pk3_vehicleClass, setPk3_vehicleClass] = useState("");
  const [pk3_feeAmount, setPk3_feeAmount] = useState("");
  const [pk3_vehicleClass_id, setPk3_vehicleClass_id] = useState(0);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    // console.log(event.target.value)
  };

  const handleOptionChange = (event) => {
    const index = event.target.value;
    setPk3_vehicleClass(index);
    setPk3_feeAmount(dataList.dropdown_audit_vehicle[index].fee);
    setPk3_vehicleClass_id(dataList.dropdown_audit_vehicle[index].id);

    console.log(
      "pk3_feeAmount:",
      pk3_feeAmount,
      "pk3_vehicleClass:",
      pk3_vehicleClass,
      "pk3_vehicleId:",
      pk3_vehicleClass_id,
      "event.target.value:",
      index
    );
  };

  const handleUpdateState3To4 = () => {
    const sendData = {
      user_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      pk3_lp: pk3_lp,
      pk3_province: pk3_province,
      // pk3_vehicleClass: pk3_vehicleClass,
      pk3_feeAmount: pk3_feeAmount,
      pk3_comment: pk3_comment,
      timestamp: dataList.timestamp,
      pk3_vehicleClass_id: pk3_vehicleClass_id,
    };

    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        upload();
        apiURL
          .post("/changeState3to4", sendData)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === true) {
              Swal.fire({
                title: "Success",
                text: "ข้อมูลของท่านถูกบันทึกแล้ว",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: "Fail",
                text: "บันทึกข้อมูลไม่สำเร็จ",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          })
          .then(() => props.onClick())
          .then(() => props.onFetchData());
      }
    });

    // const res = await apiURL.post("/changeState3to4", sendData);
    console.log(sendData);
    // console.log(res.data);
  };
  const handleUpdateState3To6 = () => {
    const sendData = {
      user_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      pk3_lp: pk3_lp,
      pk3_province: pk3_province,
      // pk3_vehicleClass: pk3_vehicleClass,
      pk3_feeAmount: pk3_feeAmount,
      pk3_comment: pk3_comment,
      timestamp: dataList.timeStamp,
      pk3_vehicleClass_id: pk3_vehicleClass_id,
    };

    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        apiURL
          .post("/changeState3to6", sendData)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === true) {
              Swal.fire({
                title: "Success",
                text: "ข้อมูลของท่านถูกบันทึกแล้ว",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: "Fail",
                text: "บันทึกข้อมูลไม่สำเร็จ",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          })
          .then(() => props.onClick())
          .then(() => props.onFetchData());
      }
    });

    // const res = await apiURL.post("/changeState3to6", sendData);
    console.log(sendData);
    // console.log(res.data);
  };

  useEffect(() => {
    if (dataList) {
      setState(dataList);
      console.log("MyState", state, "dataList", dataList);
    }
    if (dataList.pk3_upload_file === 1) {
      setFileDownload(false);
    }
  }, [dataList]);

  const body = (
    <div className={classes.modal}>
      <div className={classes.head}>
        <div>
          <Typography variant="h6" style={{ color: "#c80000" }}>
            {dataList.state === 1
              ? "ข้อมูลปกติ (state 1)"
              : dataList.state === 2
              ? "ข้อมูลรอตรวจสอบ (state 2)"
              : dataList.state === 3
              ? "อยู่ระหว่างการตรวจสอบ (state 3)"
              : dataList.state === 4
              ? "ตรวจสอบ:ส่งกลับแก้ไข (state 4)"
              : dataList.state === 5
              ? "ข้อมูลแแก้ไขกลับมาตรวจสอบ (state 5)"
              : dataList.state === 6
              ? "ตรวจสอบ:รอการยืนยันความถูกต้อง (state 6)"
              : dataList.state === 7
              ? "ตรวจสอบ:ยืนยันความถูกต้อง (state 7)"
              : "ไม่มีสถานะ"}
          </Typography>
          <Typography style={{ color: "blue", fontSize: 14 }}>
            transaction: {dataList.transactionId}{" "}
          </Typography>
          <Typography style={{ color: "gray", fontSize: 14 }}>
            {dataList.highway_name} / {dataList.checkpoint_name} /{" "}
            {dataList.gate_name}
          </Typography>
        </div>
        <div>
          <CancelTwoToneIcon
            fontSize="small"
            color="secondary"
            onClick={props.onClick}
          />
        </div>
      </div>
      <Grid container className={classes.cardContainer}>
        {/* CCTV Audit  block */}
        <Grid item sm={6} md={6} lg={6} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>CCTV Audit</Typography>
          </div>
          <div style={{ paddingLeft: 18, paddingRight: 18 }}>
            <Tabs
              value={value4}
              onChange={handleChangeTabs4}
              aria-label="simple tabs example"
              indicatorColor="primary"
              className={classes.tabs}
            >
              <Tab
                label="ก่อน 2 คัน"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="ก่อน 1 คัน"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="คันที่ตรวจ"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="วิดีโอ"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel4 value={value4} index={0}>
            <CardMedia
              component="img"
              src={
                mockPic != 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel4>
          <TabPanel4 value={value4} index={1}>
            <CardMedia
              component="img"
              src={
                mockPic != 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel4>
          <TabPanel4 value={value4} index={2}>
            <CardMedia
              component="img"
              src={
                dataList.audit_pic != 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel4>
          <TabPanel4 value={value4} index={3}>
            <CardMedia
              component="img"
              src={
                mockPic != 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel4>

          <TextField
            id="upload"
            disabled
            variant="outlined"
            className={classes.disableLabel2}
            label="upload file here"
            value={fileName}
            InputProps={{
              endAdornment: (
                <Tooltip title="cancel upload file" placement="top">
                  <IconButton onClick={() => setFileName("")}>
                    <HighlightOffIcon />{" "}
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <div
            style={{
              paddingLeft: 6,
              paddingRight: 6,
              // marginTop: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                className={classes.btn}
                color="primary"
                component="span"
                // onClick={() => {
                //   alert("test");
                // }}
              >
                choose file
              </Button>
            </label>
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
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              paddingRight: 6,
              marginTop: 90,
            }}
          >
            <Button
              disabled={fileDownload}
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={() => download()}
              style={{ fontSize: "0.7rem" }}
            >
              download
            </Button>
          </div>
        </Grid>

        {/* CCTV Audit (Vehicle) Block */}
        <Grid item sm={6} md={6} lg={6} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>
              CCTV Audit (Vehicle)
            </Typography>
          </div>
          <div style={{ paddingLeft: 18, paddingRight: 18 }}>
            <Tabs
              value={value1}
              onChange={handleChangeTabs1}
              aria-label="simple tabs example"
              indicatorColor="primary"
            >
              <Tab
                label="ก่อน 2 คัน"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="ก่อน 1 คัน"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="คันที่ตรวจ"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="วิดีโอ"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel1 value={value1} index={0}>
            <CardMedia
              component="img"
              src={
                dataList.audit_pic_crop != 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel1>
          <TabPanel1 value={value1} index={1}>
            <CardMedia
              component="img"
              src={
                dataList.audit_pic_crop != 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel1>
          <TabPanel1 value={value1} index={2}>
            <CardMedia
              component="img"
              src={
                dataList.audit_pic_crop != 0 && !!dataList.audit_pic_crop
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel1>
          <TabPanel1 value={value1} index={3}>
            <CardMedia
              component="img"
              src={
                dataList.audit_pic_crop != 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel1>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} style={{ color: "white" }}>
                    ระบบตรวจสอบรายได้
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>กว้าง</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ยาว</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>{dataList.audit_vehicleClass}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  {/* <TableCell>{dataList.audit_feeAmount}</TableCell> */}
                  <TableCell>30</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 33,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              disabled
            >
              สร้างรายการใหม่
            </Button>
            <Button
              disabled
              className={classes.btn}
              variant="contained"
              color="secondary"
              startIcon={<RemoveTwoToneIcon fontSize="small" />}
            >
              ลบรายการนี้
            </Button>
          </div>
        </Grid>

        {/* ALPR Block */}
        <Grid item sm={6} md={6} lg={6}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>ALPR</Typography>
          </div>
          <div style={{ paddingLeft: 18, paddingRight: 18 }}>
            <Tabs
              value={value2}
              onChange={handleChangeTabs2}
              aria-label="simple tabs example"
              indicatorColor="primary"
            >
              <Tab
                label="ก่อน 2 คัน"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="ก่อน 1 คัน"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="คันที่ตรวจ"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="วิดีโอ"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel2 value={value2} index={0}>
            <CardMedia
              component="img"
              src={
                dataList.mf_pic != 0
                  ? `data:image/png;base64, ${dataList.mf_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel2>
          <TabPanel2 value={value2} index={1}>
            <CardMedia
              component="img"
              src={
                dataList.mf_pic != 0
                  ? `data:image/png;base64, ${dataList.mf_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel2>
          <TabPanel2 value={value2} index={2}>
            <CardMedia
              component="img"
              src={
                dataList.mf_pic != 0
                  ? `data:image/png;base64, ${dataList.mf_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel2>
          <TabPanel2 value={value2} index={3}>
            <CardMedia
              component="img"
              src={
                dataList.mf_pic != 0
                  ? `data:image/png;base64, ${dataList.mf_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel2>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead2}>
                  <TableCell colSpan={2} style={{ color: "white" }}>
                    ระบบจัดเก็บรายได้
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ทะเบียน</TableCell>
                  <TableCell>{dataList.mf_lp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จังหวัด</TableCell>
                  <TableCell>{dataList.mf_lp_province}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>{dataList.mf_class}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>{dataList.mf_fee_ref}</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
          <TextField
            disabled
            variant="outlined"
            label="ข้อความจากผู้ตรวจสอบ"
            value={dataList.audit_comment || ""}
            className={classes.disableLabel}
            style={{ marginTop: 26 }}
          />
        </Grid>

        {/* DVES Block */}
        <Grid item sm={6} md={6} lg={6}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>DVES</Typography>
          </div>
          <div style={{ paddingLeft: 18, paddingRight: 18 }}>
            <Tabs
              value={value3}
              onChange={handleChangeTabs3}
              aria-label="simple tabs example"
              indicatorColor="primary"
            >
              <Tab
                label="ก่อน 2 คัน"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="ก่อน 1 คัน"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="คันที่ตรวจ"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="วิดีโอ"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel3 value={value3} index={0}>
            <CardMedia
              component="img"
              src={
                mockPic != 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel3>
          <TabPanel3 value={value3} index={1}>
            <CardMedia
              component="img"
              src={
                mockPic != 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel3>
          <TabPanel3 value={value3} index={2}>
            <CardMedia
              component="img"
              src={
                mockPic != 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel3>
          <TabPanel3 value={value3} index={3}>
            <CardMedia
              component="img"
              src={
                mockPic != 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel3>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead3}>
                  <TableCell colSpan={2} style={{ color: "white" }}>
                    ส่งคำสั่งแก้ไขไปยังระบบจัดเก็บรายได้
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ทะเบียน</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      className={classes.textField}
                      name="pk3_lp"
                      value={pk3_lp}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จังหวัด</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      className={classes.textField}
                      name="pk3_province"
                      value={pk3_province}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    <TextField
                      select
                      size="small"
                      className={classes.textField}
                      name="pk3_vehicleClass"
                      value={pk3_vehicleClass}
                      onChange={handleOptionChange}
                    >
                      {!!dataList.dropdown_audit_vehicle
                        ? dataList.dropdown_audit_vehicle.map((item, index) => (
                            <MenuItem key={item.id} value={index}>
                              {item.class}
                            </MenuItem>
                          ))
                        : []}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      name="valueRef"
                      value={pk3_feeAmount}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <TextField
              style={{
                width: "1000%",
                height: 20,
                padding: "10px",
                marginTop: 25,
              }}
              name="pk3_comment"
              label="คำสั่งแก้ไข"
              value={pk3_comment || ""}
              onChange={handleChange}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateState3To6}
                style={{ width: "6rem", margin: "0.2rem" }}
              >
                ยินยอม
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUpdateState3To4}
                style={{ width: "6rem", margin: "0.2rem" }}
              >
                ไม่ยินยอม
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
