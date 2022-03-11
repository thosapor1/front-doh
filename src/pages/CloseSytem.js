import {
  Button,
  CardMedia,
  createTheme,
  Grid,
  makeStyles,
  MuiThemeProvider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import P_login from "../image/P_login.jpg";
import Personal from "../image/Personal.png";
import Logo_doh from "../image/Logo_doh.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Label } from "@material-ui/icons";

const useStyle = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#933583",
      // height: "100vh",
      paddingBottom: "25%",
      paddingTop: "4%",
      [theme.breakpoints.down("xs")]: {
        padding: "0px 0px",
      },
    },
    paper: {
      display: "flex",
      width: "60%",
      margin: "0px auto",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    leftSide: {},
    rightSide: {
      paddingBottom: "60px",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: "30%",
      },
    },
    typography: {
      fontSize: "1.5rem",
      fontFamily: "Prompt",
    },
    btn: {
      marginTop: "2rem",
      width: 100,
      height: 40,
      fontFamily: "Prompt",
    },
    textField: {
      margin: "10px auto",
      width: "60%",
      fontFamily: "Prompt",
    },
  };
});

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});

export default function CloseSytem() {
  const classes = useStyle();

  const history = useHistory();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item className={classes.leftSide} md={6} sm={12}>
            <CardMedia
              component="img"
              image={P_login}
              style={{ height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid item className={classes.rightSide} sm={12} md={6} xs={12}>
            <CardMedia
              component="img"
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
            <Typography
              variant="body1"
              align="center"
              className={classes.typography}
            >
              ประกาศ ปิดปรับปรุงระบบชั่วคราว
            </Typography>

            <CardMedia
              component="img"
              image={Personal}
              style={{
                maxWidth: 150,
                height: 155,
                width: "100%",
                marginTop: "2rem",
                marginBottom: "2rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
