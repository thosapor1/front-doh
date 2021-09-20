import {
  Box,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection";

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V1}`,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f9f9f9",
    paddingTop: 20,
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    "& .MuiBox-root": {
      padding: "0px",
    },
  },
  tab: {
    borderRadius: "10px 10px 0px 0px",
    border: "1px solid lightgray",
    borderBottom: "0px",
    backgroundColor: "white",
  },
  inTab: {
    backgroundColor: "white",
    paddingTop: "1rem",
  },
}));

export default function Report() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [page, setPage1] = useState(1);

  const [allTsTable, setAllTsTable] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (event, value) => {
    fetchData(value);
  };

  const fetchData = (pageId = 1) => {
    if (pageId == 1) {
      setPage1(1);
    } else {
      setPage1(pageId);
    }

    apiURL.post("/system-config").then((res) => {
      setAllTsTable(res.data);
      console.log("res: ", res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h6" style={{ marginBottom: "1rem" }}>
        ตรวจสอบ (DOH) : รายงาน
      </Typography>
      <div className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="รายงานประจำวัน"
            {...a11yProps(0)}
            className={classes.tab}
          />
          <Tab
            label="รายงานใบนำฝาก"
            {...a11yProps(1)}
            className={classes.tab}
          />
          <Tab
            label="รายงานสรุปยอดคงค้าง"
            {...a11yProps(2)}
            className={classes.tab}
          />
          <Tab
            label="รายงานสรุปจราจร"
            {...a11yProps(3)}
            className={classes.tab}
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <div className={classes.inTab}>
            <FilterSection />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.inTab}></div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className={classes.inTab}></div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className={classes.inTab}></div>
        </TabPanel>
      </div>
    </Container>
  );
}
