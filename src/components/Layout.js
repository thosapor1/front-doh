import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CardMedia,
  Divider,
  Icon,
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
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
import Cookies from "js-cookie";
import axios from "axios";
// import Login from "../pages/Login";
import { Redirect } from "react-router-dom";

const drawerWidth = 220;
const drawerColor = "#46005E";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});

const useStyles = makeStyles((theme) => {
  return {
    page: {
      // background: "#f9f9f9",
      width: "100%",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
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
      fontSize: "0.8rem",
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
      background: "#9A0049",
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    avatar: {
      marginLeft: 30,
      marginRight: 30,
      fontSize: "0.9rem",
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
    avatarName: {
      marginLeft: "auto",
      marginRight: 0,
      color: "white",
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
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
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
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("lg"));

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  useEffect(() => {
    const permissionId = Cookies.get("permission_id");
    const departmentId = Cookies.get("department_id");
    const userName = Cookies.get("username");
    // const userId = Cookies.get("userId");
    setUserName(userName);
    if (permissionId === "1" && departmentId === "1") {
      setMenuItems(menuItemsForSuperAdmin);
      setConfigItems(menuConfigForSuperAdmin);
    } else if (permissionId === "2" && departmentId === "1") {
      setMenuItems(menuItemsForAdmin);
      setConfigItems(menuConfigForAdmin);
    } else if (permissionId === "3" && departmentId === "1") {
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="body1"
            className={classes.avatarName}
            style={{ fontSize: "0.8rem" }}
          >
            {userName}
          </Typography>
          <Avatar className={classes.avatar}>{userName}</Avatar>
        </ToolBar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant={isMdUp ? "permanent" : "temporary"}
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        open={open}
        onClose={toggleDrawer}
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
          <CardMedia image={s_logo_doh} style={{ height: 45, width: 45 }} />
          <Typography
            style={{ color: "white", fontWeight: 600, fontSize: "0.85rem" }}
          >
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
            history.push("/");
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
