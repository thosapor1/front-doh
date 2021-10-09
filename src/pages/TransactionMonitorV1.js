import { Container, Grid, Paper, Typography } from "@material-ui/core";
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

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V1}`,
});
export default function TransactionMonitorV1() {
  const [dataAudit, setDataAudit] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: 0,
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "1", label: "transactionId" },
      { id: "2", label: "timestamp" },
    ],
    tableBodyData: [],
    gateValue: 0,
    gateList: [],
  });

  const [dataAW, setDataAW] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: 0,
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "1", label: "transactionId" },
      { id: "2", label: "refTransactionId" },
      { id: "3", label: "timestamp" },
    ],
    tableBodyData: [],
    gateValue: 0,
    gateList: [],
  });

  const [dataFetc, setDataFETC] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: 1,
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "1", label: "transactionId" },
      { id: "2", label: "timestamp" },
    ],
    tableBodyData: [],
    gateValue: 1,
    gateList: [],
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

  const filter = (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId == 1) {
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
      checkpoint_id: checkpoint,
      gate_id: gate,
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    apiURL.post("/aw-transaction-monitor", sendData).then((res) => {
      setDataAW({
        ...dataAW,
        checkpointList: res.data.dropdown_Checkpoint,
        gateList: res.data.dropdown_Gate,
        tableBodyData: res.data.results,
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

  const fetchData = async () => {
    const sendData = {
      date: new Date().setDate(new Date().getDate() - 1),
      checkpoint_id: "0",
      gate_id: "0",
      page: 1,
    };

    await filter(
      sendData.page,
      sendData.date,
      sendData.checkpoint_id,
      sendData.gate_id
    );
    await filter2(
      sendData.page,
      sendData.date,
      sendData.checkpoint_id,
      sendData.gate_id
    );
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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container maxWidth>
      <Typography>transaction monitor</Typography>

      <Grid container spacing={2} component={Paper} style={{ marginTop: 10 }}>
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
            checkpointList={dataAudit.checkpointList}
            checkpointOnChange={(e) => {
              setDataAudit({ ...dataAudit, checkpointValue: e.target.value });
            }}
            gateValue={dataAudit.gateValue}
            gateList={dataAudit.gateList}
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
            color={"red"}
          />
        </Grid>

        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <Typography variant="h6" align="center">
            transaction (AW)
          </Typography>
          <FilterSectionMonitorPage
            dateValue={dataAW.date}
            dateOnChange={(date) => {
              setDataAW({
                ...dataAW,
                date: date,
              });
              console.log("dateChange :", dataAW.date);
            }}
            checkpointValue={dataAW.checkpointValue}
            checkpointList={dataAW.checkpointList}
            checkpointOnChange={(e) => {
              setDataAW({ ...dataAW, checkpointValue: e.target.value });
            }}
            gateValue={dataAW.gateValue}
            gateList={dataAW.gateList}
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
            checkpointList={dataFetc.checkpointList}
            checkpointOnChange={(e) => {
              setDataFETC({ ...dataFetc, checkpointValue: e.target.value });
            }}
            gateValue={dataFetc.gateValue}
            gateList={dataFetc.gateList}
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
    </Container>
  );
}
