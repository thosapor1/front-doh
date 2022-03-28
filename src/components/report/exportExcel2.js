import axios from "axios";
import { format } from "date-fns";
import React from "react";
import Swal from "sweetalert2";
import XLSX from "xlsx";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

export default function exportExcel2(sendData, endpoint, reportName) {
  //   console.log(fileType);
  const header = {
    "Content-Type": "application",
    responseType: "arraybuffer",
  };

  Swal.fire({
    title: "Loading",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });
  apiURL.post(endpoint, sendData).then((res) => {
    console.log(res.data.result);

    if (res.data.status === false) {
      Swal.fire({
        title: "ไม่มีข้อมูล",
        allowOutsideClick: false,
        icon: "warning",
      });
    } else {
      const ws = XLSX.utils.json_to_sheet(res.data.result);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "รายงาน");
      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, `${reportName}.xlsx`);
      Swal.close();
    }
  });

  return <></>;
}
