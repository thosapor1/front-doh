import axios from "axios";
import { format } from "date-fns";
import React from "react";
import XLSX from "xlsx";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

export default function exportExcel(selectedDate, checkpoint) {
  //   console.log(fileType);
  const header = {
    "Content-Type": "application",
    responseType: "arraybuffer",
  };
  const sendData = {
    date: selectedDate,
    checkpoint: checkpoint.toString(),
  };

  apiURL.post("/export-xlsx", sendData).then((res) => {
    console.log(res.data.results);

    const ws = XLSX.utils.json_to_sheet(res.data.results);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "รายงานประจำวัน");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  });

  return <></>;
}
