import React from "react";
import {
  Avatar,
  Button,
  CardMedia,
  Divider,
  makeStyles,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import StorageRoundedIcon from "@material-ui/icons/StorageRounded";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import BackupRoundedIcon from "@material-ui/icons/BackupRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import PermDataSettingRoundedIcon from "@material-ui/icons/PermDataSettingRounded";
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { useHistory, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import s_logo_doh from "../image/s_logo_doh.png";

const drawerWidth = 220;
const drawerColor = "#46005E";

const menuItems = [
  {
    text: "ตรวจสอบรายได้พึงได้รายวัน",
    icon: <AssignmentRoundedIcon />,
    path: "/dashboard",
  },
  {
    text: "รายการฐานข้อมูลรถ",
    icon: <StorageRoundedIcon />,
    path: "/rawTransaction",
  },
  {
    text: "รายได้รายวัน",
    icon: <MonetizationOnRoundedIcon />,
    path: "/auditDisplay",
  },
  {
    text: "รายได้คงค้าง",
    icon: <AccountBalanceWalletRoundedIcon />,
    path: "/2",
  },
  {
    text: "รายงาน",
    icon: <AssessmentRoundedIcon />,
    path: "/3",
  },
];

const menuConfig = [
  {
    text: "ผู้ใช้งาน",
    icon: <AccountCircleRoundedIcon />,
    path: "/user",
  },
  {
    text: "สำรองช้อมูล",
    icon: <BackupRoundedIcon />,
    path: "/5",
  },
  {
    text: "ค่าภายในระบบ",
    icon: <PermDataSettingRoundedIcon />,
    path: "/6",
  },
  {
    text: "รายงานความเคลื่อนไหวผู้ใช้งาน",
    icon: <InsertDriveFileRoundedIcon />,
    path: "/7x",
  },
];

const useStyles = makeStyles((theme) => {
  return {
    page: {
      // background: "#f9f9f9",
      width: "100%",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: drawerColor,
    },
    root: {
      display: "flex",
    },
    ListItemText: {
      color: "white",
    },
    btn: {
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: "#88489e",
    },
    active: {
      background: "#61438Fff",
      color: "white",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      background: "white",
    },
    avatar: {
      marginLeft: 30,
      marginRight: 30,
    },
    toolbar: theme.mixins.toolbar,
    avatarName: {
      marginLeft: "auto",
      marginRight: 0,
      color: "gray",
    },
    listItemText: {
      fontSize: "0.85rem",
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} elevation={0}>
        <ToolBar>
          <Typography variant="body1" className={classes.avatarName}>
            Thosaporn Chu
          </Typography>
          <Avatar className={classes.avatar}>TH</Avatar>
        </ToolBar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "space-around",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 30,
            paddingLeft: 30,
          }}
        >
          <CardMedia image={s_logo_doh} style={{ height: 55, width: 55 }} />
          <Typography style={{ color: "white", fontWeight: 600 }}>
            DOH-AUDIT
          </Typography>
        </div>
        <Divider variant="middle" style={{ background: "#9e9e9e" }} />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              className={
                location.pathname === item.path
                  ? classes.active
                  : classes.ListItemText
              }
              button
              onClick={() => history.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" style={{ background: "#9e9e9e" }} />
        <List>
          {menuConfig.map((item) => (
            <ListItem
              key={item.text}
              className={
                location.pathname === item.path
                  ? classes.active
                  : classes.ListItemText
              }
              button
              onClick={() => history.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" style={{ background: "#9e9e9e" }} />
        <Button
          variant="contained"
          size="large"
          color="primary"
          startIcon={<ExitToAppRoundedIcon />}
          className={classes.btn}
          onClick={()=> history.push("/")}
        >
          ออกจากระบบ
        </Button>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
