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
import TableReportDaily from "../components/report/TableReportDaily";
import FilterSection4 from "../components/report/FilterSection4";
import TableNumberOfCar from "../components/report/TableNumberOfCar";
import {
  getDataReportBilling,
  getDataReportDisplay,
  getDataReportPayment,
  getDatainfoCheckpoint,
  getDataFeeDaily,
  getDataFeeDaily2,
  getDataFeeMonthly,
  getFineData,
  getDebtData,
  getOverdueBalanceData,
} from "../service/allService";
import format from "date-fns/format";
import Swal from "sweetalert2";
import TransactionDaily from "../components/report/TransactionDaily";
import TableBillingDaily from "../components/report/TableBillingDaily";
import TableBillingDaily2 from "../components/report/TableBillingDaily2";
import TablePaymentDaily from "../components/report/TablePaymentDaily";
import TabledataTX from "../components/report/TabledataTX";
import PdfBillingDaily from "../components/report/PdfBillingDaily";
import PdfPaymentDaily from "../components/report/PdfPaymentDaily";
import BillingTSPdf from "../components/report/BillingTSPdf";
import PaymentTSPdf from "../components/report/PaymentTSPdf";
import PdfTS from "../components/report/PdfTS";
import FilterSection5 from "../components/report/FilterSection5";
import TopTable from "../components/report/TopTable";
import TableMFlow1 from "../components/report/TableMFlow1";
import TableExpectIncome from "../components/report/TableExpectIncome";
import TableSumMFlow1 from "../components/report/TableSumMFlow";
import TablePaymentDaily2 from "../components/report/TablePaymentDaily2";
import TopTable2 from "../components/report/TopTable2";
import TableMonthlyMFlow1 from "../components/report/TableMonthlyMFlow1";
import TableMonthlyMFlow2 from "../components/report/TableMonthlyMFlow2";
import TableMonthlyMFlow3 from "../components/report/TableMonthlyMFlow3";
import TableMonthlyMFlow4 from "../components/report/TableMonthlyMFlow4";
import TableMonthlyPayment1 from "../components/report/TableMonthlyPayment1";
import TableMonthlyPayment2 from "../components/report/TableMonthlyPayment2";
import TableMonthlyPayment3 from "../components/report/TableMonthlyPayment3 ";
import TableMonthlyPayment4 from "../components/report/TableMonthlyPayment4";
import TableGuarantee1 from "../components/report/TableGuarantee1";
import TableGuarantee2 from "../components/report/TableGuarantee2";
import TableGuarantee3 from "../components/report/TableGuarantee3";
import PdfNumberOfCarAndIncome from "../components/report/PdfNumberOfCarAndIncome";
import PdfFeeDaily from "../components/report/PdfFeeDaily";
import PdfFeeMonthly from "../components/report/PdfFeeMonthly";
import PdfTxNumberOfCar from "../components/report/PdfTxNumberOfCar";
import PdfFineMonthly from "../components/report/PdfFineMonthly";
import PdfDebt from "../components/report/PdfDebt";
import PdfTxFeeDaily from "../components/report/PdfTxFeeDaily";
import PdfGuarantee from "../components/report/PdfGuarantee";
import TablePressTheClaim1 from "../components/report/TablePressTheClaim1";
import TablePressTheClaim2 from "../components/report/TablePressTheClaim2";
import TablePressTheClaim3 from "../components/report/TablePressTheClaim3";
import TablePressTheClaim4 from "../components/report/TablePressTheClaim4";
import PdfPressTheClaim from "../components/report/PdfPressTheClaim";
import TableDebt4 from "../components/report/TableDebt4";
import TableDebt3 from "../components/report/TableDebt3";
import TableDebt2 from "../components/report/TableDebt2";
import TableDebt1 from "../components/report/TableDebt1";
import TableDebt5 from "../components/report/TableDebt5";
import PdfTxDebt from "../components/report/PdfTxDebt";
import TableResultFee1 from "../components/report/TableResultFee1";

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
    backgroundColor: "rgba(235,176,129,0.15)",
    paddingTop: 20,
    width: "88.5vw",
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: "rgba(235,176,129,0.15)",
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
  typography: {
    paddingTop: 20,
    paddingLeft: 20,
    fontWeight: 600,
    fontFamily: "sarabun",
  },
}));

