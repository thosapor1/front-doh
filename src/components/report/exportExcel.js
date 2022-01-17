import axios from "axios";
import { format } from "date-fns";
import React from "react";
import XLSX from "xlsx";

export default async function exportExcel(props) {
  const { ts, selectDate } = props;
  //   console.log(fileType);
  let endpoint =
    "http://1d32-45-117-208-162.ap.ngrok.io/audit/api/v1/export-xlsx";
  const header = {
    "Content-Type": "application",
    responseType: "arraybuffer",
  };
  const sendData = {
    date: "2022-01-09",
    checkpoint: "0",
    gate: "0",
  };

  axios.post(endpoint, sendData).then((res) => {
    // const url = window.URL.createObjectURL(new Blob([res.data]));
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", `download.xlsx`);
    // document.body.appendChild(link);
    // link.click();
    // link.parentNode.removeChild(link);

    const ws = XLSX.utils.json_to_sheet(res.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
    console.log(res.data);
    // console.log(url);
  });

  return <></>;
}
