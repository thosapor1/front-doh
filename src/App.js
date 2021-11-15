import {
  HashRouter,
  Switch,
  Route,
  // Redirect,
  // BrowserRouter,
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
import AuditDisplay2 from "./pages/AuditDisplay2";
import SuperAuditDisplay2 from "./pages/SuperAuditDisplay2";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

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
  // const isAuth = !!localStorage.getItem("isAuth");

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/audit_dev" component={Login} />
          <Layout>
            <Route path="/rawTransaction" component={RawTransaction} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/auditDisplay" component={AuditDisplay} />
            <Route path="/auditDisplay2" component={AuditDisplay2} />
            <Route path="/pk3Display" component={Pk3Display} />
            <Route path="/superAuditDisplay" component={SuperAuditDisplay} />
            <Route path="/superAuditDisplay2" component={SuperAuditDisplay2} />
            <Route path="/user" component={User} />
            <Route path="/config" component={Config} />
            <Route path="/userLogs" component={UserLogs} />
            <Route path="/report" component={Report} />
            <Route
              path="/transactionMonitorV1"
              component={TransactionMonitorV1}
            />
          </Layout>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
