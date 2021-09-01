import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import RawTransaction from "./pages/RawTransaction";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import User from "./pages/User";
import AuditDisplay from "./pages/AuditDisplay";
import Pk3Display from "./pages/Pk3Display";
import SuperAuditDisplay from "./pages/SuperAuditDisplay";

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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/audit_dev">
            <Login />
          </Route>
          <Layout>
            <Route exact path="/dashboard">
              <DashBoard />
            </Route>
            <Route exact path="/rawTransaction">
              <RawTransaction />
            </Route>
            <Route exact path="/auditDisplay">
              <AuditDisplay />
            </Route>
            <Route exact path="/pk3Display">
              <Pk3Display />
            </Route>
            <Route exact path="/superAuditDisplay">
              <SuperAuditDisplay />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
