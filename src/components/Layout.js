import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CardMedia,
  Divider,
  Icon,
  makeStyles,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { useHistory, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import s_logo_doh from "../image/S_logo_doh.png";
import {
  menuItemsForAdmin,
  menuConfigForAdmin,
  menuItemsForPk3,
  menuConfigForPk3,
  menuItemsForSuperAdmin,
  menuConfigForSuperAdmin,
  menuItemsForMember,
  menuConfigForMember,
} from "../data/menuControl";
import Cookies, { set } from "js-cookie";
import axios from "axios";
import Login from "../pages/Login";
import {
  HashRouter as Router,
  Switch,
  Route,
  HashRouter,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

const drawerWidth = 220;
const drawerColor = "#46005E";

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V2}`,
});

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
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    active: {
      background: "#61438Fff",
      color: "white",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      background: "white",
      zIndex: -1,
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
      fontSize: "0.7rem",
    },
    hr1: {
      display: "none",
      background: "#9e9e9e",
    },
    hr2: {
      background: "#9e9e9e",
    },
  };
});

const logout = async () => {
  const sendData = {
    user_id: Cookies.get("userId"),
  };
  await apiURL
    .post("logout", sendData)
    .then((res) => console.log(res.data))
    .then(() => removeCookies());

  <Redirect to="audit_dev" />;
};

const removeCookies = () => {
  Cookies.remove("checkpoint_id");
  Cookies.remove("department_id");
  Cookies.remove("highway_id");
  Cookies.remove("userId");
  Cookies.remove("permission_id");
  Cookies.remove("position_id");
  Cookies.remove("username");
  Cookies.remove("status");
  localStorage.removeItem("isAuth");
};

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);
  const [configItems, setConfigItems] = useState([]);
  const [userName, setUserName] = useState();

  useEffect(() => {
    const permissionId = Cookies.get("permission_id");
    const departmentId = Cookies.get("department_id");
    const userName = Cookies.get("username");
    const userId = Cookies.get("userId");
    setUserName(userName);
    if (permissionId == 1 && departmentId == 1) {
      setMenuItems(menuItemsForSuperAdmin);
      setConfigItems(menuConfigForSuperAdmin);
    } else if (permissionId == 2 && departmentId == 1) {
      setMenuItems(menuItemsForAdmin);
      setConfigItems(menuConfigForAdmin);
    } else if (permissionId == 3 && departmentId == 1) {
      setMenuItems(menuItemsForMember);
      setConfigItems(menuConfigForMember);
    } else {
      setMenuItems(menuItemsForPk3);
      setConfigItems(menuConfigForPk3);
    }
    console.log("menu", menuItems, permissionId, departmentId);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} elevation={0}>
        <ToolBar>
          <Typography variant="body1" className={classes.avatarName}>
            {userName}
          </Typography>
          <Avatar className={classes.avatar}>{userName}</Avatar>
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
        <Divider variant="middle" className={classes.hr2} />
        <List>
          {!!menuItems
            ? menuItems.map((item) => (
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
                  <Icon style={{ marginRight: 15 }}>{item.icon}</Icon>
                  <ListItemText
                    primary={item.text}
                    classes={{ primary: classes.listItemText }}
                  />
                </ListItem>
              ))
            : menuItems}
        </List>
        <Divider variant="middle" className={classes.hr2} />
        <List>
          {configItems.map((item) => (
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
              <Icon style={{ marginRight: 15 }}>{item.icon}</Icon>
              <ListItemText
                primary={item.text}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" className={classes.hr2} />
        <Button
          variant="contained"
          size="large"
          color="primary"
          startIcon={<ExitToAppRoundedIcon />}
          className={classes.btn}
          onClick={() => {
            history.push("/audit_dev");
            logout();
          }}
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
