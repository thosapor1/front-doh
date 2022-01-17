import { format } from "date-fns";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { image } from "../../image/logo_base64";
import axios from "axios";
import Swal from "sweetalert2";
import ModalProgress from "../ModalProgress";
import React, { useState } from "react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabun: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew Bold.ttf",
    italics: "THSarabunNew Italic.ttf",
    bolditalics: "THSarabunNew Bold Italic.ttf",
  },
};

export default function TestPDF() {
  // const [open, setOpen] = useState(false);
  // const handleClose = setOpen(false);
  const url = "http://1d32-45-117-208-162.ap.ngrok.io/selectall-3";
  let sendData = { date: "2022-01-01" };

  let body = [
    [
      { text: "transaction", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "ด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "ช่อง", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "เวลาเข้าด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "ประเภทรถ", colSpan: 4, margin: [0, 5, 0, 0] },
      { text: "ประเภท TS", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "ค่าผ่านทาง", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "เลขที่ใบแจ้งหนี้", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "การชำระ", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "หมายเหตุ", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "สถานะ", rowSpan: 2, margin: [0, 5, 0, 0] },
    ],
    [
      {},
      {},
      {},
      {},
      { text: "จริง" },
      { text: "AD" },
      { text: "Lane" },
      { text: "HQ" },
      {},
      {},
      {},
    ],
  ];

  // for (let i = 0; i < 100; i++) {
  //   body.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  // }

  const pdfGen = (docDefinition, win) => {
    return new Promise((resolve, reject) => {
      try {
        pdfMake.createPdf(docDefinition).open({ resolve }, win);
      } catch (err) {
        reject(err);
      }
    });
  };
  const pdfGenDownload = (docDefinition) => {
    return new Promise((resolve, reject) => {
      try {
        pdfMake.createPdf(docDefinition).download("รายงานประจำวัน.pdf", () => {
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  Swal.fire({
    title: "ขั้นตอนนี้อาจใช้เวลานาน",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  axios
    .post(url, sendData, {
      onDownloadProgress: (ProgressEvent) => {
        // console.log(ProgressEvent);
      },
    })
    .then(async (res) => {
      // console.log(res.headers);
      // setOpen(true);
      console.log(res.data);
      // const limit = 20000;
      // let remainData = Math.ceil((res.length - 1) / (limit - 1));
      // for (let round = 1; round <= remainData; round++) {
      //   let index = 0;
      //   if (round > 1) {
      //     index = (round - 1) * limit + 1;
      //   }
      for (let index = 0; index < res.data.length - 1; index++) {
        // if (round > 1) {
        // }
        body.push([
          !!res.data[index].transactionId ? res.data[index].transactionId : "-",
          !!res.data[index].readFlag ? res.data[index].readFlag : "-",
          !!res.data[index].match_timestamp
            ? res.data[index].match_timestamp.split(" ")[0]
            : "-",
          !!res.data[index].match_timestamp
            ? res.data[index].match_timestamp.split(" ")[1]
            : "-",
          `C${res.data[index].mf_lane_vehicleClass}`,
          !!res.data[index].match_real_fee
            ? res.data[index].match_real_fee
            : "-",
          !!res.data[index].match_real_fee
            ? res.data[index].match_real_fee
            : "-",
          !!res.data[index].match_timestamp
            ? res.data[index].match_timestamp.split(" ")[0]
            : "-",
          !!res.data[index].match_timestamp
            ? res.data[index].match_timestamp.split(" ")[1]
            : "-",
          !!res.data[index].hasPayment ? res.data[index].hasPayment : "-",
          !!res.data[index].readFlag ? res.data[index].readFlag : "-",
        ]);
      }
      // console.log("round : ", round);
      console.log(body);
      // pdfMake.createPdf(docDefinition).open({}, win);
      await pdfGenDownload(docDefinition);
      // }
      Swal.close();
    });

  // axios
  //   .post(url, sendData, {
  //     onDownloadProgress: (ProgressEvent) => {
  //       let progress = Math.round(
  //         (ProgressEvent.loaded / ProgressEvent.total) * 100
  //       );
  //       console.log(progress);
  //     },
  //   })
  //   .then((res) => {
  // console.log(res.headers);
  // console.log(typeof res.data);
  //     let response = res.data ? JSON.stringify(res.data) : [];
  //     let response1 = res.data ? JSON.parse(response) : [];
  //     console.log(response1);
  //     return response1;
  //   })
  //   .then(async (response) => {
  //     const limit = 10000;
  //     let index = 0;
  //     let headerFlag = 0;
  //     let fileIndex = 0;
  //     let round = 0;
  //     for (round; round < response.length - 1; round++) {
  //       if (index < limit) {
  // console.log("first if");
  // console.log(headerFlag);
  //         if (headerFlag === 0) {
  //           body.push(
  //             [
  //               { text: "transaction", rowSpan: 2, margin: [0, 5, 0, 0] },
  //               { text: "ด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
  //               { text: "ช่อง", rowSpan: 2, margin: [0, 5, 0, 0] },
  //               { text: "เวลาเข้าด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
  //               { text: "ประเภทรถ", colSpan: 4, margin: [0, 5, 0, 0] },
  //               { text: "ประเภท TS", rowSpan: 2, margin: [0, 5, 0, 0] },
  //               { text: "ค่าผ่านทาง", rowSpan: 2, margin: [0, 5, 0, 0] },
  //               {
  //                 text: "เลขที่ใบแจ้งหนี้",
  //                 rowSpan: 2,
  //                 margin: [0, 5, 0, 0],
  //               },
  //               { text: "การชำระ", rowSpan: 2, margin: [0, 5, 0, 0] },
  //               { text: "หมายเหตุ", rowSpan: 2, margin: [0, 5, 0, 0] },
  //               { text: "สถานะ", rowSpan: 2, margin: [0, 5, 0, 0] },
  //             ],
  //             [
  //               {},
  //               {},
  //               {},
  //               {},
  //               { text: "จริง" },
  //               { text: "AD" },
  //               { text: "Lane" },
  //               { text: "HQ" },
  //               {},
  //               {},
  //               {},
  //             ]
  //           );
  //           headerFlag = 1;
  //         } else {
  //           body.push([
  //             // !!response[round].transactionId
  //             //   ? response[round].transactionId
  //             //   : "-",
  //             round,
  //             !!response[round].readFlag ? response[round].readFlag : "-",
  //             !!response[round].match_timestamp
  //               ? response[round].match_timestamp.split(" ")[0]
  //               : "-",
  //             !!response[round].match_timestamp
  //               ? response[round].match_timestamp.split(" ")[1]
  //               : "-",
  //             `C${response[round].mf_lane_vehicleClass}`,
  //             !!response[round].match_real_fee
  //               ? response[round].match_real_fee
  //               : "-",
  //             0,
  //             !!response[round].match_timestamp
  //               ? response[round].match_timestamp.split(" ")[0]
  //               : "-",
  //             !!response[round].match_timestamp
  //               ? response[round].match_timestamp.split(" ")[1]
  //               : "-",
  //             !!response[round].hasPayment ? response[round].hasPayment : "-",
  //             !!response[round].readFlag ? response[round].readFlag : "-",
  //           ]);
  //         }
  //         index++;
  //         // console.log(index);
  //       } else {
  //         index = 0;
  //         headerFlag = 0;
  //         await pdfGenDownload(docDefinition);
  //         console.log("fileIndex", fileIndex++);
  //       }
  //     }
  //     Swal.close();
  //   });

  // let win = window.open("", "_blank");

  const date = format(new Date(), "dd MMMM yyyy");

  let docDefinition = {
    footer: function (currentPage, pageCount) {
      pageCount = 1;
      return [
        {
          columns: [
            {},
            {
              text: `หน้า ${currentPage.toString()}`,
              alignment: "right",
              fontSize: 9,
              margin: [0, 0, 40, 10],
            },
          ],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 40,
              y1: -5,
              x2: 805,
              y2: -5,
              lineWidth: 1,
            },
          ],
        },
        {
          columns: [
            {
              text: "เจ้าหน้าที่ ชื่อตัวอย่าง นามสกุลตัวอย่าง ผ่ายตรวจสอบรายได้",
              alignment: "left",
              fontSize: 9,
              margin: [40, 0, 0, 0],
            },
            {
              text: format(new Date(), "dd MMMM yyyy HH.MMน."),
              alignment: "right",
              fontSize: 9,
              margin: [0, 0, 40, 0],
            },
          ],
        },
      ];
    },

    //page1
    pageOrientation: "landscape",
    content: [
      //page2
      {
        columns: [
          { image: `data:image/png;base64,${image}`, width: 60 },
          //   { text: `test`, width: 60 },
          {
            width: "auto",
            stack: [
              {
                text: "ฝ่ายตรวจสอบรายได้",
                fontSize: 20,
                bold: true,
                margin: [20, 5, 0, 0],
              },
              {
                //   absolutePosition: { x: 30, y: 20 },
                canvas: [
                  {
                    type: "line",
                    x1: 20,
                    y1: 2,
                    x2: 700,
                    y2: 2,
                    lineWidth: 1,
                  },
                ],
              },
              {
                text: "กองทางหลวงพิเศษระหว่างเมือง กรมทางหลวง",
                fontSize: 14,
                margin: [20, 0, 0, 0],
              },
            ],
          },
        ],
      },

      {
        text: "เอกสารแนบรายงานประจำวัน",
        alignment: "center",
        fontSize: 20,
        bold: true,
        margin: [0, 10, 0, 0],
      },
      { text: `${date}`, alignment: "center", fontSize: 14 },
      {
        text: "หน่วยงานรับการตรวจสอบ 902 - ทับช้าง 1",
        fontSize: 14,
        margin: [0, 10, 0, 0],
      },
      {
        text: "เอกสาร ตรวจสอบความถูกต้องของการตรวจรายได้ประจำวัน",
        fontSize: 14,
      },

      {
        style: "table2",
        table: {
          widths: [90, 50, 40, 60, 50, 50, 50, 50, 60, 60, 70],
          headerRows: 2,
          body: body,
        },
      },
    ],
    styles: {
      table: { marginTop: 20, alignment: "center", fontSize: 9 },
      table2: {
        marginLeft: 12,
        marginTop: 20,
        alignment: "center",
        fontSize: 11,
      },
    },
    defaultStyle: { font: "THSarabun" },
  };
  // pdfMake.createPdf(docDefinition).download("รายงานประจำวัน.pdf");
  // pdfMake.createPdf(docDefinition).open({}, win);

  return <div>{/* <ModalProgress open={open} onClose={handleClose} /> */}</div>;
}
