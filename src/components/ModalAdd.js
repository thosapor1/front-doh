import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL: "http://202.183.167.92:5010/audit/api/",
});

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    modal: {
      width: "50%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalTextField: {
      margin: theme.spacing(1, 0, 0),
      width: 300,
    },
    btn2: {
      margin: theme.spacing(1, 1, 0, 0),
      backgroundColor: "#46005E",
    },
  };
});

export default function ModalAdd(props) {
  const classes = useStyle();
  

  const [inputModal, setInputModal] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    position_id: "",
    department_id: "",
    email: "",
    tel: "",
    permission_id: "",
    roadLine:'',
    station:''
  });

  const [status, setStatus] = useState({
    success: "",
    fail: "",
    warning: "",
  });

  const { success, fail, warning } = status;

  const {
    username,
    password,
    fname,
    lname,
    position_id,
    department_id,
    email,
    tel,
    permission_id,
    roadLine,
    station,
  } = inputModal;

  const [switch1, setSwitch] = useState({
    tc1: false,
    tc2: false,
    ty1: false,
    ty2: false,
  });

  const handleChange = (event) => {
    event.preventDefault();
    setInputModal({ ...inputModal, [event.target.name]: event.target.value });
    console.log(inputModal);
  };

  const handleSubmit = () => {
    apiURL
      .post("/add-user", {
        username: username,
        password: password,
        first_name: fname,
        last_name: lname,
        position_id: position_id,
        department_id: department_id,
        email: email,
        tel: tel,
        permission_id: "1",
      })
      .then((res) => setStatus({ success: res.data.status }));

    if (success === true) {
      // console.log("yes");
      props.onClose();
      Swal.fire({
        title: "Success!",
        text: "ข้อมูลของท่านถูกบันทึกแล้ว",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } else {
      props.onClose();
      Swal.fire({
        icon: "error",
        text: "ตรวจสอบข้อมูลของท่าน",
      });
      console.log("no");
    }
    // console.log("fromSubmit:", inputModal);
    // console.log(position_id);
  };

  const [showResult, setshowResult] = useState(false);

  const setSwitchFalse = () => {
    setSwitch({ tc1: false, tc2: false, ty1: false, ty2: false });
  };

  const body = (
    <div className={classes.modal}>
      <Typography variant="h6">เพิ่มผู้ใช้งาน</Typography>
      <Divider />
      <Grid Container style={{ marginTop: 20, display: "flex" }}>
        <Grid item md={6} style={{ textAlign: "center" }}>
          <TextField
            className={classes.modalTextField}
            fullWidth
            size="small"
            variant="outlined"
            label="username"
            name="username"
            onChange={handleChange}
            value={username}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="ชื่อ"
            name="fname"
            onChange={handleChange}
            value={fname}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="นามสกุล"
            name="lname"
            onChange={handleChange}
            value={lname}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="ตำแหน่ง"
            select
            onChange={handleChange}
            name="position_id"
            value={position_id}
          >
            <option value="1">หัวหน้างาน</option>
            <option value="2">เจ้าหน้าที่ตรวจสอบระบบ</option>
          </TextField>
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="หน่วยงาน(สังกัด)"
            select
            onChange={handleChange}
            name="department_id"
            value={department_id}
          >
            <option value="1">เจ้าหน้าที่ตรวจสอบรายได้</option>
            <option value="2">เจ้าหน้าที่ตรวจสอบระบบ</option>
          </TextField>
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="อีเมล"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="เบอร์โทรศัพท์"
            name="tel"
            onChange={handleChange}
            value={tel}
          />
        </Grid>

        {/* permission data */}
        <Grid item md={6} style={{ textAlign: "center" }}>
          <TextField
            className={classes.modalTextField}
            variant="outlined"
            select
            size="small"
            label="สายทาง"
            onChange={handleChange}
            name="roadLine"
            value={roadLine}
          >
            <option value="1" onClick={() => setshowResult(true)}>
              ทางหลวงหมายเลข 9
            </option>
            <option
              value="2"
              onClick={() => {
                setshowResult(false);
                setSwitchFalse();
              }}
            >
              SDFS
            </option>
          </TextField>
          {showResult ? (
            <TextField
              select
              variant="outlined"
              className={classes.modalTextField}
              size="small"
              label="ด่าน"
              name="station"
              value={station}
            >
              <option value="1">ทับช้าง1</option>
              <option value="2">ทับช้าง2</option>
              <option value="3">ธัญบุรี1</option>
              <option value="4">ธัญบุรี2</option>
              <option value="5">ทุกด่าน</option>
            </TextField>
          ) : null}
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 25 }} />
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn2}
          onClick={handleSubmit}
        >
          บันทึก
        </Button>
        <Button
          variant="contained"
          className={classes.btn2}
          onClick={props.onClick}
          style={{ backgroundColor: "lightgray" }}
        >
          กลับ
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
