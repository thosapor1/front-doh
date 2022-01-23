import {
  Box,
  Container,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import BlockDailyReport from "../components/report/BlockDailyReport";
import FilterSection from "../components/report/FilterSection";
import FilterSection2 from "../components/report/FilterSection2";
import TableReportDaily from "../components/report/TableReportDaily";
import TableReportDaily2 from "../components/report/TableReportDaily2";
import { report1 } from "../data/mockDataReport";
import { report2 } from "../data/mockDataReport2";
import PdfDaily from "../components/report/PdfDaily";
import BlockSumMonthlyReport from "../components/report/BlockSumMonthlyReport";
import TableReportSumMonthly from "../components/report/TableReportSumMonthly";
import TableReportRemainMonthly from "../components/report/TableReportReaminMonthly";
import BlockRemainReport from "../components/report/BlockRemainReport";
import TableReportTrafficMonthly from "../components/report/TableReportTrafficMonthly";
import BlockTrafficReport from "../components/report/BlockTrafficReport";
import PdfSumMonthly from "../components/report/PdfSumMonthly";
import PdfRemain from "../components/report/PdfRemain";
import PdfTraffic from "../components/report/PdfTraffic";
import BlockTestPDF from "../components/report/BlockTestPDF";
import TestPDF from "../components/report/TestPDF";
import exportExcel from "../components/report/exportExcel";
import FilterSection3 from "../components/report/FilterSection3";

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

const data1 = [
  {
    id: "1",
    label: "C1",
    sumCar: 15,
    miss: 5,
    except: 4,
    remain: 3,
  },
  {
    id: "2",
    label: "C2",
    sumCar: 20,
    miss: 9,
    except: 0,
    remain: 1,
  },
  {
    id: "3",
    label: "C3",
    sumCar: 5,
    miss: 6,
    except: 1,
    remain: 1,
  },
  {
    id: "4",
    label: "รวมทั้งหมด",
    sumCar: 40,
    miss: 20,
    except: 5,
    remain: 5,
  },
];

export default function Report() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [allTsTable, setAllTsTable] = useState("");
  const [allTsTable2, setAllTsTable2] = useState("");
  const [allTsTable3, setAllTsTable3] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [checkpoint, setCheckpoint] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = () => {
    // apiURL.post("/system-config").then((res) => {
    //   setAllTsTable(res.data);
    //   console.log("res: ", res.data);
    // });

    setAllTsTable(data1);
    setAllTsTable2(report1);
    setAllTsTable3(report2);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography
          variant="h6"
          style={{ marginBottom: "1rem", fontSize: "0.9rem" }}
        >
          ตรวจสอบ (DOH) : รายงาน
        </Typography>
        <div className={classes.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              label="สรปุ TS ประจำวัน"
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab
              label="สรุป Billing ประจำวัน"
              {...a11yProps(1)}
              className={classes.tab}
            />
            <Tab
              label="สรุป Payment ประจำวัน"
              {...a11yProps(2)}
              className={classes.tab}
            />
            {/* <Tab
              label="รายงานสรุปจราจร"
              {...a11yProps(3)}
              className={classes.tab}
            /> */}
            {/* <Tab label="testPDF" {...a11yProps(4)} className={classes.tab} /> */}
          </Tabs>

          <TabPanel value={value} index={0}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection
                onFetchData={fetchData}
                report={PdfDaily}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper style={{ marginTop: 20 }}>
                <div style={{ display: "flex", marginTop: 20 }}>
                  <div>
                    <TableReportDaily
                      dataList={allTsTable}
                      selectedDate={selectedDate}
                      checkpoint={checkpoint}
                    />
                  </div>
                  <div>
                    <BlockDailyReport />
                  </div>
                </div>

                {/* <TableReportDaily2 dataList={allTsTable2} /> */}
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection2
                onFetchData={fetchData}
                report={PdfSumMonthly}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper style={{ marginTop: 20 }}>
                <Typography
                  style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  ทับช้าง1
                </Typography>
                <Typography
                  style={{
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  เอกสาร ตรวจสอบความถูกต้องของการตรวจสอบรายได้ประจำเดือน
                </Typography>

                <BlockSumMonthlyReport />

                {/* <TableReportSumMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection2 onFetchData={fetchData} report={PdfRemain} />
              <Paper style={{ marginTop: 20 }}>
                <Typography
                  style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  ทับช้าง1
                </Typography>
                <Typography
                  style={{
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  เอกสาร ตรวจสอบความถูกต้องของการตรวจสอบรายได้ประจำเดือน
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <div>
                    <BlockRemainReport />
                  </div>
                  <div>
                    <TableReportDaily dataList={allTsTable} />
                  </div>
                </div>

                {/* <TableReportRemainMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection2 onFetchData={fetchData} report={PdfTraffic} />
              <Paper style={{ marginTop: 20 }}>
                <Typography
                  style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  ทับช้าง1
                </Typography>
                <Typography
                  style={{
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  เอกสาร ตรวจสอบความถูกต้องของการตรวจสอบรายได้ประจำเดือน
                </Typography>

                <BlockTrafficReport />

                <TableReportTrafficMonthly dataList={allTsTable3} />
              </Paper>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection3
                onFetchData={fetchData}
                report={TestPDF}
                exportExcel={exportExcel}
              />
              <Paper style={{ marginTop: 20 }}>
                <Typography
                  style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  ทับช้าง1
                </Typography>
                <Typography
                  style={{
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  เอกสาร ตรวจสอบความถูกต้องของการตรวจสอบรายได้ประจำเดือน
                </Typography>

                <BlockTestPDF />

                {/* <TableReportTrafficMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>
        </div>
      </Container>
    </>
  );
}
