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
  Box,
  Paper,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CameraEnhanceTwoToneIcon from "@material-ui/icons/CameraEnhanceTwoTone";
import Logo_doh from "../image/Logo_doh.png";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import Cookies from "js-cookie";
import { format } from "date-fns";

const apiURLv1 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
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
    bodyModal: {
      height: "auto",
      width: "90%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      [theme.breakpoints.only("md")]: {
        marginTop: "90%",
      },
      [theme.breakpoints.only("sm")]: {
        marginTop: "120%",
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
      height: "100%",
      Width: "100%",
      border: "1px solid lightgray",
      position: "absolute",
      objectFit: "cover",
    },
    imageWrap: {
      height: "0",
      paddingBottom: "45%",
      position: "relative",
      overflow: "hidden",
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
    smallText: {
      "& .MuiOutlinedInput-input": {
        height: "30px",
        fontSize: "0.75rem",
        padding: "0px 5px",
      },
    },
    disableLabel2: {
      "& .MuiOutlinedInput-input": {
        height: "30px",
        fontSize: "0.75rem",
        padding: "0px 5px",
      },
    },
    tableContainer: {
      height: "20vh",
      [theme.breakpoints.down("lg")]: {
        height: "25vh",
      },
    },
  };
});

export default function ModalPK3Activity(props) {
  const classes = useStyle();
  const { dataList, dropdown, checkDate, page } = props;

  const [value1, setValue1] = useState(2);
  const [value2, setValue2] = useState(2);
  const [value3, setValue3] = useState(2);
  const [value4, setValue4] = useState(2);
  const [value5, setValue5] = useState(2);
  const [value6, setValue6] = useState(2);

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
  const handleChangeTabs5 = (event, newValue) => {
    setValue5(newValue);
  };
  const handleChangeTabs6 = (event, newValue) => {
    setValue6(newValue);
  };

  const mockPic = 0;
  const [state, setState] = useState({
    operation: "",
    commentSuper: "",
    commentPK3: "",
    TransactionsPeat: "",
  });
  const { commentSuper, operation, commentPK3, TransactionsPeat } = state;

  const [vehicleClass, setVehicleClass] = useState(0);
  const [audit_feeAmount, setAudit_feeAmount] = useState("");
  const [audit_vehicleClass_id, setAudit_vehicleClass_id] = useState(0);
  const [resultDisplay, setResultDisplay] = useState([]);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const [selectFile, setSelectFile] = useState("");
  const [fileName, setFileName] = useState("");

  const upload = () => {
    const URL = `${process.env.REACT_APP_BASE_URL_V1}`;
    const getDate = format(checkDate, "yyyy-MM-dd");
    console.log(getDate);
    let formData = new FormData();
    formData.append("file", selectFile);
    formData.append("date", getDate);
    formData.append("transactionId", dataList.resultsDisplay[0].transactionId);

    if (fileName !== "") {
      axios
        .post(`${URL}/pk3-upload-file`, formData)
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              title: "Success",
              text: "????????????????????????????????????????????????????????????????????????????????????????????????",
              icon: "success",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Fail",
              text: "??????????????????????????????????????????????????????????????????",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        })
        .then(() => setFileName(""));
    }
  };

  const handleOptionChange = (event) => {
    const index = event.target.value;
    setVehicleClass(index);
    setAudit_vehicleClass_id(dropdown.vehicle[index].id);
    setAudit_feeAmount(dropdown.vehicle[index].fee);

    console.log(
      `super_audit_feeAmount: ${audit_feeAmount}
        super_audit_vehicleClass: ${vehicleClass}
        event.target.value: ${index}`
    );
  };

  const handleUpdate = () => {
    let endPointURL = "/operation";

    const date = format(checkDate, "yyyy-MM-dd");

    const sendData = {
      date: date,
      user_id: Cookies.get("userId"),
      transactionId: dataList.resultsDisplay[0].transactionId,
      state: dataList.resultsDisplay[0].state,
      vehicleClass: vehicleClass || "0",
      fee: audit_feeAmount || "0",
      status: dataList.resultsDisplay[0].match_transaction_type,
      operation: state.operation,
      pk3_comment: state.commentPK3,
      super_audit_comment: "",
      ts_duplication: state.TransactionsPeat,
    };

    Swal.fire({
      text: "??????????????????????????????????????????????????????????????????!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "??????????????????",
      cancelButtonText: "??????????????????",
      zIndex: 1300,
    })
      .then((result) => {
        if (result.isConfirmed) {
          apiURLv1
            .post(endPointURL, sendData)
            .then((res) => {
              if (res.data.status === true) {
                Swal.fire({
                  title: "Success",
                  text: "??????????????????????????????????????????????????????????????????????????????",
                  icon: "success",
                  confirmButtonText: "OK",
                });
              } else {
                Swal.fire({
                  title: "Fail",
                  text: "???????????????????????????????????????????????????????????????",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            })
            .catch((error) => {
              // handleClose();
              Swal.fire({
                icon: "error",
                text: "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
              });
            });
        }
      })
      .then(() => {
        props.onClick();
        setTimeout(() => {
          props.onFetchData(page);
        }, 2000);
      });
  };

  useEffect(() => {
    if (dataList) {
      setState(dataList);
      setVehicleClass(dataList.vehicleClass);
      setAudit_feeAmount(dataList.audit_feeAmount);
      setAudit_vehicleClass_id(dataList.audit_vehicleClass_id);
      setResultDisplay(
        !!dataList.resultsDisplay ? dataList.resultsDisplay[0] : []
      );
      setState({
        ...state,
        TransactionsPeat: "",
        commentPK3: "",
        operation: "",
      });
      setFileName("");

      console.log("dataList", dataList);
    }
  }, [dataList]);

  const body = (
    <div className={classes.bodyModal}>
      <div className={classes.head}>
        <div style={{ width: "100%" }}>
          <Box
            style={{
              backgroundColor:
                !!dataList.resultsDisplay &&
                dataList.resultsDisplay[0].state === 1
                  ? "lightgray"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 2
                  ? "red"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 3
                  ? "blue"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 4
                  ? "orange"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 5
                  ? "black"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 6
                  ? "darkviolet"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 7
                  ? "lightblue"
                  : "none",
              width: "100%",
              display: "flex",
              justifyItems: "center",
              flexWrap: "wrap",
              columnGap: "1rem",
            }}
          >
            <Typography
              variant="h6"
              style={{ color: "white", paddingLeft: 20 }}
            >
              {!!dataList.resultsDisplay
                ? dataList.resultsDisplay[0].state === 1
                  ? "????????????"
                  : dataList.resultsDisplay[0].state === 2
                  ? "?????????????????????"
                  : dataList.resultsDisplay[0].state === 3
                  ? "?????? pk3 ?????????????????????"
                  : dataList.resultsDisplay[0].state === 4
                  ? "?????? super audit ?????????????????????"
                  : dataList.resultsDisplay[0].state === 5
                  ? "?????? ????????????????????????????????????"
                  : dataList.resultsDisplay[0].state === 6
                  ? "????????????????????????????????????????????????"
                  : dataList.resultsDisplay[0].state === 7
                  ? "?????????????????????????????????????????????"
                  : "??????????????????????????????"
                : ""}
            </Typography>

            <Typography
              style={{
                color: "white",
                fontSize: "0.8rem",
                paddingTop: 8,
              }}
            >
              {`transaction :
            ${
              !!dataList.resultsDisplay
                ? dataList.resultsDisplay[0].transactionId
                : ""
            }`}
            </Typography>
            <Typography
              style={{
                color: "white",
                fontSize: "0.8rem",
                paddingTop: 8,
              }}
            >
              {`${
                !!dataList.resultsDisplay
                  ? dataList.resultsDisplay[0].match_checkpoint
                  : ""
              } / ${
                !!dataList.resultsDisplay
                  ? dataList.resultsDisplay[0].match_gate
                  : ""
              }`}
            </Typography>
          </Box>
        </div>
        <div>
          <Tooltip title="close">
            <CancelTwoToneIcon
              fontSize="small"
              color="secondary"
              onClick={props.onClick}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                paddingTop: 5,
                color: "red",
              }}
            />
          </Tooltip>
        </div>
      </div>
      <Grid container spacing={1}>
        {/* AD vehicle section */}
        <Grid item sm={6} md={6} lg={2} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>AD (Vehicle)</Typography>
          </div>
          <div>
            <Tabs
              value={value5}
              onChange={handleChangeTabs5}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
              className={classes.tabs}
            >
              <Tab
                label="???????????? 2 ?????????"
                {...a11yProps(0)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="???????????? 1 ?????????"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????????????????"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel4 value={value5} index={0}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
        </Grid>

        <Grid item sm={6} md={6} lg={2} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>AD (overview)</Typography>
          </div>
          <div>
            <Tabs
              value={value6}
              onChange={handleChangeTabs6}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
              className={classes.tabs}
            >
              <Tab
                label="???????????? 2 ?????????"
                {...a11yProps(0)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="???????????? 1 ?????????"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????????????????"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel4 value={value6} index={0}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
        </Grid>

        <Grid item sm={6} md={6} lg={2} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>ML (Vehicle)</Typography>
          </div>
          <div>
            <Tabs
              value={value4}
              onChange={handleChangeTabs4}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
              className={classes.tabs}
            >
              <Tab
                label="???????????? 2 ?????????"
                {...a11yProps(0)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="???????????? 1 ?????????"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????????????????"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel4 value={value4} index={0}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value4} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  dataList.mf_lane_picFull !== 0
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value4} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.mf_lane_picFull
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value4} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TableContainer className={classes.tableContainer}>
            <table className={classes.table} style={{ marginBottom: 58 }}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ??????????????????????????????????????????????????? (AD : ????????????)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.audit_check_vehicleClass
                      ? "C" + resultDisplay.audit_check_vehicleClass
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ?????????????????????
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>???????????? 1</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_fine_t1
                      ? resultDisplay.match_fine_t1
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>???????????? 2</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_fine_t2
                      ? resultDisplay.match_fine_t2
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>???????????? 3</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_fine_t3
                      ? resultDisplay.match_fine_t3
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* ML (LP) Block */}
        <Grid item sm={6} md={6} lg={2} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>ML (LP)</Typography>
          </div>
          <div>
            <Tabs
              value={value1}
              onChange={handleChangeTabs1}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
              className={classes.tabs}
            >
              <Tab
                label="???????????? 2 ?????????"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="???????????? 1 ?????????"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????????????????"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel1 value={value1} index={0}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel1>
          <TabPanel1 value={value1} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? // ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                      Logo_doh
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel1>
          <TabPanel1 value={value1} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.mf_lane_picCrop
                    ? `data:image/png;base64, ${dataList.mf_lane_picCrop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel1>
          <TabPanel1 value={value1} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel1>
          <TableContainer className={classes.tableContainer}>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ??????????????????????????????????????????????????? (ML : ????????????????????????)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    {!!resultDisplay.mf_lane_tranId
                      ? resultDisplay.mf_lane_tranId
                      : "-"}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                    <TableCell>?????????????????????</TableCell>
                    <TableCell>
                      {!!resultDisplay.mf_lane_plateNo1
                        ? resultDisplay.mf_lane_plateNo1
                        : "-"}
                    </TableCell>
                  </TableRow> */}
                {/* <TableRow>
                    <TableCell>?????????????????????</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow> */}
                <TableRow>
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.mf_lane_vehicleClass
                      ? "C" + resultDisplay.mf_lane_vehicleClass
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ?????????????????????
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>????????????????????? (???????????????????????????????????? + ?????????????????????)</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_total_cost
                      ? resultDisplay.match_total_cost
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>????????????????????????</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>????????????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_cost_dif
                      ? resultDisplay.match_cost_dif
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* MF (Vehicle : HQ)  Block */}
        <Grid item sm={6} md={6} lg={2}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>
              MF (Vehicle : HQ){" "}
            </Typography>
          </div>
          <div>
            <Tabs
              value={value2}
              onChange={handleChangeTabs2}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
              className={classes.tabs}
            >
              <Tab
                label="???????????? 2 ?????????"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="???????????? 1 ?????????"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????????????????"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel2 value={value2} index={0}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.mf_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.mf_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.imageFile
                    ? `data:image/png;base64, ${dataList.imageFile}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.mf_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel2>
          <TableContainer className={classes.tableContainer}>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead2}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ??????????????????????????????????????????????????? (MF : ??????????????? HQ)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    {!!resultDisplay.pk3_transactionId
                      ? resultDisplay.pk3_transactionId
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.vehicleClass
                      ? "C" + resultDisplay.vehicleClass
                      : "-"}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                    <TableCell>?????????????????????</TableCell>
                    <TableCell>
                      {dataList.mf_lp_province === null
                        ? "-"
                        : dataList.mf_lp_province}
                    </TableCell>
                  </TableRow> */}
                <TableRow>
                  <TableCell>????????????????????????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.billing_fee
                      ? resultDisplay.billing_fee
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>?????????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.cameras_plateNo1
                      ? resultDisplay.cameras_plateNo1
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ???????????????????????????
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>File ??????????????????????????????</TableCell>
                  <TableCell>
                    <Button
                      style={{ marginLeft: -7.5 }}
                      onClick={() =>
                        document.getElementById("raised-button-file").click()
                      }
                    >
                      <label htmlFor="raised-button-file">
                        <TextField
                          id="upload"
                          disabled
                          variant="outlined"
                          className={classes.disableLabel2}
                          label="choose file here"
                          size="small"
                          defaultValue="Small"
                          value={fileName}
                          InputLabelProps={{
                            style: {
                              fontSize: "0.65rem",
                            },
                          }}
                        />
                      </label>
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.btn}
                      color="secondary"
                      onClick={() => {
                        upload();
                      }}
                      style={{
                        fontSize: "0.7rem",
                        marginTop: 1,
                      }}
                    >
                      upload
                    </Button>
                    <input
                      // accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      id="raised-button-file"
                      // multiple
                      type="file"
                      onChange={(e) => {
                        setFileName(
                          !!e.target.files[0] ? e.target.files[0].name : ""
                        );
                        setSelectFile(e.target.files[0]);
                        console.log(selectFile);
                        // console.log(ref.current.value.split("\\").pop());
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TS ??????????????????</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-basic"
                      name="TransactionsPeat"
                      variant="outlined"
                      onChange={handleChange}
                      className={classes.smallText}
                      value={state.TransactionsPeat}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>?????????????????????????????????????????????</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-basic"
                      name="commentPK3"
                      variant="outlined"
                      onChange={handleChange}
                      className={classes.smallText}
                      value={state.commentPK3}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>???????????????????????? super audit</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* MF (LP : HQ) Block */}
        <Grid item sm={6} md={6} lg={2}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>MF (LP : HQ)</Typography>
          </div>
          <div>
            <Tabs
              value={value3}
              onChange={handleChangeTabs3}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
              className={classes.tabs}
            >
              <Tab
                label="???????????? 2 ?????????"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="???????????? 1 ?????????"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????????????????"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="??????????????????"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel3 value={value3} index={0}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.imageFileCrop
                    ? `data:image/png;base64, ${dataList.imageFileCrop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel3>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead3}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ????????????????????????
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>????????????????????????????????????</TableCell>
                  <TableCell>
                    <TextField
                      select
                      variant="outlined"
                      size="small"
                      className={classes.textField2}
                      name="operation"
                      value={operation}
                      onChange={handleChange}
                    >
                      {!!dataList.resultsDisplay &&
                      dataList.resultsDisplay[0].state === 3
                        ? dropdown.operation_key
                            .filter((item) => item.id === 1 || item.id === 2)
                            .map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))
                        : []}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>?????????????????? TS</TableCell>
                  <TableCell>
                    {!!dataList.resultsDisplay
                      ? dataList.resultsDisplay[0].state === 1
                        ? "????????????"
                        : dataList.resultsDisplay[0].state === 2
                        ? "?????????????????????"
                        : dataList.resultsDisplay[0].state === 3
                        ? "?????? pk3 ?????????????????????"
                        : dataList.resultsDisplay[0].state === 4
                        ? "?????? super audit ?????????????????????"
                        : dataList.resultsDisplay[0].state === 5
                        ? "?????? ????????????????????????????????????"
                        : dataList.resultsDisplay[0].state === 6
                        ? "????????????????????????????????????????????????"
                        : "??????????????????????????????"
                      : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      select
                      size="small"
                      className={classes.textField2}
                      name="vehicleClass"
                      value={vehicleClass}
                      onChange={handleOptionChange}
                      disabled
                    >
                      {!!dropdown.vehicle
                        ? dropdown.vehicle
                            .filter((item) => item.id !== 0)
                            .map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.class}
                              </MenuItem>
                            ))
                        : []}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>????????????????????????????????????</TableCell>
                  <TableCell style={{ width: 20 }}>{audit_feeAmount}</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
          <div
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 96, float: "right" }}
              // endIcon={<SendTwoToneIcon fontSize="small" />}
              onClick={handleUpdate}
              disabled={
                !!operation && operation === 1
                  ? false
                  : !!operation && operation === 2
                  ? false
                  : true
              }
            >
              ??????????????????
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
          zIndex: 3,
          overflow: "scroll",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
