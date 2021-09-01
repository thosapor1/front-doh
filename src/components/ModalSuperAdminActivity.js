import {
  Button,
  CardMedia,
  Grid,
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
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CameraEnhanceTwoToneIcon from "@material-ui/icons/CameraEnhanceTwoTone";
import Logo_doh from "../image/Logo_doh.png";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import Cookies from "js-cookie";

const apiURL = axios.create({
  baseURL: "http://202.183.167.92:3010/audit/api/v1",
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
    tableHead4: {
      backgroundColor: "red",
      border: "1px solid white",
      color: "white",
    },
    table: {
      width: "100%",
      padding: "1rem",
      "& .MuiTableCell-root": {
        paddingTop: "0.2rem",
        paddingBottom: "0.2rem",
        width: "50%",
      },
    },
    btn: {
      margin: theme.spacing(1),
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
  };
});

export default function ModalSuperAdminActivity(props) {
  const classes = useStyle();
  const { dataList } = props;

  const [value1, setValue1] = useState(2);
  const [value2, setValue2] = useState(2);
  const [value3, setValue3] = useState(2);
  const [value4, setValue4] = useState(2);

  // const [disable, setDisable] = useState(false);

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

  const mockPic = 0;
  const [state, setState] = useState({
    super_audit_lp: "",
    super_audit_province: "",
    super_audit_comment: "",
  });
  const { super_audit_lp, super_audit_province, super_audit_comment } = state;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const [super_audit_vehicleClass, setSuper_audit_vehicleClass] = useState("");
  const [super_audit_feeAmount, setSuper_audit_feeAmount] = useState("");
  const [super_audit_vehicleClass_id, setSuper_Audit_vehicleClass_id] =
    useState(0);

  const handleOptionChange = (event) => {
    setSuper_audit_vehicleClass(event.target.value);
    setSuper_Audit_vehicleClass_id(1);
    if (event.target.value === "C1") {
      setSuper_audit_feeAmount(30);
    } else if (event.target.value === "C2") {
      setSuper_audit_feeAmount(50);
    } else if (event.target.value === "C3") {
      setSuper_audit_feeAmount(70);
    } else if (event.target.value === "C1 + C1") {
      setSuper_audit_feeAmount(60);
    } else if (event.target.value === "C2 + C1") {
      setSuper_audit_feeAmount(80);
    } else if (event.target.value === "C2 + C2") {
      setSuper_audit_feeAmount(100);
    } else if (event.target.value === "C2 + C3") {
      setSuper_audit_feeAmount(120);
    } else if (event.target.value === "C3 + C1") {
      setSuper_audit_feeAmount(100);
    } else if (event.target.value === "C3 + C2") {
      setSuper_audit_feeAmount(120);
    } else if (event.target.value === "C3 + C3") {
      setSuper_audit_feeAmount(140);
    }

    console.log(
      super_audit_feeAmount,
      super_audit_vehicleClass,
      event.target.value
    );
  };

  const handleUpdateState4To5 = async () => {
    const sendData = {
      super_audit_approve_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      super_audit_lp: super_audit_lp,
      super_audit_province: super_audit_province,
      super_audit_vehicleClass: super_audit_vehicleClass,
      super_audit_feeAmount: super_audit_feeAmount,
      super_audit_comment: super_audit_comment,
      super_audit_vehicleClass_id: super_audit_vehicleClass_id,
    };
    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it",
    }).then((result) => {
      if (result.isConfirmed) {
        apiURL
          .post("/changeState4to5", sendData)
          .then((res) => {
            if (res.data === true) {
              Swal.fire("ข้อมูลของคุณถูกบักทึกแล้ว");
            }
          })
          .then(() => window.location.reload());
      }
    });

    // const res = await apiURL.post("/changeState4to5", sendData);
    console.log(sendData);
    // console.log(res.data);
  };
  const handleUpdateState4To6 = async () => {
    const sendData = {
      super_audit_approve_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      super_audit_lp: super_audit_lp,
      super_audit_province: super_audit_province,
      super_audit_vehicleClass: super_audit_vehicleClass,
      super_audit_feeAmount: super_audit_feeAmount,
      super_audit_comment: super_audit_comment,
      super_audit_vehicleClass_id: super_audit_vehicleClass_id,
    };
    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it",
    }).then((result) => {
      if (result.isConfirmed) {
        apiURL
          .post("/changeState4to6", sendData)
          .then((res) => {
            if (res.data === true) {
              Swal.fire("ข้อมูลของคุณถูกบักทึกแล้ว");
            }
          })
          .then(() => window.location.reload());
      }
    });

    // const res = await apiURL.post("/changeState4to6", sendData);
    console.log(sendData);
    // console.log(res.data);
  };
  const handleUpdateState6To7 = async () => {
    const sendData = {
      super_audit_approve_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      super_audit_lp: super_audit_lp,
      super_audit_province: super_audit_province,
      super_audit_vehicleClass: super_audit_vehicleClass,
      super_audit_feeAmount: super_audit_feeAmount,
      super_audit_comment: super_audit_comment,
      super_audit_vehicleClass_id: super_audit_vehicleClass_id,
    };
    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it",
    }).then((result) => {
      if (result.isConfirmed) {
        apiURL
          .post("/changeState6to7", sendData)
          .then((res) => {
            if (res.data === true) {
              Swal.fire("ข้อมูลของคุณถูกบักทึกแล้ว");
            }
          })
          .then(() => window.location.reload());
      }
    });

    // const res = await apiURL.post("/changeState6to7", sendData);
    // console.log(sendData);
    // console.log(res.data);
  };

  useEffect(() => {
    if (dataList) {
      setState(dataList);
      console.log("MyState", state, "dataList", dataList);
    }
    // if (dataList.state != 6) {
    //   setDisable(true);
    // }
  }, [dataList]);

  const body = (
    <div className={classes.modal}>
      <div className={classes.head}>
        <div>
          <Typography variant="h6" style={{ color: "#c80000" }}>
            {dataList.state === 1
              ? "ข้อมูลปกติ"
              : dataList.state === 2
              ? "ข้อมูลรอตรวจสอบ"
              : dataList.state === 3
              ? "อยู่ระหว่างการตรวจสอบ"
              : dataList.state === 4
              ? "ตรวจสอบ:ส่งกลับแก้ไข"
              : dataList.state === 5
              ? "ข้อมูลแแก้ไขกลับมาตรวจสอบ"
              : dataList.state === 6
              ? "ตรวจสอบ:รอการยืนยันความถูกต้อง"
              : dataList.state === 7
              ? "ตรวจสอบ:ยืนยันความถูกต้อง"
              : "ไม่มีสถานะ"}
          </Typography>
          <Typography style={{ color: "blue", fontSize: 14 }}>
            transaction: {dataList.transactionId}{" "}
          </Typography>
          <Typography style={{ color: "gray", fontSize: 14 }}>
            {dataList.highway} / {dataList.checkpoint} / {dataList.gate}
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
        <Grid item sm={3} className={classes.cardItem}>
          {/* Audit Block */}
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>Audit</Typography>
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
                mockPic != 0
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
                mockPic != 0
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
                dataList.audit_pic_crop != 0
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
                mockPic != 0
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
                    กรมขนส่งทางบก
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ทะเบียน</TableCell>
                  <TableCell>{dataList.dlt_lp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จังหวัด</TableCell>
                  <TableCell>{dataList.dlt_lp_province}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>{dataList.dlt_class}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>{dataList.dlt_fee_ref}</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              display: "flex",
              justifyContent: "space-around",
              marginTop: 150,
            }}
          >
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              style={{ width: 130 }}
            >
              ลบรายการนี้
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              style={{
                width: 130,
                color: "white",
                backgroundColor: "orange",
              }}
              onClick={handleUpdateState4To5}
            >
              บันทึกแบบรายการพิเศษ
            </Button>
          </div>
        </Grid>

        {/* Audit-DVES block */}
        <Grid item sm={3} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>Audit DVES</Typography>
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
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
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
          <div style={{ marginLeft: "-20px", marginTop: 335 }}>
            <Button
              className={classes.btn}
              variant="contained"
              disabled={dataList.state === 6 ? false : true}
              style={{
                width: 130,
                color: "white",
                backgroundColor: "green",
              }}
              onClick={handleUpdateState6To7}
            >
              จนท.ตรวจสอบรับทราบ
            </Button>
          </div>
        </Grid>

        {/* Pk3 Block */}
        <Grid item sm={3}>
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
                mockPic != 0
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
                mockPic != 0
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
                mockPic != 0
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
            disabled={dataList.state !== 6 ? true : false}
            variant="outlined"
            label="ข้อความจากระบบจัดเก็บ"
            value={dataList.pk3_comment || ""}
            className={classes.disableLabel}
          />

          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead4}>
                  <TableCell colSpan={2} style={{ color: "white" }}>
                    ระบุข้อมูลสุดท้าย
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
                      name="super_audit_lp"
                      value={super_audit_lp}
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
                      name="super_audit_province"
                      value={super_audit_province}
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
                      name="super_audit_vehicleClass"
                      value={super_audit_vehicleClass || ""}
                      onChange={handleOptionChange}
                    >
                      {!!dataList.dropdown_audit_vehicelClass
                        ? dataList.dropdown_audit_vehicelClass.map(
                            (item, index) => (
                              <MenuItem
                                key={item.id}
                                data-index={index}
                                value={item.class}
                              >
                                {item.class}
                              </MenuItem>
                            )
                          )
                        : []}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      name="super_audit_feeAmount"
                      // select
                      value={
                        // super_audit_vehicleClass === "C1"
                        //   ? 30
                        //   : super_audit_vehicleClass === "C2"
                        //     ? 50
                        //     : super_audit_vehicleClass === "C3" ? 70
                        //       : ""
                        super_audit_feeAmount
                      }
                      // className={classes.textField}
                      // onChange={handleChange}
                    />
                    {/* {!!dataList.dropdown_audit_feeAmount
                        ? dataList.dropdown_audit_feeAmount.map((item) => (
                            <option key={item.id} value={item.fee}>
                              {item.fee}
                            </option>
                          ))
                        : []}
                    </TextField> */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* Audit Block */}
        <Grid item sm={3}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>DEVS</Typography>
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
                  <TableCell>{dataList.audit_lp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จังหวัด</TableCell>
                  <TableCell>{dataList.audit_province}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>{dataList.audit_vehicleClass}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>{dataList.audit_feeAmount}</TableCell>
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
          />

          <div
            style={{
              // display: "flex",
              // justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 70,
            }}
          >
            <TextField
              disable={dataList.state === 6 ? true : false}
              style={{ width: "100%", height: 20, padding: "10px" }}
              name="super_audit_comment"
              label="คำสั่งแก้ไข"
              value={super_audit_comment || ""}
              onChange={handleChange}
            />
            <Button
              disable={dataList.state === 6 ? true : false}
              variant="contained"
              color="primary"
              style={{ top: 17, marginTop: 10, float: "right" }}
              // endIcon={<SendTwoToneIcon fontSize="small" />}
              onClick={handleUpdateState4To6}
            >
              ส่งคำสั่งแก้ไข
            </Button>
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
