import {
  HashRouter as Router,
  Switch,
  Route,
  HashRouter,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import RawTransaction from "./pages/RawTransaction";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import User from "./pages/User";
import AuditDisplay from "./pages/AuditDisplay";
import Pk3Display from "./pages/Pk3Display";
import SuperAuditDisplay from "./pages/SuperAuditDisplay";
import UserLogs from "./pages/UserLogs";
import Config from "./pages/Config";
import Report from "./pages/Report";
import TransactionMonitorV1 from "./pages/TransactionMonitorV1";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const theme = createTheme({
  typography: {
    fontFamily: "Prompt",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const isAuth = !!localStorage.getItem("isAuth");

  return (
    <ThemeProvider theme={theme}>
      <HashRouter hashType={"noslash"} basename="/">
        <Switch>
          <Route path="/audit_dev" component={Login} />
          <Layout>
            <Route
              path="/rawTransaction"
              render={() =>
                isAuth ? <RawTransaction /> : <Redirect to="/audit_dev" />
              }
            />
            <Route
              path="/dashboard"
              render={() =>
                isAuth ? <DashBoard /> : <Redirect to="/audit_dev" />
              }
            />
            <Route
              path="/auditDisplay"
              render={() =>
                isAuth ? <AuditDisplay /> : <Redirect to="/audit_dev" />
              }
            />
            <Route
              path="/pk3Display"
              render={() =>
                isAuth ? <Pk3Display /> : <Redirect to="/audit_dev" />
              }
            />
            <Route
              path="/superAuditDisplay"
              render={() =>
                isAuth ? <SuperAuditDisplay /> : <Redirect to="/audit_dev" />
              }
            />
            <Route
              path="/user"
              render={() => (isAuth ? <User /> : <Redirect to="/audit_dev" />)}
            />
            <Route
              path="/config"
              render={() =>
                isAuth ? <Config /> : <Redirect to="/audit_dev" />
              }
            />
            <Route
              path="/userLogs"
              render={() =>
                isAuth ? <UserLogs /> : <Redirect to="/audit_dev" />
              }
            />
            <Route
              path="/report"
              render={() =>
                isAuth ? <Report /> : <Redirect to="/audit_dev" />
              }
            />
            <Route
              path="/transactionMonitorV1"
              render={() =>
                isAuth ? <TransactionMonitorV1 /> : <Redirect to="/audit_dev" />
              }
            />
          </Layout>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
