import { format } from "date-fns";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { image } from "../../image/logo_base64";
import axios from "axios";
import Swal from "sweetalert2";

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
  const url = "http://1d32-45-117-208-162.ap.ngrok.io/selectall-2";
  let sendData = { date: "2022-01-01" };

  let body = [
    // [
    //   { text: "transaction", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "ด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "ช่อง", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "เวลาเข้าด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "ประเภทรถ", colSpan: 4, margin: [0, 5, 0, 0] },
    //   { text: "ประเภท TS", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "ค่าผ่านทาง", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "เลขที่ใบแจ้งหนี้", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "การชำระ", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "หมายเหตุ", rowSpan: 2, margin: [0, 5, 0, 0] },
    //   { text: "สถานะ", rowSpan: 2, margin: [0, 5, 0, 0] },
    // ],
    // [
    //   {},
    //   {},
    //   {},
    //   {},
    //   { text: "จริง" },
    //   { text: "AD" },
    //   { text: "Lane" },
    //   { text: "HQ" },
    //   {},
    //   {},
    //   {},
    // ],
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
  const pdfGendownload = (docDefinition) => {
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

  // axios
  //   .post(url, sendData, {
  //     onDownloadProgress: (ProgressEvent) => {
  //       console.log(ProgressEvent);
  //     },
  //   })
  //   .then(async (res) => {
  //     const limit = 100;
  //     console.log(res.headers);
  //     console.log(res.data);
  //     let remainData = Math.ceil((res.data.length - 1) / (limit - 1));
  //     for (let round = 1; round <= remainData; round++) {
  //       let index = 0;
  //       if (round > 1) {
  //         index = (round - 1) * limit + 1;
  //       }
  //       for (index; index < limit + 1; index++) {
  //         if (round > 1) {
  //         }
  //         body.push([
  //           !!res.data[index].readFlag ? res.data[index].transactionId : "-",
  //           !!res.data[index].readFlag ? res.data[index].readFlag : "-",
  //           res.data[index].match_timestamp.split(" ")[0],
  //           res.data[index].match_timestamp.split(" ")[1],
  //           `C${res.data[index].mf_lane_vehicleClass}`,
  //           res.data[index].match_real_fee,
  //           0,
  //           res.data[index].match_timestamp.split(" ")[0],
  //           res.data[index].match_timestamp.split(" ")[1],
  //           res.data[index].hasPayment,
  //           res.data[index].readFlag,
  //         ]);
  //       }
  //       console.log("round : ", round);
  //       // pdfMake.createPdf(docDefinition).open({}, win);
  //       await pdfGen(docDefinition, win);
  //     }
  //     Swal.close();
  //   });

  axios
    .post(url, sendData, {
      onDownloadProgress: (ProgressEvent) => {
        console.log(ProgressEvent);
      },
    })
    .then(async (res) => {
      const limit = 10000;
      console.log(res.headers);
      console.log(res.data);
      // let remainData = Math.ceil((res.data.length - 1) / (limit - 1));
      let index = 0;
      let headerFlag = 0;
      let fileIndex = 0;
      let round = 0;
      for (round; round < res.data.length - 1; round++) {
        if (index < limit) {
          // console.log("first if");
          // console.log(headerFlag);
          if (headerFlag === 0) {
            body.push(
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
              ]
            );
            headerFlag = 1;
          } else {
            // console.log("else");
            body.push([
              !!res.data[round].transactionId
                ? res.data[round].transactionId
                : "-",
              !!res.data[round].readFlag ? res.data[round].readFlag : "-",
              res.data[round].match_timestamp.split(" ")[0],
              res.data[round].match_timestamp.split(" ")[1],
              `C${res.data[round].mf_lane_vehicleClass}`,
              res.data[round].match_real_fee,
              0,
              res.data[round].match_timestamp.split(" ")[0],
              res.data[round].match_timestamp.split(" ")[1],
              res.data[round].hasPayment,
              res.data[round].readFlag,
            ]);
          }
          index++;
          // console.log(index);
        } else {
          index = 1;
          headerFlag = 0;
          await pdfGendownload(docDefinition);
          console.log("fileIndex", fileIndex++);
        }

        // console.log("round : ", round);
        // let index = 0;

        // if (round > 1) {
        //   index = (round - 1) * limit + 1;
        // }

        // for (index; index < round * limit; index++) {
        //   console.log(index);
        //   if (round > 1) {
        //   }
        // }
        // // pdfMake.createPdf(docDefinition).open({}, win);
        // // await pdfGen(docDefinition, win);
        // body = [];
      }
      Swal.close();
    });

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
              text: `หน้า ${currentPage.toString()} / ชุดที่ ${pageCount.toString()}`,
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
}
