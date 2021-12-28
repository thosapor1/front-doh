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

export const getDropdown = () => {
  const response = apiURLv1.post("/dropdown").catch((error) => {
    Swal.fire({
      icon: "error",
      text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
    });
  });
  return response;
};

export const getDataDashBoard = (sendData) => {
  const response = apiURLv3
    .post("/dashboard-month", sendData)
    .catch((error) => {
      Swal.fire({
        icon: "error",
        text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
      });
    });
  return response;
};

export const getDataRawTransaction = (sendData) => {
  const response = apiURLv1.post("/raw-data", sendData).catch((error) => {
    Swal.fire({
      icon: "error",
      text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
    });
  });
  return response;
};

export const getDataExpectIncome = (sendData) => {
  const response = apiURLv1.post("/expect-income", sendData).catch((error) => {
    Swal.fire({
      icon: "error",
      text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
    });
  });
  return response;
};

export const getDataExpectIncomeActivity = (sendData) => {
  const response = apiURLv2
    .post("/expect-income-activity", sendData)
    .catch((error) => {
      Swal.fire({
        icon: "error",
        text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
      });
    });
  return response;
};

export const getDataCollectFromPk3 = (sendData) => {
  const response = apiURLv1.post("/", sendData).catch((error) => {
    Swal.fire({
      icon: "error",
      text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
    });
  });
  return response;
};
