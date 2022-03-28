import { format } from "date-fns";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { image } from "../../image/logo_base64";
import axios from "axios";
import Swal from "sweetalert2";
import { th } from "date-fns/locale";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabun: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew Bold.ttf",
    italics: "THSarabunNew Italic.ttf",
    bolditalics: "THSarabunNew Bold Italic.ttf",
  },
};

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

export default function PdfTxDebt(
  selectedDate,
  checkpoint,
  startTime,
  endTime
) {
  const getDate = format(selectedDate, "yyyy-MM-dd");
  const ck = checkpoint;
  console.log(getDate, ck);

  const sendData = {
    date: format(selectedDate, "yyyy-MM-dd"),
    checkpoint: checkpoint.toString(),
    startTime: format(startTime, "HH:mm:ss"),
    endTime: format(endTime, "HH:mm:ss"),
  };

  let body = [
    [
      { text: "ลำดับ", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "เลขที่ใบแจ้งหนี้", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ประเภทใบแจ้งหนี้", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ประเภทหนี้", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "วันที่ออกใบแจ้งหนี้", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ประเภทผู้ใช้บริการ", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ด่าน", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ประเภทรถ", rowSpan: 2, margin: [0, 8, 0, 0] },
      {
        text: "ค่าธรรมเนียม",
        margin: [0, 8, 0, 0],
        border: [true, true, true, false],
      },
      {
        text: "ค่าปรับ",
        margin: [0, 8, 0, 0],
        border: [true, true, true, false],
      },
      {
        text: "ค่าทวงถาม",
        margin: [0, 8, 0, 0],
        border: [true, true, true, false],
      },
      {
        text: "รวมยอดเงิน",
        margin: [0, 8, 0, 0],
        border: [true, true, true, false],
      },
      { text: "สถานะการชำระ", rowSpan: 2, margin: [0, 8, 0, 0] },
    ],
    [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {
        text: "(บาท)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(บาท)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(บาท)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(บาท)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {},
    ],
  ];

  const pdfGenDownload = (docDefinition) => {
    return new Promise((resolve, reject) => {
      try {
        pdfMake
          .createPdf(docDefinition)
          .download("รายงานTransactionสรุปหนี้คงค้าง.pdf", () => {
            console.log("generate");
            resolve();
          });
      } catch (err) {
        reject(err);
      }
    });
  };

  const pushToBody = (res) => {
    return new Promise((resolve, reject) => {
      try {
        for (let index = 0; index < 101; index++) {
          // console.log(index);
          body.push([
            index + 1,
            !!res.data[index].invoiceNo ? res.data[index].invoiceNo : "-",
            "-",
            !!res.data[index].demand_fee && res.data[index].demand_fee === "-"
              ? "หนี้การผ่านทาง"
              : "หนี้ทวงถาม",
            !!res.data[index].issueDate ? res.data[index].issueDate : "-",
            !!res.data[index].transactionType
              ? res.data[index].transactionType
              : "-",
            "-",
            "-",
            !!res.data[index].totalAmount ? res.data[index].totalAmount : "-",
            !!res.data[index].fine ? res.data[index].fine : "-",
            !!res.data[index].demand_fee ? res.data[index].demand_fee : "-",
            !!res.data[index].total ? res.data[index].total : "-",
            "ยังไม่ชำระ",
          ]);
        }
        console.log("loop");
        return resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

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
              text: "รายงานสรุปหนี้คงค้าง",
              alignment: "left",
              fontSize: 9,
              margin: [40, 0, 0, 0],
            },
            {
              text: "ตส.05-2",
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

      // {
      //   text: "รายงานสรุปจำนวนรถวิ่งผ่านด่าน M-Flow และรายได้พึงได้",
      //   margin: [20, 0, 0, 0],
      //   fontSize: 14,
      // },

      // {
      //   style: "table",
      //   margin: [70, 10, 0, 0],
      //   table: {
      //     widths: [100, 190, 100, 190],
      //     body: [
      //       [
      //         {
      //           text: "ข้อมูล ณ วันที่ : ",
      //           alignment: "left",
      //         },
      //         {
      //           text: `วันที่ ${format(new Date(), "dd MMMM yyyy", {
      //             locale: th,
      //           })}`,
      //           alignment: "left",
      //         },
      //         {
      //           text: "ข้อมูลเริ่มต้นวันที่ :",
      //           alignment: "left",
      //         },
      //         {
      //           text: `${format(selectedDate, "dd MMMM yyyy", {
      //             locale: th,
      //           })} เวลา ${format(startTime, "HH:mm")} น.`,
      //           alignment: "left",
      //         },
      //       ],
      //       [
      //         {
      //           text: "สายทาง : ",
      //           alignment: "left",
      //         },
      //         {
      //           text: "ทางหลวงหมายเลข 9",
      //           alignment: "left",
      //         },
      //         {
      //           text: "ข้อมูลสิ้นสุดวันที่ :",
      //           alignment: "left",
      //         },
      //         {
      //           text: `${format(selectedDate, "dd MMMM yyyy", {
      //             locale: th,
      //           })} เวลา ${format(endTime, "HH:mm")} น.`,
      //           alignment: "left",
      //         },
      //       ],
      //       [
      //         {
      //           text: "ด่าน : ",
      //           alignment: "left",
      //         },
      //         {
      //           text: `${
      //             checkpoint === 0
      //               ? "ทุกด่าน"
      //               : checkpoint === 1
      //               ? "ทับช้าง 1"
      //               : checkpoint === 2
      //               ? "ทับช้าง 2"
      //               : checkpoint === 3
      //               ? "ธัญบุรี 1"
      //               : checkpoint === 4
      //               ? "ธัญบุรี 2"
      //               : ""
      //           }`,
      //           alignment: "left",
      //         },
      //         {},
      //         {},
      //       ],
      //     ],
      //   },
      // },

      {
        style: "table2",
        table: {
          widths: [30, 130, 55, 45, 55, 55, 30, 35, 40, 35, 35, 35, 50],
          headerRows: 2,
          body: body,
        },
      },
    ],
    styles: {
      table: { marginTop: 20, alignment: "center", fontSize: 11 },
      table2: {
        marginLeft: 8,
        marginTop: 20,
        alignment: "center",
        fontSize: 11,
      },
    },
    defaultStyle: { font: "THSarabun" },
  };

  Swal.fire({
    title: `กำลังดาวน์โหลดข้อมูล`,
    allowOutsideClick: false,
    didOpen: async () => {
      Swal.showLoading();
      return apiURL
        .post("/report-balance-5.2", sendData, {
          onDownloadProgress: (ProgressEvent) => {
            document.getElementById(
              "swal2-title"
            ).innerHTML = `กำลังดาวน์โหลดข้อมูล ${Math.ceil(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            )}%`;
          },
        })
        .then((res) => {
          Swal.close();
          return res;
        })
        .then(async (res) => {
          Swal.fire({
            title: `กำลังสร้างรายงาน ขั้นตอนนี้อาจใช้เวลานาน`,
            allowOutsideClick: false,
            didOpen: async () => {
              Swal.showLoading();
              await pushToBody(res);
              setTimeout(async () => {
                await pdfGenDownload(docDefinition);
                Swal.close();
              }, 1000);
            },
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
          });
        });
    },
  });

  return <></>;
}
