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
import { Link } from "react-router-dom";
import ModalExpandedImage from "./ModalExpandedImage";
import ModalExpandedImage2 from "./ModalExpandedImage2";
import { operation } from "../service/allService";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});
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
      height: "100%",
      Width: "100%",
      border: "1px solid lightgray",
      position: "absolute",
      objectFit: "cover",
      cursor: "pointer",
      "&:hover": {
        transition: "transform 1s, filter 2s ease-in-out",
        filter: "blur(2px)",
        transform: "scale(1.2)",
      },
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
    btn2: {
      color: "white",
      width: "100%",
      marginTop: 8,
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
    tableContainer: {
      height: "20vh",
      [theme.breakpoints.down("lg")]: {
        height: "25vh",
      },
    },
  };
});

export default function ModalSuperActivity2(props) {
  const classes = useStyle();

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [open10, setOpen10] = useState(false);
  const [open11, setOpen11] = useState(false);
  const [open12, setOpen12] = useState(false);
  const [open13, setOpen13] = useState(false);
  const [open14, setOpen14] = useState(false);
  const [open15, setOpen15] = useState(false);
  const [open16, setOpen16] = useState(false);
  const [open17, setOpen17] = useState(false);
  const [open18, setOpen18] = useState(false);
  const [open19, setOpen19] = useState(false);
  const [open20, setOpen20] = useState(false);
  const [open21, setOpen21] = useState(false);
  const [open22, setOpen22] = useState(false);
  const [open23, setOpen23] = useState(false);
  const [open24, setOpen24] = useState(false);

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

  const download = () => {
    let fileType = resultDisplay.pk3_upload_file.split("/")[4];
    console.log(fileType);
    const header = {
      "Content-Type": "application",
      responseType: "blob",
    };
    const sendData = {
      transactionId: resultDisplay.transactionId,
      date: format(checkDate, "yyyy-MM-dd"),
    };
    apiURLv1.post("/download-file-pk3", sendData, header).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileType}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      console.log(res.data);
      console.log(url);
    });
  };

  const mockPic = 0;
  const [state, setState] = useState({});

  const [commentSuper, setCommentSuper] = useState("");
  const [vehicleClass, setVehicleClass] = useState(0);
  const [audit_feeAmount, setAudit_feeAmount] = useState("");
  const [audit_vehicleClass_id, setAudit_vehicleClass_id] = useState(0);
  const [resultDisplay, setResultDisplay] = useState([]);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(state.commentSuper);
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

  const handleUpdate1 = async () => {
    const date = format(checkDate, "yyyy-MM-dd");

    let setOperation = 8;

    // if (
    //   dataList.resultsDisplay[0].state === 4 &&
    //   (dataList.resultsDisplay[0].match_transaction_type === 2 ||
    //     dataList.resultsDisplay[0].match_transaction_type === 3 ||
    //     dataList.resultsDisplay[0].match_transaction_type === 7 ||
    //     dataList.resultsDisplay[0].match_transaction_type === 6 ||
    //     dataList.resultsDisplay[0].match_transaction_type === 8)
    // ) {
    //   setOperation = 8;
    // } else {
    //   setOperation = 8;
    // }

    const sendData = {
      date: date,
      user_id: Cookies.get("userId"),
      transactionId: dataList.resultsDisplay[0].transactionId,
      state: dataList.resultsDisplay[0].state,
      vehicleClass: vehicleClass,
      fee: audit_feeAmount,
      status: dataList.resultsDisplay[0].match_transaction_type,
      operation: setOperation.toString(),
      pk3_comment: state.commentPK3,
      super_audit_comment: commentSuper,
      ts_duplication: state.TransactionsPeat,
      match_transaction_type:
        dataList.resultsDisplay[0].match_transaction_type.toString(),
    };

    const result = await Swal.fire({
      text: "??????????????????????????????????????????????????????????????????!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "??????????????????",
      cancelButtonText: "??????????????????",
    });

    const res = await operation(sendData);
    if (result.isConfirmed) {
      if (!!res && res.data.status === true) {
        Swal.close();
        await Swal.fire({
          title: "Success",
          text: "??????????????????????????????????????????????????????????????????????????????",
          icon: "success",
        });
        await props.onClick();
        await props.onFetchData(page);
      } else {
        Swal.close();
        await Swal.fire({
          title: "Fail",
          text: "???????????????????????????????????????????????????????????????",
          icon: "error",
        });
      }
    }
  };

  const handleUpdate2 = async () => {
    const date = format(checkDate, "yyyy-MM-dd");

    let setOperation = 9;

    // if (
    //   dataList.resultsDisplay[0].state === 4 &&
    //   (dataList.resultsDisplay[0].match_transaction_type === 2 ||
    //     dataList.resultsDisplay[0].match_transaction_type === 3 ||
    //     dataList.resultsDisplay[0].match_transaction_type === 7 ||
    //     dataList.resultsDisplay[0].match_transaction_type === 6 ||
    //     dataList.resultsDisplay[0].match_transaction_type === 8)
    // ) {
    //   setOperation = 9;
    // } else {
    //   setOperation = 0;
    // }

    const sendData = {
      date: date,
      user_id: Cookies.get("userId"),
      transactionId: dataList.resultsDisplay[0].transactionId,
      state: dataList.resultsDisplay[0].state,
      vehicleClass: vehicleClass,
      fee: audit_feeAmount,
      status: dataList.resultsDisplay[0].match_transaction_type,
      operation: setOperation.toString(),
      pk3_comment: state.commentPK3,
      super_audit_comment: commentSuper,
      ts_duplication: state.TransactionsPeat,
      match_transaction_type:
        dataList.resultsDisplay[0].match_transaction_type.toString(),
    };

    const result = await Swal.fire({
      text: "??????????????????????????????????????????????????????????????????!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "??????????????????",
      cancelButtonText: "??????????????????",
    });

    const res = await operation(sendData);
    if (result.isConfirmed) {
      if (!!res && res.data.status === true) {
        Swal.close();
        await Swal.fire({
          title: "Success",
          text: "??????????????????????????????????????????????????????????????????????????????",
          icon: "success",
        });
        await props.onClick();
        await props.onFetchData(page);
      } else {
        Swal.close();
        await Swal.fire({
          title: "Fail",
          text: "???????????????????????????????????????????????????????????????",
          icon: "error",
        });
      }
    }
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
      setVehicleClass(
        !!dataList.resultsDisplay
          ? dataList.resultsDisplay[0].match_real_vehicleClass
          : 0
      );
      setAudit_feeAmount(
        !!dataList.resultsDisplay
          ? dataList.resultsDisplay[0].match_real_fee
          : 0
      );
      setCommentSuper("");
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
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 8
                  ? "lightgreen"
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
              {`Status :
            ${
              !!dataList.resultsDisplay ? dataList.resultsDisplay[0].status : ""
            }`}
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
        <div style={{ position: "absolute", right: 35 }}>
          <Tooltip title="close">
            <CancelTwoToneIcon
              fontSize="small"
              color="secondary"
              onClick={props.onClick}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                paddingTop: 5,
                color: "white",
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
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic_full}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen1()}
              />
              <ModalExpandedImage2
                dataList={dataList.audit_pic_full}
                open={open1}
                onClose={() => setOpen1(false)}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_full
                    ? `data:image/png;base64, ${dataList.audit_pic_full}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen2()}
              />
              <ModalExpandedImage2
                dataList={dataList.audit_pic_crop}
                open={open2}
                onClose={() => setOpen2(false)}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_full
                    ? `data:image/png;base64, ${dataList.audit_pic_full}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen3()}
              />
              <ModalExpandedImage2
                dataList={dataList.audit_pic_crop}
                open={open3}
                onClose={() => setOpen3(false)}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_full
                    ? `data:image/png;base64, ${dataList.audit_pic_full}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen4()}
              />
              <ModalExpandedImage2
                dataList={dataList.audit_pic_crop}
                open={open4}
                onClose={() => setOpen4(false)}
              />
            </div>
          </TabPanel4>

          <TableContainer className={classes.tableContainer}>
            <table className={classes.table}>
              <TableHead>
                <TableRow
                  className={classes.tableHead1}
                  style={{ backgroundColor: "#ffc400" }}
                >
                  <TableCell colSpan={2} className={classes.headTable}>
                    ?????????????????????????????????????????????????????????
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>?????????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.cameras_plateNo1
                      ? resultDisplay.cameras_plateNo1
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>?????????????????????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.province_description
                      ? resultDisplay.province_description
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.brand_description
                      ? resultDisplay.brand_description
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>??????</TableCell>
                  <TableCell>
                    {!!resultDisplay.colors_description
                      ? resultDisplay.colors_description
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
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
                  !!dataList.audit_pic_crop
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen5()}
              />
              <ModalExpandedImage
                dataList={dataList.audit_pic_crop}
                open={open5}
                onClose={() => setOpen5(false)}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_crop
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen6()}
              />
              <ModalExpandedImage
                dataList={dataList.audit_pic_crop}
                open={open6}
                onClose={() => setOpen6(false)}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_crop
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen7()}
              />
              <ModalExpandedImage
                dataList={dataList.audit_pic_crop}
                open={open7}
                onClose={() => setOpen7(false)}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_crop
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen8()}
              />
              <ModalExpandedImage
                dataList={dataList.audit_pic_crop}
                open={open8}
                onClose={() => setOpen8(false)}
              />
            </div>
          </TabPanel4>

          <TableContainer className={classes.tableContainer}>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ?????????????????????????????????????????????????????????????????????
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>????????????????????????</TableCell>
                  <TableCell>{"-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>????????????</TableCell>
                  <TableCell>{"-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>????????????????????????</TableCell>
                  <TableCell>{"-"}</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
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
                  !!dataList.mf_lane_picFull_2
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull_2}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen9(true)}
              />
              <ModalExpandedImage2
                dataList={dataList.mf_lane_picFull_2}
                open={open9}
                onClose={() => setOpen9(false)}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value4} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.mf_lane_picFull_1
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull_1}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen10(true)}
              />
              <ModalExpandedImage2
                dataList={dataList.mf_lane_picFull_1}
                open={open10}
                onClose={() => setOpen10(false)}
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
                onClick={() => setOpen11(true)}
              />
              <ModalExpandedImage2
                dataList={dataList.mf_lane_picFull}
                open={open11}
                onClose={() => setOpen11(false)}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value4} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_full}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen12(true)}
              />
              <ModalExpandedImage2
                dataList={dataList.audit_pic_full}
                open={open12}
                onClose={() => setOpen12(false)}
              />
            </div>
          </TabPanel4>
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
                  !!dataList.mf_lane_picCrop_2
                    ? `data:image/png;base64, ${dataList.mf_lane_picCrop_2}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen13(true)}
              />
              <ModalExpandedImage
                dataList={dataList.mf_lane_picCrop_2}
                open={open13}
                onClose={() => setOpen13(false)}
              />
            </div>
          </TabPanel1>
          <TabPanel1 value={value1} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.mf_lane_picCrop_1
                    ? `data:image/png;base64, ${dataList.mf_lane_picCrop_1}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen14(true)}
              />
              <ModalExpandedImage
                dataList={dataList.mf_lane_picCrop_1}
                open={open14}
                onClose={() => setOpen14(false)}
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
                onClick={() => setOpen15(true)}
              />
              <ModalExpandedImage
                dataList={dataList.mf_lane_picCrop}
                open={open15}
                onClose={() => setOpen15(false)}
              />
            </div>
          </TabPanel1>
          <TabPanel1 value={value1} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen16(true)}
              />
              <ModalExpandedImage
                dataList={dataList.audit_pic_crop}
                open={open16}
                onClose={() => setOpen16(false)}
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
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.mf_lane_vehicleClass
                      ? `C${resultDisplay.mf_lane_vehicleClass}`
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lane_TS</TableCell>
                  <TableCell colSpan={2}>
                    {!!resultDisplay.mf_lane_tranId
                      ? resultDisplay.mf_lane_tranId
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
                    {!!resultDisplay.pk3_upload_file ? (
                      <Link onClick={download}>download</Link>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TS ??????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.ts_duplication
                      ? resultDisplay.ts_duplication
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>?????????????????????????????????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.pk3_comment
                      ? resultDisplay.pk3_comment
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>???????????????????????? super audit</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-basic"
                      name="commentSuper"
                      variant="outlined"
                      onChange={(e) => {
                        setCommentSuper(e.target.value);
                        console.log(commentSuper);
                      }}
                      className={classes.smallText}
                      value={commentSuper}
                    />
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
                  !!dataList.hp_picFull_2
                    ? `data:image/png;base64, ${dataList.hp_picFull_2}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen17(true)}
              />
              <ModalExpandedImage2
                dataList={dataList.hp_picFull_2}
                open={open17}
                onClose={() => setOpen17(false)}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.hp_picFull_1
                    ? `data:image/png;base64, ${dataList.hp_picFull_1}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen18(true)}
              />
              <ModalExpandedImage2
                dataList={dataList.hp_picFull_1}
                open={open18}
                onClose={() => setOpen18(false)}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.hp_picFull
                    ? `data:image/png;base64, ${dataList.hp_picFull}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen19(true)}
              />
              <ModalExpandedImage2
                dataList={dataList.hp_picFull}
                open={open19}
                onClose={() => setOpen19(false)}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audi_pic_full}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen20(true)}
              />
              <ModalExpandedImage2
                dataList={dataList.audi_pic_full}
                open={open20}
                onClose={() => setOpen20(false)}
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
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.vehicleClass
                      ? `C${resultDisplay.vehicleClass}`
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
                <TableRow>
                  <TableCell>?????????????????????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.province_description
                      ? resultDisplay.province_description
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HQ_TS</TableCell>
                  <TableCell colSpan={2}>
                    {!!resultDisplay.refTransactionId
                      ? resultDisplay.refTransactionId
                      : "-"}
                  </TableCell>
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
                  !!dataList.hq_picCrop_2
                    ? `data:image/png;base64, ${dataList.hq_picCrop_2}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen21(true)}
              />
              <ModalExpandedImage
                dataList={dataList.hq_picCrop_2}
                open={open21}
                onClose={() => setOpen21(false)}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.hq_picCrop_1
                    ? `data:image/png;base64, ${dataList.hq_picCrop_1}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen22(true)}
              />
              <ModalExpandedImage
                dataList={dataList.hq_picCrop_1}
                open={open22}
                onClose={() => setOpen22(false)}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.hq_picCrop
                    ? `data:image/png;base64, ${dataList.hq_picCrop}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen23(true)}
              />
              <ModalExpandedImage
                dataList={dataList.hq_picCrop}
                open={open23}
                onClose={() => setOpen23(false)}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic}`
                    : noImage
                }
                className={classes.image}
                onClick={() => setOpen24(true)}
              />
              <ModalExpandedImage
                dataList={dataList.audit_pic}
                open={open24}
                onClose={() => setOpen24(false)}
              />
            </div>
          </TabPanel3>

          <TableContainer className={classes.tableContainer}>
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
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_real_vehicleClass
                      ? `C${resultDisplay.match_real_vehicleClass}`
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>????????????????????????????????????</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_real_fee
                      ? resultDisplay.match_real_fee
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>??????????????????TS</TableCell>
                  <TableCell>
                    {!!resultDisplay.status ? resultDisplay.status : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow
                  className={classes.tableHead1}
                  style={{ backgroundColor: "lightgreen" }}
                >
                  <TableCell colSpan={2} className={classes.headTable}>
                    ????????????????????????????????????
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>??????????????????</TableCell>
                  <TableCell>
                    <TextField
                      // disabled={}
                      variant="outlined"
                      select
                      size="small"
                      className={classes.textField2}
                      name="vehicleClass"
                      value={vehicleClass}
                      onChange={handleOptionChange}
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
              </TableBody>
            </table>
          </TableContainer>
          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
              }}
              className={classes.btn2}
              onClick={handleUpdate1}
            >
              ??????????????????????????????????????????????????????????????????
            </Button>
            {!!resultDisplay.state &&
            resultDisplay.match_transaction_type !== 3 ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "red",
                }}
                className={classes.btn2}
                onClick={handleUpdate2}
              >
                ?????????????????????????????????????????????????????????????????????????????????
              </Button>
            ) : (
              ""
            )}
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