export default function Report() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [dailyTransaction, setDailyTransaction] = useState([]);
  const [dailyBilling, setDailyBilling] = useState([]);
  const [dailyPayment, setDailyPayment] = useState([]);
  const [dataTX, setDataTX] = useState([]);
  const [feeDaily, setFeeDaily] = useState([]);
  const [feeDaily2, setFeeDaily2] = useState([]);
  const [feeMonthly, setFeeMonthly] = useState([]);
  const [fineData, setFineData] = useState([]);
  const [debtData, setDebtData] = useState([]);
  const [overdueBalance, setOverdueBalance] = useState([]);
  const [resultFeeData, setResultFeeData] = useState([]);
  const [startTime, setStartTime] = useState(new Date("Aug 10, 2021 00:00:00"));
  const [endTime, setEndTime] = useState(new Date("Aug 10, 2021 00:00:00"));
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [checkpoint, setCheckpoint] = useState(0);
  const [carClass, setCarClass] = useState([
    { class: "0", count: 0 },
    { class: "1", count: 0 },
    { class: "2", count: 0 },
    { class: "3", count: 0 },
    { class: "total", count: 0 },
  ]);
  const [carClass2, setCarClass2] = useState([
    { class: "1", count: 0, illegal: 0, normal: 0, reject: 0 },
    { class: "2", count: 0, illegal: 0, normal: 0, reject: 0 },
    { class: "3", count: 0, illegal: 0, normal: 0, reject: 0 },
    { class: "total", count: 0, illegal: 0, normal: 0, reject: 0 },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
    };
    const res = await getDataReportDisplay(sendData);

    if (!!res && !!res.data.status) {
      setDailyTransaction(res.data);
      for (let i = 0; i < carClass.length; i++) {
        for (let j = 0; j < res.data.reuslt_lane.length; j++) {
          if (carClass[i].class === res.data.reuslt_lane[j].class) {
            setCarClass([
              ...carClass,
              (carClass[i].count = res.data.reuslt_lane[j].count),
            ]);
          }
        }
      }

      for (let i = 0; i < carClass2.length; i++) {
        for (let j = 0; j < res.data.result_hq.length; j++) {
          if (carClass2[i].class === res.data.result_hq[j].class) {
            setCarClass2([
              ...carClass2,
              (carClass2[i].count = res.data.result_hq[j].count),
              (carClass2[i].normal = res.data.result_hq[j].normal),
              (carClass2[i].reject = res.data.result_hq[j].reject),
              (carClass2[i].illegal = res.data.result_hq[j].illegal),
            ]);
          }
        }
      }
      console.log("carClass1: ", carClass);
      console.log("carClass2:", carClass2);
    }

    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
      console.log("test");
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }

    // console.log(res.data);
  };

  const fetchData2 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
    };
    const res = await getDataReportBilling(sendData);

    if (!!res && !!res.data.status) {
      setDailyBilling(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData3 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
    };
    const res = await getDataReportPayment(sendData);

    if (!!res && !!res.data.status) {
      setDailyPayment(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData4 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
    };
    const res = await getDatainfoCheckpoint(sendData);

    if (!!res && !!res.data.status) {
      setDataTX(res.data);
      Swal.close();
    } else {
      setDataTX("");
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }

    // console.log(res.data);
  };

  const fetchData5 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
      startTime: format(startTime, "HH:mm:ss"),
      endTime: format(endTime, "HH:mm:ss"),
    };
    const res = await getDataFeeDaily(sendData);

    if (!!res && !!res.data.status) {
      setFeeDaily(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };
  const fetchData6 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
      startTime: format(startTime, "HH:mm:ss"),
      endTime: format(endTime, "HH:mm:ss"),
    };
    const res = await getDataFeeDaily2(sendData);

    if (!!res && !!res.data.status) {
      setFeeDaily2(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData7 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
      startTime: format(startTime, "HH:mm:ss"),
      endTime: format(endTime, "HH:mm:ss"),
    };
    const res = await getDataFeeMonthly(sendData);

    if (!!res && !!res.data.status) {
      setFeeMonthly(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData8 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
      startTime: format(startTime, "HH:mm:ss"),
      endTime: format(endTime, "HH:mm:ss"),
    };
    const res = await getFineData(sendData);

    if (!!res && !!res.data.status) {
      setFineData(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData9 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
      startTime: format(startTime, "HH:mm:ss"),
      endTime: format(endTime, "HH:mm:ss"),
    };
    const res = await getDebtData(sendData);

    if (!!res && !!res.data.status) {
      setDebtData(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData10 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
      startTime: format(startTime, "HH:mm:ss"),
      endTime: format(endTime, "HH:mm:ss"),
    };
    const res = await getOverdueBalanceData(sendData);

    if (!!res && !!res.data.status) {
      setOverdueBalance(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData11 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
      startTime: format(startTime, "HH:mm:ss"),
      endTime: format(endTime, "HH:mm:ss"),
    };
    const res = await getOverdueBalanceData(sendData);

    if (!!res && !!res.data.status) {
      setResultFeeData(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  useEffect(() => {
    // fetchData();
    setCarClass(carClass);
    setCarClass2(carClass2);
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
            variant="scrollable"
            scrollButtons="auto"
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

            <Tab
              label="สรุปข้อมูล TX"
              {...a11yProps(3)}
              className={classes.tab}
            />
            <Tab
              label="สรุปจำนวนรถและรายได้"
              {...a11yProps(4)}
              className={classes.tab}
            />
            <Tab
              label="สรุปรายได้ประจำวัน"
              {...a11yProps(5)}
              className={classes.tab}
            />
            <Tab
              label="สรุปชำระค่าผ่านทาง"
              {...a11yProps(6)}
              className={classes.tab}
            />
            <Tab
              label="สรุปชำระค่าปรับ"
              {...a11yProps(7)}
              className={classes.tab}
            />

            <Tab
              label="สรุปค่าทวงถาม"
              {...a11yProps(8)}
              className={classes.tab}
            />

            <Tab
              label="สรุปหนี้คงค้าง"
              {...a11yProps(9)}
              className={classes.tab}
            />
            <Tab
              label="สรุปประกันค่าผ่านทาง"
              {...a11yProps(10)}
              className={classes.tab}
            />
            <Tab
              label="สรุปการจัดเก็บค่าธรรมเนียม"
              {...a11yProps(11)}
              className={classes.tab}
            />

            {/* <Tab
              label="รายงานสรุปจราจร"
              {...a11yProps(4)}
              className={classes.tab}
            />

            <Tab label="testPDF" {...a11yProps(5)} className={classes.tab} /> */}
          </Tabs>

          <TabPanel value={value} index={0}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection
                onFetchData={fetchData}
                report={TransactionDaily}
                transactionReport={PdfTS}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper style={{ marginTop: 20 }}>
                <div>
                  <Box>
                    <Typography className={classes.typography}>
                      {checkpoint === 0
                        ? "ทุกด่าน"
                        : checkpoint === 1
                        ? "ด่านทับช้าง1"
                        : checkpoint === 2
                        ? "ด่านทับช้าง2"
                        : checkpoint === 3
                        ? "ด่านธัญบุรี1"
                        : checkpoint === 4
                        ? "ด่านธัญบุรี2"
                        : ""}
                    </Typography>
                    <Typography
                      style={{
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {`เอกสาร สรุป Transaction ประจำวันที่ ${format(
                        selectedDate,
                        "dd/MM/yyyy"
                      )}`}
                    </Typography>
                  </Box>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <TableNumberOfCar
                      dataList={dailyTransaction}
                      carClass={carClass}
                    />
                  </div>
                  <div>
                    <TableReportDaily
                      dataList={dailyTransaction}
                      carClass={carClass2}
                    />
                  </div>
                  <div>
                    <BlockDailyReport
                      dataList={dailyTransaction}
                      checkpoint={checkpoint}
                    />
                  </div>
                </div>

                {/* <TableReportDaily2 dataList={allTsTable2} /> */}
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection
                onFetchData={fetchData2}
                report={PdfBillingDaily}
                transactionReport={BillingTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper style={{ marginTop: 20 }}>
                <div>
                  <Box>
                    <Typography className={classes.typography}>
                      {checkpoint === 0
                        ? "ทุกด่าน"
                        : checkpoint === 1
                        ? "ด่านทับช้าง1"
                        : checkpoint === 2
                        ? "ด่านทับช้าง2"
                        : checkpoint === 3
                        ? "ด่านธัญบุรี1"
                        : checkpoint === 4
                        ? "ด่านธัญบุรี2"
                        : ""}
                    </Typography>
                    <Typography
                      style={{
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {`เอกสาร สรุป Billing ประจำวันที่ ${format(
                        selectedDate,
                        "dd/MM/yyyy"
                      )}`}
                    </Typography>
                  </Box>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <div>
                    <TableBillingDaily dataList={dailyBilling} />
                  </div>
                  <div>
                    <TableBillingDaily2 dataList={dailyBilling} />
                  </div>
                </div>
                {/* <TableReportSumMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection
                onFetchData={fetchData3}
                report={PdfPaymentDaily}
                transactionReport={PaymentTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper style={{ marginTop: 20 }}>
                <div>
                  <Box>
                    <Typography className={classes.typography}>
                      {checkpoint === 0
                        ? "ทุกด่าน"
                        : checkpoint === 1
                        ? "ด่านทับช้าง1"
                        : checkpoint === 2
                        ? "ด่านทับช้าง2"
                        : checkpoint === 3
                        ? "ด่านธัญบุรี1"
                        : checkpoint === 4
                        ? "ด่านธัญบุรี2"
                        : ""}
                    </Typography>
                    <Typography
                      style={{
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {`เอกสาร สรุป Payment ประจำวันที่ ${format(
                        selectedDate,
                        "dd/MM/yyyy"
                      )}`}
                    </Typography>
                  </Box>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <div>
                    <TablePaymentDaily dataList={dailyPayment} />
                  </div>
                </div>

                {/* <TableReportRemainMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection4
                onFetchData={fetchData4}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <Paper style={{ marginTop: 20 }}>
                <div>
                  <Box>
                    <Typography
                      style={{
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {`เอกสาร ข้อมูล TX ประจำวันที่ ${format(
                        selectedDate,
                        "dd/MM/yyyy"
                      )}`}
                    </Typography>
                  </Box>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <div>
                    <TabledataTX dataList={dataTX} />
                  </div>
                </div>

                {/* <TableReportRemainMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>

          {/* <TabPanel value={value} index={4}>
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
          </TabPanel> */}

          {/* <TabPanel value={value} index={5}>
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

                <BlockTestPDF /> */}

          {/* <TableReportTrafficMonthly dataList={allTsTable3} /> */}
          {/* </Paper>
            </Container>
          </TabPanel> */}

          <TabPanel value={value} index={4}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData5}
                report={PdfNumberOfCarAndIncome}
                transactionReport={PdfTxNumberOfCar}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  รายงานสรุปจำนวนรถวิ่งผ่านด่าน M-Flow และรายได้พึงได้
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TopTable
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    checkpoint={checkpoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TableMFlow1 dataList={feeDaily} />
                  <TableExpectIncome dataList={feeDaily} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 206,
                  }}
                >
                  <TableSumMFlow1
                    dataList={feeDaily}
                    selectedDate={selectedDate}
                  />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={5}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData6}
                report={PdfFeeDaily}
                transactionReport={PdfTxFeeDaily}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  รายงานสรุปการชำระค่าผ่านทางประจำวัน
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TopTable2
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    checkpoint={checkpoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TablePaymentDaily2 dataList={feeDaily2} />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={6}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData7}
                report={PdfFeeMonthly}
                transactionReport={PaymentTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  รายงานการชำระค่าผ่านทางสรุปรายเดือน
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TopTable
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    checkpoint={checkpoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TableMonthlyMFlow1 dataList={feeMonthly} />
                  <TableMonthlyMFlow2 dataList={feeMonthly} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 210,
                  }}
                >
                  <TableMonthlyMFlow3
                    dataList={feeMonthly}
                    selectedDate={selectedDate}
                  />
                  <TableMonthlyMFlow4
                    dataList={feeMonthly}
                    selectedDate={selectedDate}
                  />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={7}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData8}
                report={PdfFineMonthly}
                transactionReport={PaymentTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  {`รายงานการชำระค่าปรับสรุปรายเดือน (ค่าปรับส่วนค่าธรรมเนียมผ่านทาง)`}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TopTable
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    checkpoint={checkpoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TableMonthlyPayment1 dataList={fineData} />
                  <TableMonthlyPayment2 dataList={fineData} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 214,
                  }}
                >
                  <TableMonthlyPayment3
                    dataList={fineData}
                    selectedDate={selectedDate}
                  />
                  <TableMonthlyPayment4
                    dataList={fineData}
                    selectedDate={selectedDate}
                  />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={8}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData9}
                report={PdfPressTheClaim}
                transactionReport={PaymentTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  รายงานการชำระค่าปรับสรุปรายเดือน (ค่าทวงถาม)
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TopTable
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    checkpoint={checkpoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TablePressTheClaim1 dataList={debtData} />
                  <TablePressTheClaim2 dataList={debtData} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 214,
                  }}
                >
                  <TablePressTheClaim3
                    dataList={debtData}
                    selectedDate={selectedDate}
                  />
                  <TablePressTheClaim4
                    dataList={debtData}
                    selectedDate={selectedDate}
                  />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={9}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData10}
                report={PdfDebt}
                transactionReport={PdfTxDebt}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  รายงานหนี้คงค้าง
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TopTable
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    checkpoint={checkpoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TableDebt1 dataList={overdueBalance} />
                  <TableDebt2 dataList={overdueBalance} />
                  <TableDebt3 dataList={overdueBalance} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 215,
                  }}
                >
                  <TableDebt4
                    dataList={overdueBalance}
                    selectedDate={selectedDate}
                  />
                  <TableDebt5
                    dataList={overdueBalance}
                    selectedDate={selectedDate}
                  />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={10}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData3}
                report={PdfGuarantee}
                transactionReport={PaymentTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  รายงานการประกันค่าธรรมเนียมผ่านทาง
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TopTable
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    checkpoint={checkpoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TableGuarantee1 />
                  <TableGuarantee2 />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 215,
                  }}
                >
                  <TableGuarantee3 />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={11}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData11}
                report={PdfGuarantee}
                transactionReport={PaymentTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  รายงานสรุปการตรวจสอบการจัดเก็บค่าธรรมเนียมผ่านทาง
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TopTable
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    checkpoint={checkpoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TableResultFee1 dataList={resultFeeData} />
                  <TableDebt2 dataList={resultFeeData} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 215,
                  }}
                >
                  <TableDebt4
                    dataList={resultFeeData}
                    selectedDate={selectedDate}
                  />
                  <TableDebt5
                    dataList={resultFeeData}
                    selectedDate={selectedDate}
                  />
                </div>
              </Paper>
            </Container>
          </TabPanel>
        </div>
      </Container>
    </>
  );
}
