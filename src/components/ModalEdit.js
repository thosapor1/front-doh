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
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL: "http://202.183.167.92:3010/audit/api/v2",
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

export default function ModalEdit(props) {
  const classes = useStyle();

  const [inputModal, setInputModal] = useState({
    user_id: "",
    username: "",
    password: "",
    fname: "",
    lname: "",
    position_id: "",
    department_id: "",
    email: "",
    tel: "",
    permission_id: "",
    highway_id: "",
    checkpoint_id: "",
  });

  const [status, setStatus] = useState();

  const {
    user_id,
    username,
    password,
    fname,
    lname,
    position_id,
    department_id,
    email,
    tel,
    highway_id,
    checkpoint_id,
  } = inputModal;

  const handleChange = (event) => {
    event.preventDefault();
    setInputModal({ ...inputModal, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    const sendData = {
      user_id: user_id,
      username: username,
      first_name: fname,
      last_name: lname,
      position_id: position_id,
      department_id: department_id,
      email: email,
      tel: tel,
      highway_id: highway_id,
      checkpoint_id: checkpoint_id,
      permission_id: position_id,
      password: password
    };
    console.log(sendData);
    apiURL.post("/update-user", sendData).then((res) => {
      setStatus({ status: res.data.status });
      console.log(res.data);
      props.onClose();
      Swal.fire({
        title: "Success!",
        text: "ข้อมูลของท่านถูกแก้ไขแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        window.location.reload();
      });
      console.log("yes");
    });

    if (status === true) {
    }
    if (status === false) {
      props.onClose();
      Swal.fire({
        icon: "error",
        text: "ตรวจสอบข้อมูลของท่าน",
      });
      console.log("no");
    }
  };

  const [showResult, setshowResult] = useState(false);

  useEffect(() => {
    if (props.dataForEdit) setInputModal(props.dataForEdit);
    console.log("dataModal", props.dataForEdit);
  }, [props.dataForEdit]);

  const body = (
    <div className={classes.modal}>
      <Typography variant="h6">แก้ไขข้อมูล</Typography>
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
            <option key="1" value="1">
              super admin
            </option>
            <option key="2" value="2">
              หัวหน้างาน
            </option>
            <option key="3" value="3">
              เจ้าหน้าที่
            </option>
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
            name="highway_id"
            value={highway_id}
          >
            <option key="1" value="1" onClick={() => setshowResult(true)}>
              ทางหลวงหมายเลข 9
            </option>
            <option
              key="2"
              value="2"
              onClick={() => {
                setshowResult(false);
              }}
            >
              SDFS
            </option>
          </TextField>
          {showResult == 1 ? (
            <TextField
              select
              variant="outlined"
              className={classes.modalTextField}
              size="small"
              label="ด่าน"
              name="checkpoint_id"
              value={checkpoint_id}
              onChange={handleChange}
            >
              <option key="0" value="0">
                ทุกด่าน
              </option>
              <option key="1" value="1">
                ทับช้าง1
              </option>
              <option key="2" value="2">
                ทับช้าง2
              </option>
              <option key="3" value="3">
                ธัญบุรี1
              </option>
              <option key="4" value="4">
                ธัญบุรี2
              </option>
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
          onClick={handleUpdate}
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
