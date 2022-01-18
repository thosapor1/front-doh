import axios from "axios";
import { format } from "date-fns";
import React from "react";

export default async function exportExcel(props) {
  const { ts, selectDate } = props;
  //   console.log(fileType);
  let endpoint =
    "http://1d32-45-117-208-162.ap.ngrok.io/audit/api/vi/export-csv";
  const header = {
    "Content-Type": "application",
    responseType: "blob",
  };
  const sendData = {
    date: "2022-01-09",
    checkpoint: "1",
    // transactionId: resultDisplay.transactionId,
    // date: format(checkDate, "yyyy-MM-dd"),
  };

  axios.post(endpoint, sendData).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `download.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    console.log(res.data);
    console.log(url);
  });

  return <></>;
}
