import {
  Button,
  CardMedia,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import p_login from "../image/p_login.jpg";
import logo_doh from "../image/logo_doh.png";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const useStyle = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#933583",
      height: "100vh",
      paddingTop: "4%",
    },
    paper: {
      display: "flex",
      width: "60%",
      height: "75%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    leftSide: {},
    rightSide: {},
    typography: {
      fontSize: "1.5rem",
    },
    form: {
      marginRight: "auto",
      marginLeft: "auto",
    },
    btn: {
      marginTop: "2rem",
      width: 100,
      height: 40,
    },
    textField: {
      marginTop: 20,
      width: 340,
    },
  };
});

const apiURL = axios.create({
  baseURL: "http://202.183.167.92:5010/audit/api/",
});

export default function Login() {
  const classes = useStyle();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [resData, setResData] = useState({
    status: "",
    result: [
      { user_id: "", username: "", department_id: "", permission_id: "" },
    ],
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    
    try {
      apiURL
        .post("/auth", {
          username: state.username,
          password: state.password,
        })
        .then((res) => {
          setResData(res.data);
        });
    } catch (error) {
      alert(error);
    }

    console.log(state.username, state.password);
  };
  if (resData.status === true) {
    return <Redirect to="/dashboard" />;
  } else if (resData.status === false) {
    // console.log("false");
    // Swal.fire({
    //   icon: "error",
    //   text: "ตรวจสอบ username และ password ของท่าน",
    // });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item className={classes.leftSide} md={6}>
            <CardMedia
              component="img"
              image={p_login}
              style={{ height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid item className={classes.rightSide} sm={12} md={6}>
            <CardMedia
              component="image"
              image={logo_doh}
              style={{
                maxWidth:190,
                height: "auto%",
                width: "100%",
                marginTop: "2rem",
                marginBottom: "2rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Typography
              variant="body1"
              align="center"
              className={classes.typography}
            >
              ระบบตรวจสอบรายได้
            </Typography>
            <Typography
              variant="body1"
              align="center"
              className={classes.typography}
            >
              กรมทางหลวง
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <TextField
                  className={classes.textField}
                  id="user"
                  label="ผู้ใช้งาน"
                  value={state.username}
                  variant="outlined"
                  name="username"
                  onChange={handleChange}
                />
                <TextField
                  className={classes.textField}
                  id="password"
                  label="รหัสผ่าน"
                  type="password"
                  value={state.password}
                  variant="outlined"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  เข้าสู่ระบบ
                </Button>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="secondary"
                >
                  ยกเลิก
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
