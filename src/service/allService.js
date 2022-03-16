import axios from "axios";
import Swal from "sweetalert2";

const apiURLv1 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});
const apiURLv2 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});
const apiURLv3 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
});

const apiURLv10 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V10}`
      : `${process.env.REACT_APP_BASE_URL_V10}`,
});

const cannotConnectNetWork = {
  icon: "error",
  text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
};

export const getDropdown = () => {
  const response = apiURLv1.post("/dropdown").catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const operation = (sendData) => {
  const response = apiURLv2.post("/operation", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//DashBoard page
export const getDataDashBoard = (sendData) => {
  const response = apiURLv3
    .post("/dashboard-month", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//RawData page
export const getDataRawTransaction = (sendData) => {
  const response = apiURLv1.post("/raw-data", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataRawTransactionActivity = (sendData) => {
  const response = apiURLv1
    .post("/display-activity2", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//ExpertIncome page
export const getDataExpectIncome = (sendData) => {
  const response = apiURLv1.post("/expect-income", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataExpectIncomeActivity = (sendData) => {
  const response = apiURLv2
    .post("/expect-income-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const searchOnExpectIncome = (endpoint, sendData) => {
  const response = apiURLv1.post(endpoint, sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const searchByMatchTS = (endpoint, sendData) => {
  const response = apiURLv2.post(endpoint, sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const searchByPlate = (sendData) => {
  const response = apiURLv1
    .post("/search-plate-mflow", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//ExpertIncomeV2 page
export const getDataExpectIncomeV2 = (sendData) => {
  const response = apiURLv10.post("/expect-income", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataExpectIncomeActivityV2 = (sendData) => {
  const response = apiURLv10
    .post("/expect-income-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//CollectFromPK3 page
export const getDataCollectFromPk3 = (sendData) => {
  const response = apiURLv1
    .post("/display-pk3-storage_list", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });

  return response;
};

export const searchByInvoiceId = (endpoint, sendData) => {
  const response = apiURLv1.post(endpoint, sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });

  return response;
};

export const getDataByInvoiceNo = (sendData) => {
  const response = apiURLv1
    .post("/billing-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });

  return response;
};

//SuperAuditDisplay page
export const downLoadFileAuditDisplay = (sendData, header) => {
  const response = apiURLv1
    .post("/daily-income/pdf", sendData, header)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });

  return response;
};
export const getDataAuditDisplay = (sendData) => {
  const response = apiURLv1.post("/daily-income", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataSuperAudit = (sendData) => {
  const response = apiURLv1
    .post("/display-super-audit", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataSuperauditActivity = (sendData) => {
  const response = apiURLv2
    .post("/display-super-audit-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//superAdminDisplayV3 page
export const getDataSuperAuditV3 = (sendData) => {
  const response = apiURLv10
    .post("/display-super-audit", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataSuperAuditActivityV10 = (sendData) => {
  const response = apiURLv10
    .post("/display-super-audit-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//DataVolume page
export const getDataVolume = (sendData) => {
  const response = apiURLv3.post("/data-monitor", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//User page
export const updateUsers = (sendData) => {
  const response = apiURLv2
    .post("/update-user-status", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataUsers = () => {
  const response = apiURLv2.post("/user-list").catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const deleteUsers = (sendData) => {
  const response = apiURLv2.post("/delete-user", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//Config page
export const getDataConfig = (sendData) => {
  const response = apiURLv1.post("/system-config", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const deleteHighway = (sendData) => {
  const response = apiURLv1.post("/delete-highway", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const addHighway = (sendData) => {
  const response = apiURLv1.post("/add-highway", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const updateHighway = (sendData) => {
  const response = apiURLv1.post("/update-highway", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const exportExcel = (sendData) => {
  const response = apiURLv1.post("/export-csv", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//TransactionMonitor page
export const getDataFullAudit = (sendData) => {
  const response = apiURLv1
    .post("/fullaudit-monitor", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getImageFullAudit = (sendData) => {
  const response = apiURLv1
    .post("/fullaudit-monitor-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataHQ = (sendData) => {
  const response = apiURLv1
    .post("/hq-transaction-monitor", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getImageHQ = (sendData) => {
  const response = apiURLv1
    .post("/hq-transaction-monitor-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataLane = (sendData) => {
  const response = apiURLv1
    .post("/lane-transaction-monitor", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getImageLane = (sendData) => {
  const response = apiURLv1
    .post("/lane-transaction-monitor-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//Report page
export const getDataReportDisplay = (sendData) => {
  const response = apiURLv1.post("/display-ts", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};
export const getDataReportTS = (sendData) => {
  const response = apiURLv1.post("/export-pdf-ts", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataReportBilling = (sendData) => {
  const response = apiURLv1
    .post("/display-billing", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataReportPayment = (sendData) => {
  const response = apiURLv1
    .post("/display-payment", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataMonitor = (sendData) => {
  const response = apiURLv1
    .post("/payment-monitor", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataFeeDaily = (sendData) => {
  const response = apiURLv1.post("/report-tx", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataTXFeeDaily = (sendData) => {
  const response = apiURLv1.post("/report-list-tx", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataFeeDaily2 = (sendData) => {
  const response = apiURLv1.post("/report-payment", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataFeeMonthly = (sendData) => {
  const response = apiURLv1.post("/report-income", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getTxDailyIncome = (sendData) => {
  const response = apiURLv1
    .post("/report-list-payment", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getFineData = (sendData) => {
  const response = apiURLv1
    .post("/report-income-fine", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDebtData = (sendData) => {
  const response = apiURLv1.post("/report-debt", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getOverdueBalanceData = (sendData) => {
  const response = apiURLv1.post("/report-balance", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//ExportData page
export const exportData = (sendData) => {
  const response = apiURLv1.post("/", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//Pk3DisplayV2 page
export const getDataPk3V10 = (sendData) => {
  const response = apiURLv10.post("/display-pk3", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//Payment page
export const searchByPayment = (sendData) => {
  const response = apiURLv1.post("/search-payment", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataByPaymentNo = (sendData) => {
  const response = apiURLv1
    .post("/payment-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const removeMatch = (sendData) => {
  const response = apiURLv1
    .post("/pk3/remove-match", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const separateTransaction = (sendData) => {
  const response = apiURLv1
    .post("/separate-transaction", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const mergeTransaction = (sendData) => {
  const response = apiURLv1
    .post("/merge-transaction", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDatainfoCheckpoint = (sendData) => {
  const response = apiURLv1
    .post("/checkpoint-info", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};
