import { HashRouter, Switch, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import RawTransaction from "./pages/RawTransaction";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import User from "./pages/User";
import AuditDisplay from "./pages/AuditDisplay";
import SuperAuditDisplay from "./pages/SuperAuditDisplay";
import UserLogs from "./pages/UserLogs";
import Config from "./pages/Config";
import Report from "./pages/Report";
import TransactionMonitorV1 from "./pages/TransactionMonitorV1";
import DashBoard2 from "./pages/DashBoard2";
import SuperAuditDisplay2 from "./pages/SuperAuditDisplay2";
import DataVolume from "./pages/DataVolume";
import MandatoryItem from "./pages/MandatoryItem";
import ExpectIncome from "./pages/ExpectIncome";
import CollectFromPk3 from "./pages/CollectFromPk3";
import MenuDataMonitor from "./pages/MenuDataMonitor";
import MonitorData from "./pages/MonitorData";
import ExpectIncomeV2 from "./pages/ExpectIncomeV2";
import Payment from "./pages/Payment";
import ExportData from "./pages/ExportData";
import SuperAuditDisplayV3 from "./pages/SuperAuditDisplayV3";
import PK3DisplayV2 from "./pages/Pk3DisplayV2";
import { StylesProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";

function App() {
  // const isAuth = !!localStorage.getItem("isAuth");

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/audit_dev" component={Login} />
            <Layout>
              <Route path="/dashboard" component={DashBoard} />
              <Route path="/dashboard2" component={DashBoard2} />
              <Route path="/rawTransaction" component={RawTransaction} />
              <Route path="/collectFromPk3" component={CollectFromPk3} />
              {/* <Route path="/expectIncome" component={ExpectIncome} /> */}
              <Route path="/expectIncomeV2" component={ExpectIncomeV2} />
              <Route path="/auditDisplay" component={AuditDisplay} />
              {/* <Route path="/pk3Display" component={PK3Display} /> */}
              <Route path="/pk3DisplayV2" component={PK3DisplayV2} />
              <Route path="/superAuditDisplay" component={SuperAuditDisplay} />
              <Route
                path="/superAuditDisplay2"
                component={SuperAuditDisplay2}
              />
              <Route
                path="/superAuditDisplayV3"
                component={SuperAuditDisplayV3}
              />
              <Route path="/user" component={User} />
              <Route path="/config" component={Config} />
              <Route path="/userLogs" component={UserLogs} />
              <Route path="/report" component={Report} />
              <Route path="/dataVolume" component={DataVolume} />
              <Route path="/mandatoryItem" component={MandatoryItem} />
              <Route path="/MonitorData" component={MonitorData} />
              <Route path="/MenuDataMonitor" component={MenuDataMonitor} />
              <Route path="/ExportData" component={ExportData} />
              <Route
                path="/transactionMonitorV1"
                component={TransactionMonitorV1}
              />
              <Route path="/Payment" component={Payment} />
            </Layout>
          </Switch>
        </HashRouter>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
