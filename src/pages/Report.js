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
  getResultFeeData,
  getGuaranteeData,
  getDataSLa,
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
import PdfFineMonthly from "../components/report/PdfFineMonthly";
import PdfDebt from "../components/report/PdfDebt";
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
import TableResultFee1 from "../components/report/TableResultFee1";
import TableResultFee2 from "../components/report/TableResultFee2";
import TableResultFee3 from "../components/report/TableResultFee3";
import TableResultFee4 from "../components/report/TableResultFee4";
import PdfResultFee from "../components/report/PdfResultFee";
import exportExcel2 from "../components/report/exportExcel2";
import TableSLA from "../components/report/tableSLA";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TableSLABilling from "../components/report/tableSLABilling";
import TableSLAPayment from "../components/report/tableSLAPayment";
import FilterSection6 from "../components/report/FilterSection6";
import { th } from "date-fns/locale";
import TableRemainMonthly from "../components/report/TableRemainMonthly";
import TableNumberOfCarTransactionMonthly from "../components/report/TableNumberOfCarTransactionMonthly";
import TableReportMockMonthly from "../components/report/TableReportMockMonthly";

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
  const [guarantee, setGuarantee] = useState([]);
  const [overdueBalance, setOverdueBalance] = useState([]);
  const [resultFeeData, setResultFeeData] = useState([]);
  const [dataSLA, setDataSLA] = useState([]);
  const [dataColumnChart, setDataColumnChart] = useState([
    ["period", "รถผ่านทาง", { role: "annotation" }],
    ["0-8 Min", 0, 0],
    ["8-15 Min", 0, 0],
    ["15-20 Min", 0, 0],
    ["20-30 Min", 0, 0],
    ["30-60 Min", 0, 0],
    ["60+ Min", 0, 0],
  ]);
  const [dataDonutChart, setDataDonutChart] = useState([
    ["type", "amount", { role: "annotation" }],
    ["On SLA", 10, 10],
    ["Over SLA", 20, 20],
  ]);
  const [startTime, setStartTime] = useState(new Date("Aug 10, 2021 00:00:00"));
  const [endTime, setEndTime] = useState(new Date("Aug 10, 2021 00:00:00"));
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [endDate, setEndDate] = useState(
    new Date().setDate(new Date().getDate())
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

  const checkMonth = () => {
    let month = "";
    month = format(selectedDate, "MMM");
    return month;
  };
  const month = checkMonth().toString();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const slaPDF = () => {
    const input = document.getElementById("tableSLA");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      pdf.addImage(imgData, "JPEG", 0, 30, 297, 140);
      pdf.save("slaReport.pdf");
    });
  };
  const slaBillingPDF = () => {
    const input = document.getElementById("tableSLABilling");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      pdf.addImage(imgData, "JPEG", 0, 30, 297, 140);
      pdf.save("slaReport.pdf");
    });
  };
  const slaPaymentPDF = () => {
    const input = document.getElementById("tableSLAPayment");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      pdf.addImage(imgData, "JPEG", 0, 30, 297, 140);
      pdf.save("slaReport.pdf");
    });
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

    if (!!res && !res.data.status) {
      Swal.fire({
        title: "ไม่มีข้อมูล",
        allowOutsideClick: false,
        icon: "warning",
      });
    }

    if (!!res && !!res.data.status) {
      setDailyBilling(res.data);
      Swal.close();
    }

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
    const res = await getGuaranteeData(sendData);

    if (!!res && !!res.data.status) {
      setGuarantee(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData12 = async () => {
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
    const res = await getResultFeeData(sendData);

    if (!!res && !!res.data.status) {
      setResultFeeData(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData13 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
    };
    const res = await getDataSLa(sendData);

    if (!!res && !!res.data.status) {
      setDataSLA(res.data);
      setDataDonutChart([
        ["type", "amount", { role: "annotation" }],
        ["On SLA", res.data.sla_831[0].onSla, res.data.sla_831[0].onSla],
        ["Over SLA", res.data.sla_831[0].overSla, res.data.sla_831[0].overSla],
      ]);
      let array = [0, res.data.sla_831[0].onSla, 0];
      setDataColumnChart([
        ["period", "รถผ่านทาง", { role: "annotation" }],
        ["0-8 Min", res.data.sla_831[0]["8min"], res.data.sla_831[0]["8min"]],
        [
          "8-15 Min",
          res.data.sla_831[0]["8To15min"],
          res.data.sla_831[0]["8To15min"],
        ],
        [
          "15-20 Min",
          res.data.sla_831[0]["15To20min"],
          res.data.sla_831[0]["15To20min"],
        ],
        [
          "20-30 Min",
          res.data.sla_831[0]["20To30min"],
          res.data.sla_831[0]["20To30min"],
        ],
        [
          "30-60 Min",
          res.data.sla_831[0]["30To60min"],
          res.data.sla_831[0]["30To60min"],
        ],
        [
          "60+ Min",
          res.data.sla_831[0].moreThan60,
          res.data.sla_831[0].moreThan60,
        ],
      ]);
      Swal.close();
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        title: "ไม่มีข้อมูล",
        icon: "warning",
      });
      setDataSLA({});
      setDataDonutChart([
        ["type", "amount", { role: "annotation" }],
        ["On SLA", 0, 0],
        ["Over SLA", 0, 0],
      ]);

      setDataColumnChart([
        ["period", "รถผ่านทาง", { role: "annotation" }],
        ["0-8 Min", 0, 0],
        ["8-15 Min", 0, 0],
        ["15-20 Min", 0, 0],
        ["20-30 Min", 0, 0],
        ["30-60 Min", 0, 0],
        ["60+ Min", 0, 0],
      ]);
    }

    // console.log(res.data);
  };

  useEffect(() => {
    // fetchData();
    setCarClass(carClass);
    setCarClass2(carClass2);
    // checkMonth()
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
            <Tab label="SLA" {...a11yProps(12)} className={classes.tab} />
            <Tab
              label="SLA (Billing)"
              {...a11yProps(13)}
              className={classes.tab}
            />
            <Tab
              label="SLA (Payment)"
              {...a11yProps(14)}
              className={classes.tab}
            />
            <Tab
              label="สรุปยอดคงค้างประจำเดือน"
              {...a11yProps(15)}
              className={classes.tab}
            />
            <Tab
              label="สรุป Transaction ประจำเดือน"
              {...a11yProps(16)}
              className={classes.tab}
            />
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
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData5}
                report={PdfNumberOfCarAndIncome}
                transactionReport={() =>
                  exportExcel2(
                    {
                      date: format(selectedDate, "yyyy-MM-dd"),
                      checkpoint: checkpoint.toString(),
                      startTime: format(startTime, "HH:mm:ss"),
                      endTime: format(endTime, "HH:mm:ss"),
                    },
                    "/report-list-tx",
                    "รายงานTransactionจำนวนรถวิ่งผ่านด่าน M-Flow และรายได้พึงได้"
                  )
                }
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
                    // display: "flex",
                    // justifyContent: "center",
                    // marginRight: 206,
                    marginLeft: "82.5vh",
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
                transactionReport={() =>
                  exportExcel2(
                    {
                      date: format(selectedDate, "yyyy-MM-dd"),
                      checkpoint: checkpoint.toString(),
                      startTime: format(startTime, "HH:mm:ss"),
                      endTime: format(endTime, "HH:mm:ss"),
                    },
                    "/report-list-payment",
                    "รายงานTransactionการชำระค่าผ่านทางประจำวัน"
                  )
                }
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
                transactionReport={() =>
                  exportExcel2(
                    {
                      date: format(selectedDate, "yyyy-MM-dd"),
                      checkpoint: checkpoint.toString(),
                      startTime: format(startTime, "HH:mm:ss"),
                      endTime: format(endTime, "HH:mm:ss"),
                    },
                    "/report-income-3.1",
                    "รายงานTransactionการชำระค่าผ่านทางรายเดือน"
                  )
                }
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
                transactionReport={() =>
                  exportExcel2(
                    {
                      date: format(selectedDate, "yyyy-MM-dd"),
                      checkpoint: checkpoint.toString(),
                      startTime: format(startTime, "HH:mm:ss"),
                      endTime: format(endTime, "HH:mm:ss"),
                    },
                    "/report-income-fine-4.1.1",
                    "รายงานTransactionการชำระค่าปรับรายเดือน"
                  )
                }
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
                transactionReport={() =>
                  exportExcel2(
                    {
                      date: format(selectedDate, "yyyy-MM-dd"),
                      checkpoint: checkpoint.toString(),
                      startTime: format(startTime, "HH:mm:ss"),
                      endTime: format(endTime, "HH:mm:ss"),
                    },
                    "/report-debt-4.2.1",
                    "รายงานTransactionการชำระค่าผ่านทางรายเดือน"
                  )
                }
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
                transactionReport={() =>
                  exportExcel2(
                    {
                      date: format(selectedDate, "yyyy-MM-dd"),
                      checkpoint: checkpoint.toString(),
                      startTime: format(startTime, "HH:mm:ss"),
                      endTime: format(endTime, "HH:mm:ss"),
                    },
                    "/report-balance-5.2",
                    "รายงานTransactionรายการหนี้คงค้าง"
                  )
                }
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
                onFetchData={fetchData11}
                report={PdfGuarantee}
                transactionReport={() =>
                  exportExcel2(
                    {
                      date: format(selectedDate, "yyyy-MM-dd"),
                    },
                    "/report-toll-insurance-6.1",
                    "รายงานTransactionการประกันค่าธรรมเนียมผ่านทาง"
                  )
                }
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
                  <TableGuarantee1 dataList={guarantee} />
                  <TableGuarantee2 dataList={guarantee} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 215,
                  }}
                >
                  <TableGuarantee3
                    dataList={guarantee}
                    selectedDate={selectedDate}
                  />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={11}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData12}
                report={PdfResultFee}
                transactionReport={() =>
                  exportExcel2(
                    {
                      date: format(selectedDate, "yyyy-MM-dd"),
                      checkpoint: checkpoint.toString(),
                      startTime: format(startTime, "HH:mm:ss"),
                      endTime: format(endTime, "HH:mm:ss"),
                    },
                    "/report-interactive",
                    "รายงานTransactionการจัดเก็บค่าธรรมเนียม"
                  )
                }
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
                  <TableResultFee2 dataList={resultFeeData} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: 215,
                  }}
                >
                  <TableResultFee3
                    dataList={resultFeeData}
                    selectedDate={selectedDate}
                  />
                  <TableResultFee4
                    dataList={resultFeeData}
                    selectedDate={selectedDate}
                  />
                </div>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={12}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData13}
                report={slaPDF}
                transactionReport={() => {
                  alert("test");
                }}
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
                  การประเมินระดับการให้บริการ (SLA)
                </Typography>
                <Box>
                  <TableSLA
                    dataList={dataSLA}
                    dataColumnChart={dataColumnChart}
                    dataDonutChart={dataDonutChart}
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                  />
                </Box>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={13}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData13}
                report={slaBillingPDF}
                transactionReport={() => {
                  alert("test");
                }}
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
                  การประเมินระดับการให้บริการ (SLA)
                </Typography>
                <Box>
                  <TableSLABilling
                    dataList={dataSLA}
                    dataColumnChart={dataColumnChart}
                    dataDonutChart={dataDonutChart}
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                  />
                </Box>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={14}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection5
                onFetchData={fetchData13}
                report={slaPDF}
                transactionReport={() => {
                  alert("test");
                }}
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
                  การประเมินระดับการให้บริการ (SLA)
                </Typography>
                <Box>
                  <TableSLAPayment
                    dataList={dataSLA}
                    dataColumnChart={dataColumnChart}
                    dataDonutChart={dataDonutChart}
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                  />
                </Box>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={15}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection6
                onFetchData={fetchData13}
                report={slaPDF}
                transactionReport={() => {
                  alert("test");
                }}
                startDate={selectedDate}
                setStartDate={setSelectedDate}
                endDate={endDate}
                setEndDate={setEndDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  {`ทุกด่าน`} <br />
                  {`เอกสารสรุปยอดคงค้างประจำวันที่ ${format(
                    selectedDate,
                    "dd/MM/yy",
                    {
                      locale: th,
                    }
                  )} - ${format(endDate, "dd/MM/yy", { locale: th })}`}
                </Typography>
                <Box>
                  <TableRemainMonthly
                    startDate={selectedDate}
                    checkMonth={month}
                  />
                </Box>
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={16}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection6
                onFetchData={fetchData13}
                report={slaPDF}
                transactionReport={() => {
                  alert("test");
                }}
                startDate={selectedDate}
                setStartDate={setSelectedDate}
                endDate={endDate}
                setEndDate={setEndDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper>
                <Typography
                  className={classes.typography}
                  style={{ marginTop: 20 }}
                >
                  {`ทุกด่าน`} <br />
                  {`เอกสารสรุป Transaction ประจำวันที่ ${format(
                    selectedDate,
                    "dd/MM/yy",
                    {
                      locale: th,
                    }
                  )} - ${format(endDate, "dd/MM/yy", { locale: th })}`}
                </Typography>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <TableNumberOfCarTransactionMonthly
                    startDate={selectedDate}
                    checkMonth={month}
                  />
                  <TableReportMockMonthly
                    startDate={selectedDate}
                    checkMonth={month}
                  />
                </Box>
              </Paper>
            </Container>
          </TabPanel>
        </div>
      </Container>
    </>
  );
}
