import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  makeStyles,
  Modal,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CameraEnhanceTwoToneIcon from "@material-ui/icons/CameraEnhanceTwoTone";
import Logo_doh from "../image/Logo_doh.png";
import P_login from "../image/P_login.jpg";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import RemoveTwoToneIcon from "@material-ui/icons/RemoveTwoTone";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    modal: {
      width: "60%",
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
    },
    btn: {
      margin: theme.spacing(1),
    },
    textField: {
      height: 20,
      bottom: 5,
      width: 130,
    },
  };
});

export default function ModalActivity(props) {
  const classes = useStyle();
  const { dataList } = props;

  const [state, setState] = useState({
    dlt_lp: "",
    dlt_lp_province: "",
    dlt_class: "",
    dlt_fee_ref: "",
  });
  const handleChange = (event) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });

    console.log(state.dlt_lp, event.target.value);
  };

  useEffect(() => {
    if (dataList) setState(dataList);
    console.log("state", state, "dataList", dataList);
  }, []);

  const body = (
    <div className={classes.modal}>
      <div className={classes.head}>
        <div>
          <Typography>ผิดประเภท</Typography>
          <Typography style={{color:"blue"}}>transaction: {dataList.transactionId} </Typography>
          <Typography>
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
        <Grid item sm={4} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>Audit</Typography>
          </div>
          <div>
            <CardMedia
              component="img"
              src={
                dataList.audit_pic_crop != 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </div>
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
        </Grid>

        <Grid item sm={4}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>ALPR</Typography>
          </div>
          <CardMedia image={noImage} className={classes.image} />
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
        </Grid>

        <Grid item sm={4}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>DEVS</Typography>
          </div>
          <CardMedia
            component="img"
            src={
              dataList.audit_pic_crop != 0
                ? `data:image/png;base64, ${dataList.audit_pic}`
                : noImage
            }
            className={classes.image}
          />
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
                      name="plate"
                      value={dataList.audit_lp}
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
                      name="plateProvince"
                      value={dataList.audit_province}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      className={classes.textField}
                      name="class"
                      value={dataList.audit_vehicleClass}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      name="fee"
                      select
                      value={dataList.dlt_fee_ref}
                      className={classes.textField}
                      onChange={handleChange}
                    >
                      {!!dataList.audit_feeAmount
                        ? dataList.audit_feeAmount.map((item) => (
                            <option key={item.fee} value={item.fee}>
                              {item.fee}
                            </option>
                          ))
                        : []}
                    </TextField>
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
              style={{ width: 180, height: 20, padding: "10px" }}
              name="command"
              label="คำสั่งแก้ไข"
              value={dataList.audit_comment}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ top: 17 }}
              endIcon={<SendTwoToneIcon fontSize="small" />}
            >
              ส่งคำสั่งแก้ไข
            </Button>
          </div>
        </Grid>
      </Grid>
      <div>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          สร้างรายการใหม่
        </Button>
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          startIcon={<RemoveTwoToneIcon fontSize="small" />}
        >
          ลบรายการนี้
        </Button>
      </div>
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
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
