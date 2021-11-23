import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FilterSectionMonitorPage from "../components/FilterSectionMonitorPage";
import ImageSectionMonitorPage from "../components/ImageSectionMonitorPage";
import TableSectionMonitorPage from "../components/TableSectionMonitorPage";
import axios from "axios";
import TableAWMonitorPage from "../components/TableAWMonitorPage";
import ImageAWMonitorPage from "../components/ImageAWMonitorPage";
import FilterAWMonitorPage from "../components/FilterAWMonitorPage";
import FilterSectionSearch from "../components/FilterSectionSearch";
import ImageSearchAudit from "../components/ImageSearchAudit";
import MatchTable from "../components/MatchTable";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
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

const useStyles = makeStyles((theme) => {
  return {};
});

export default function TransactionMonitorV1() {
  const classes = useStyles;

  const [value, setValue] = useState(0);
  const [dropdown, setDropdown] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [dataAudit, setDataAudit] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: "0",
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "0", label: "No." },
      { id: "1", label: "transactionId" },
      { id: "2", label: "เวลาเข้าด่าน" },
      { id: "3", label: "เวลามาถึงด่าน" },
    ],
    tableBodyData: [],
    gateValue: "0",
    gateList: [],
  });

  const [dataAW, setDataAW] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: "0",
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "0", label: "No." },
      { id: "1", label: "transactionId" },
      { id: "2", label: "refTransactionId" },
      { id: "3", label: "เวลาเข้าด่าน" },
      { id: "4", label: "เวลามาถึง" },
    ],
    tableBodyData: [],
    gateValue: "0",
    gateList: [],
  });

  const [dataFetc, setDataFETC] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: "0",
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "0", label: "No." },
      { id: "1", label: "transactionId" },
      { id: "2", label: "เวลาเข้าด่าน" },
      { id: "3", label: "เวลามาถึง" },
    ],
    tableBodyData: [],
    gateValue: "0",
    gateList: [],
  });

  const [auditSearch, setAuditSearch] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    transactionId: "",
    imageCrop: 0,
    imageFull: 0,
  });
  const [awSearch, setAwSearch] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    transactionId: "",
    imageCrop: 0,
    imageFull: 0,
  });
  const [fetcSearch, setFetcSearch] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    transactionId: "",
    imageCrop: 0,
    imageFull: 0,
  });

  const [matchTab, setMatchTab] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: 0,
    auditImageCrop: 0,
    auditImageFull: 0,
    awImageCrop: 0,
    awImageFull: 0,
    tableHeaderData: [
      { id: "0", label: "No." },
      { id: "1", label: "transactionId" },
      { id: "2", label: "timestamp" },
    ],
    tableBodyData: [],
    gateValue: 0,
    gateList: [],
    allTsTable: [],
  });

  const [pagination1, setPagination1] = useState({
    page: 1,
    countPage: 1,
  });
  const [pagination2, setPagination2] = useState({
    page: 1,
    countPage: 1,
  });
  const [pagination3, setPagination3] = useState({
    page: 1,
    countPage: 1,
  });
  const [paginationMatchTab, setPaginationMatchTab] = useState({
    page: 1,
    countPage: 1,
  });

  const getDropdown = () => {
    apiURL.post("/dropdown").then((res) => {
      console.log(res.data);
      setDropdown(res.data);
    });
  };

  const filter = (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId === 1) {
      setPagination1({ ...pagination1, page: 1 });
    } else {
      setPagination1({ ...pagination1, page: pageId });
    }

    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      page: pageId,
      date: date,
      checkpoint_id: checkpoint,
      gate_id: gate,
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    apiURL.post("/audit-transaction-monitor", sendData).then((res) => {
      setDataAudit({
        ...dataAudit,
        checkpointList: res.data.dropdown_Checkpoint,
        gateList: res.data.dropdown_Gate,
        tableBodyData: res.data.results,
      });
      setPagination1({
        countPage: res.data.totalPages,
        page: res.data.currentPage,
      });
    });
  };

  const filter2 = (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId === 1) {
      setPagination2({ ...pagination2, page: 1 });
    } else {
      setPagination2({ ...pagination2, page: pageId });
    }

    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      page: pageId,
      date: date,
      checkpoint_id: checkpoint.toString(),
      gate_id: gate,
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    apiURL.post("/hq-transaction-monitor", sendData).then((res) => {
      setDataAW({
        ...dataAW,
        checkpointList: dataAW.checkpointList,
        gateList: dataAW.gateList,
        tableBodyData: res.data.resultsDisplay,
      });
      setPagination2({
        countPage: res.data.totalPages,
        page: res.data.currentPage,
      });
    });
  };

  const filter3 = (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId === 1) {
      setPagination3({ ...pagination3, page: 1 });
    } else {
      setPagination3({ ...pagination3, page: pageId });
    }

    const date = format(selectDate, "yyyy-MM-dd");

    const sendData = {
      page: pageId,
      date: date,
      checkpoint_id: checkpoint,
      gate_id: gate,
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    // apiURL.post("/audit-transaction-monitor-activity", sendData).then((res) => {
    //   setDataAW({
    //     ...dataAW,
    //     checkpointList: res.data.dropdown_Checkpoint,
    //     gateList: res.data.dropdown_Gate,
    //   });

    //   setPagination2({
    //     countPage: res.data.totalPages,
    //     page: res.data.currentPage,
    //   });

    //   setDataAW({ ...dataAW, tableBodyData: mockData });
    //   setPagination2({ ...pagination2, countPage: res.data.countPage });
    // });
  };

  const filterMatchTab = (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId === 1) {
      setPaginationMatchTab({ ...paginationMatchTab, page: 1 });
    } else {
      setPaginationMatchTab({ ...paginationMatchTab, page: pageId });
    }

    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      page: pageId,
      date: date,
      checkpoint_id: checkpoint,
      gate_id: gate,
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    apiURL.post("/match-data-monitor", sendData).then((res) => {
      setMatchTab({
        ...matchTab,
        checkpointList: res.data.dropdown_Checkpoint,
        gateList: res.data.dropdown_Gate,
        tableBodyData: res.data,
      });
      setPaginationMatchTab({
        countPage: res.data.currentCount,
        page: res.data.currentPage,
      });
    });
  };

  const pageOnChange1 = (e, value) => {
    const sendData = {
      value: value,
      date: format(dataAudit.date, "yyyy-MM-dd"),
      checkpoint: dataAudit.checkpointValue,
      gate: dataAudit.gateValue,
    };
    console.log(sendData);
    filter(
      value,
      dataAudit.date,
      dataAudit.checkpointValue,
      dataAudit.gateValue
    );

    console.log(`${pagination1.page}`);
  };

  const pageOnChange2 = (e, value) => {
    setPagination2({ page: value });
    filter2(value, dataAW.date, dataAW.checkpointValue, dataAW.gateValue);

    console.log(`${pagination2.page}`);
  };

  const pageOnChange3 = (e, value) => {
    setPagination3({ page: value });
    filter3(value, dataFetc.date, dataFetc.checkpointValue, dataFetc.gateValue);

    console.log(`${pagination3.page}`);
  };
  const pageOnChangeMatchTab = (e, value) => {
    setPaginationMatchTab({ page: value });
    filterMatchTab(
      value,
      matchTab.date,
      matchTab.checkpointValue,
      matchTab.gateValue
    );

    console.log(`${paginationMatchTab.page}`);
  };

  const getImage1 = (item) => {
    console.log(item.audit_transactionId);
    console.log(item.timestamp);

    const date = item.timestamp.split(" ").shift();
    const sendData = {
      audit_transactionId: item.audit_transactionId,
      date: date,
    };
    console.log(sendData);
    apiURL.post("/audit-transaction-monitor-activity", sendData).then((res) => {
      console.log(res.data);
      setDataAudit({
        ...dataAudit,
        imageCrop: res.data.imageCrop,
        imageFull: res.data.imageFull,
      });
    });
  };
  const getImage2 = (item) => {
    console.log(item.cameras_cameraTimestamp);

    const date = item.cameras_cameraTimestamp.split(" ").shift().split("/");
    const date2 = `${date[2]}-${date[1]}-${date[0]}`;
    const sendData = {
      headerTransactionId: item.headerTransactionId,
      date: date2,
    };
    console.log("sendData:", sendData);
    apiURL.post("/aw-transaction-monitor-activity", sendData).then((res) => {
      console.log(res.data);
      setDataAW({
        ...dataAW,
        imageCrop: res.data.imageFile,
        imageFull: res.data.imageFileCrop,
      });
    });
  };

  const MatchTabGetImage = (
    audit_transactionId,
    pk3_transactionId_header,
    page
  ) => {
    const date = format(matchTab.date, "yyyy-MM-dd");
    setMatchTab({
      ...matchTab,
      auditImageCrop: 0,
      auditImageFull: 0,
      awImageCrop: 0,
      awImageFull: 0,
    });
    const sendData = {
      page: 1,
      date: date,
      audit_transactionId: audit_transactionId,
      pk3_transactionId_header: pk3_transactionId_header,
    };
    console.log(audit_transactionId, pk3_transactionId_header, page);
    apiURL.post("/match-data-monitor-activity", sendData).then((res) => {
      setMatchTab({
        ...matchTab,
        auditImageCrop: res.data.imageCrop,
        auditImageFull: res.data.imageFull,
        awImageCrop: res.data.awImageCrop,
        awImageFull: res.data.awImageFull,
      });
    });
  };

  const search = (selectDate, transactionId) => {
    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      audit_transactionId: transactionId,
    };
    apiURL.post("/audit-transaction-monitor-activity", sendData).then((res) => {
      console.log(res.data);
      setAuditSearch({
        ...auditSearch,
        imageCrop: res.data.imageCrop,
        imageFull: res.data.imageFull,
      });
    });
  };
  const search2 = (selectDate, transactionId) => {
    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      headerTransactionId: transactionId,
    };
    apiURL.post("/hq-transaction-monitor-activity", sendData).then((res) => {
      console.log(res.data);
      setAwSearch({
        ...awSearch,
        imageCrop: res.data.imageFile,
        imageFull: res.data.imageFileCrop,
      });
    });
  };
  const search3 = (selectDate, transactionId) => {
    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      headerTransactionId: transactionId,
    };
    apiURL.post("/hq-transaction-monitor-activity", sendData).then((res) => {
      console.log(res.data);
      setAwSearch({
        ...awSearch,
        imageCrop: res.data.imageFileCrop,
        imageFull: res.data.imageFile,
      });
    });
  };

  useEffect(() => {
    getDropdown()
  }, []);
  return (
    <>
      <Container maxWidth>
        <Typography>transaction monitor</Typography>

        <div className={classes.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Monitor" {...a11yProps(0)} className={classes.tab} />
            <Tab label="Search" {...a11yProps(1)} className={classes.tab} />
            <Tab label="Match" {...a11yProps(2)} className={classes.tab} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Grid
              container
              spacing={2}
              component={Paper}
              style={{ marginTop: 10 }}
            >
              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  audit sensor
                </Typography>
                <FilterSectionMonitorPage
                  dateValue={dataAudit.date}
                  dateOnChange={(date) => {
                    setDataAudit({
                      ...dataAudit,
                      date: date,
                    });
                    console.log("dateChange :", dataAudit.date);
                  }}
                  checkpointValue={dataAudit.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setDataAudit({
                      ...dataAudit,
                      checkpointValue: e.target.value,
                    });
                  }}
                  gateValue={dataAudit.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setDataAudit({ ...dataAudit, gateValue: e.target.value });
                  }}
                  buttonOnClick={() => {
                    filter(
                      pagination1.page,
                      dataAudit.date,
                      dataAudit.checkpointValue,
                      dataAudit.gateValue
                    );
                  }}
                  color={"red"}
                />
                <ImageSectionMonitorPage
                  imageCrop={dataAudit.imageCrop}
                  imageFull={dataAudit.imageFull}
                />
                <TableSectionMonitorPage
                  header={dataAudit.tableHeaderData}
                  body={dataAudit.tableBodyData}
                  tableOnClick={getImage1}
                  countPage={pagination1.countPage}
                  page={pagination1.page}
                  pageOnChange={pageOnChange1}
                  // style={?inActiveAudit:activeAudit}
                  color={"red"}
                />
              </Grid>

              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  transaction
                </Typography>
                <FilterAWMonitorPage
                  dateValue={dataAW.date}
                  dateOnChange={(date) => {
                    setDataAW({
                      ...dataAW,
                      date: date,
                    });
                    console.log("dateChange :", dataAW.date);
                  }}
                  checkpointValue={dataAW.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setDataAW({ ...dataAW, checkpointValue: e.target.value });
                  }}
                  gateValue={dataAW.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setDataAW({ ...dataAW, gateValue: e.target.value });
                  }}
                  buttonOnClick={() => {
                    filter2(
                      pagination2.page,
                      dataAW.date,
                      dataAW.checkpointValue,
                      dataAW.gateValue
                    );
                  }}
                  color={"green"}
                />
                <ImageAWMonitorPage
                  imageCrop={dataAW.imageCrop}
                  imageFull={dataAW.imageFull}
                />
                <TableAWMonitorPage
                  header={dataAW.tableHeaderData}
                  body={dataAW.tableBodyData}
                  tableOnClick={(item) => {
                    getImage2(item);
                  }}
                  countPage={pagination2.countPage}
                  page={pagination2.page}
                  pageOnChange={pageOnChange2}
                  color={"green"}
                />
              </Grid>

              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  lane (FETC)
                </Typography>
                <FilterSectionMonitorPage
                  dateValue={dataFetc.date}
                  dateOnChange={(date) => {
                    setDataFETC({
                      ...dataFetc,
                      date: date,
                    });
                    console.log("dateChange :", dataFetc.date);
                  }}
                  checkpointValue={dataFetc.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setDataFETC({
                      ...dataFetc,
                      checkpointValue: e.target.value,
                    });
                  }}
                  gateValue={dataFetc.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setDataFETC({ ...dataFetc, gateValue: e.target.value });
                  }}
                  buttonOnClick={() => {
                    filter3(
                      pagination3.page,
                      dataFetc.date,
                      dataFetc.checkpointValue,
                      dataFetc.gateValue
                    );
                  }}
                  color={"blue"}
                />
                <ImageSectionMonitorPage
                  imageCrop={dataFetc.imageCrop}
                  imageFull={dataFetc.imageFull}
                />
                <TableSectionMonitorPage
                  header={dataFetc.tableHeaderData}
                  body={dataFetc.tableBodyData}
                  tableOnClick={() => {
                    alert("click on table");
                  }}
                  countPage={pagination3.countPage}
                  page={pagination3.page}
                  pageOnChange={pageOnChange3}
                  color={"blue"}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Search Tab */}
          <TabPanel value={value} index={1}>
            <Grid
              container
              spacing={2}
              component={Paper}
              style={{ marginTop: 10 }}
            >
              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  audit sensor
                </Typography>
                <FilterSectionSearch
                  dateValue={auditSearch.date}
                  dateOnChange={(date) => {
                    setAuditSearch({
                      ...auditSearch,
                      date: date,
                    });
                    console.log("dateChange :", auditSearch.date);
                  }}
                  transactionValue={auditSearch.transactionId}
                  transactionOnChange={(e) => {
                    setAuditSearch({
                      ...auditSearch,
                      transactionId: e.target.value,
                    });
                  }}
                  buttonOnClick={() => {
                    search(auditSearch.date, auditSearch.transactionId);
                  }}
                  color={"red"}
                />
                <ImageSearchAudit
                  imageCrop={auditSearch.imageCrop}
                  imageFull={auditSearch.imageFull}
                />
              </Grid>

              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  transaction (AW)
                </Typography>
                <FilterSectionSearch
                  dateValue={awSearch.date}
                  dateOnChange={(date) => {
                    setAwSearch({
                      ...awSearch,
                      date: date,
                    });
                    console.log("dateChange :", awSearch.date);
                  }}
                  transactionValue={awSearch.transactionId}
                  transactionOnChange={(e) => {
                    setAwSearch({ ...awSearch, transactionId: e.target.value });
                  }}
                  buttonOnClick={() => {
                    search2(awSearch.date, awSearch.transactionId);
                  }}
                  color={"green"}
                />
                <ImageAWMonitorPage
                  imageCrop={awSearch.imageCrop}
                  imageFull={awSearch.imageFull}
                />
              </Grid>

              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  lane (FETC)
                </Typography>
                <FilterSectionSearch
                  dateValue={fetcSearch.date}
                  dateOnChange={(date) => {
                    setFetcSearch({
                      ...fetcSearch,
                      date: date,
                    });
                    console.log("dateChange :", fetcSearch.date);
                  }}
                  transactionValue={fetcSearch.transactionId}
                  transactionOnChange={(e) => {
                    setAwSearch({
                      ...fetcSearch,
                      transactionId: e.target.value,
                    });
                  }}
                  buttonOnClick={() => {
                    search3(fetcSearch.date, fetcSearch.transactionId);
                  }}
                  color={"blue"}
                />
                <ImageSectionMonitorPage
                  imageCrop={dataFetc.imageCrop}
                  imageFull={dataFetc.imageFull}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Match Tab */}
          <TabPanel value={value} index={2}>
            <Grid
              container
              spacing={2}
              component={Paper}
              style={{ marginTop: 10 }}
            >
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <FilterSectionMonitorPage
                  dateValue={matchTab.date}
                  dateOnChange={(date) => {
                    setMatchTab({
                      ...matchTab,
                      date: date,
                    });
                    console.log("dateChange :", matchTab.date);
                  }}
                  checkpointValue={matchTab.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setMatchTab({
                      ...matchTab,
                      checkpointValue: e.target.value,
                    });
                  }}
                  gateValue={matchTab.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setMatchTab({ ...matchTab, gateValue: e.target.value });
                  }}
                  buttonOnClick={() => {
                    filterMatchTab(
                      paginationMatchTab.page,
                      matchTab.date,
                      matchTab.checkpointValue,
                      matchTab.gateValue
                    );
                  }}
                  color={"blue"}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  audit sensor
                </Typography>

                <ImageSearchAudit
                  imageCrop={matchTab.auditImageCrop}
                  imageFull={matchTab.auditImageFull}
                />
              </Grid>

              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  transaction (AW)
                </Typography>
                <ImageAWMonitorPage
                  imageCrop={matchTab.awImageCrop}
                  imageFull={matchTab.awImageFull}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <MatchTable
                  dataList={matchTab.tableBodyData}
                  page={paginationMatchTab.page}
                  onChange={pageOnChangeMatchTab}
                  onClickRow={MatchTabGetImage}
                // onFetchData={fetchData}
                />
              </Grid>

              {/* <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  lane (FETC)
                </Typography>
                <FilterSectionSearch
                  dateValue={fetcSearch.date}
                  dateOnChange={(date) => {
                    setFetcSearch({
                      ...fetcSearch,
                      date: date,
                    });
                    console.log("dateChange :", fetcSearch.date);
                  }}
                  transactionValue={fetcSearch.transactionId}
                  transactionOnChange={(e) => {
                    setAwSearch({
                      ...fetcSearch,
                      transactionId: e.target.value,
                    });
                  }}
                  buttonOnClick={() => {
                    search3(fetcSearch.date, fetcSearch.transactionId);
                  }}
                  color={"blue"}
                />
                <ImageSectionMonitorPage
                  imageCrop={dataFetc.imageCrop}
                  imageFull={dataFetc.imageFull}
                />
              </Grid> */}
            </Grid>
          </TabPanel>
        </div>
      </Container>
    </>
  );
}
