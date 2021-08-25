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
import P_login from "../image/P_login.jpg";
import Logo_doh from "../image/Logo_doh.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

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
  baseURL: "http://202.183.167.92:3010/audit/api/v2",
});

export default function Login() {
  const classes = useStyle();

  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(userName, password);

    const sendData = {
      username: userName,
      password: password,
    };

    apiURL.post("/auth", sendData).then((res) => {
      console.log("res:", res.data);
      const setCookies = () => {
        Cookies.set("checkpoint_id", res.data.result[0].checkpoint_id);
        Cookies.set("department_id", res.data.result[0].department_id);
        Cookies.set("highway_id", res.data.result[0].highway_id);
        Cookies.set("id", res.data.result[0].id);
        Cookies.set("permission_id", res.data.result[0].permission_id);
        Cookies.set("position_id", res.data.result[0].position_id);
        Cookies.set("username", res.data.result[0].username);
      };

      if (res.data.status == true && res.data.result[0].department_id == 1) {
        console.log("pass", res.data.status);
        setCookies()
        history.push("/dashboard");
      } else if (
        res.data.status == true &&
        res.data.result[0].department_id == 2
      ) {
        setCookies()
        history.push("/pk3Display");
        console.log("res:", res.data);
      } else {
        console.log("res:", res.data);
        Swal.fire({
          icon: "error",
          text: "ตรวจสอบ username และ password ของท่าน",
        });
      }
    });

    // console.log(state.username, state.password);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item className={classes.leftSide} md={6}>
            <CardMedia
              component="img"
              image={P_login}
              style={{ height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid item className={classes.rightSide} sm={12} md={6}>
            <CardMedia
              component="image"
              image={Logo_doh}
              style={{
                maxWidth: 150,
                height: 150,
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

            <form noValidate autoComplete="off">
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <TextField
                  className={classes.textField}
                  id="username"
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
                  onClick={handleSubmit}
                >
                  เข้าสู่ระบบ
                </Button>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="secondary"
                  onClick={() => setState({ username: "", password: "" })}
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
