import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from "sweetalert2";
import { image } from "../../image/logo_base64";

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

export default async function PdfFeeDaily(
  selectedDate,
  checkpoint,
  startTime,
  endTime
) {
  // let win = window.open("", "_blank");
  const getDate = !!selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const ck = checkpoint;
  console.log(getDate, ck);

  const sendData = {
    date: format(selectedDate, "yyyy-MM-dd"),
    checkpoint: checkpoint.toString(),
    startTime: format(startTime, "HH:mm:ss"),
    endTime: format(endTime, "HH:mm:ss"),
  };

  let body = [];

  Swal.fire({
    title: `กำลังสร้างรายงาน`,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      return apiURL.post("/report-payment", sendData).then(async (res) => {
        body.push(
          [
            {
              text: "ลำดับ",
              rowSpan: 2,
              margin: [0, 8, 0, 0],
            },
            {
              text: "ช่องทางรับชำระเงิน",
              rowSpan: 2,
              colSpan: 2,
              margin: [0, 8, 0, 0],
            },
            {},
            { text: "รายการรับชำระ", border: [true, true, true, false] },
            { text: "ยอดเงินรับชำระ", border: [true, true, true, false] },
            { text: "หมายเหตุ", rowSpan: 2, margin: [0, 8, 0, 0] },
          ],
          [
            {},
            {},
            {},
            {
              text: "(รายการ)",
              margin: [0, -5, 0, 0],
              border: [true, false, true, true],
            },
            {
              text: "(บาท)",
              margin: [0, -5, 0, 0],
              border: [true, false, true, true],
            },
            {},
          ],
          [
            { text: "1" },
            { text: "บัญชีธนาคาร (Account)", alignment: "left" },
            { text: "BPDDT", alignment: "left" },
            {
              text: res.data.payment[0].payment_list.toLocaleString(),
            },
            {
              text: res.data.payment[0].amount_received.toLocaleString(),
            },
            { text: "" },
          ],
          [
            { text: "2" },
            {
              text: "บัตรเครดิต/เดบิต (Credit/Debit Card)",
              alignment: "left",
            },
            { text: "AQDD", alignment: "left" },
            {
              text: res.data.payment[2].payment_list.toLocaleString(),
            },
            {
              text: res.data.payment[2].amount_received.toLocaleString(),
            },
            { text: "" },
          ],
          [
            { text: "3" },
            {
              text: "เอ็มพาส (M-PASS)",
              alignment: "left",
            },
            { text: "M-PASS", alignment: "left" },
            {
              text: res.data.payment[7].payment_list.toLocaleString(),
            },
            {
              text: res.data.payment[7].amount_received.toLocaleString(),
            },
            { text: "" },
          ],
          [
            { text: "4" },
            {
              text: "อีซี่พาส (EASYPASS)",
              alignment: "left",
            },
            { text: "EASYPASS", alignment: "left" },
            {
              text: res.data.payment[4].payment_list.toLocaleString(),
            },
            {
              text: res.data.payment[4].amount_received.toLocaleString(),
            },
            { text: "" },
          ],
          [
            {
              text: "5",
              border: [true, true, true, false],
            },
            {
              text: "การจ่ายผ่านบิล",
              alignment: "left",
              border: [true, true, true, false],
            },
            {
              text: "SPODD",
              alignment: "left",
              border: [true, true, true, false],
            },
            {
              text: "",
              border: [true, true, true, false],
            },
            {
              text: "",
              border: [true, true, true, false],
            },
            {
              text: "",
              border: [true, true, true, false],
            },
          ],
          [
            {
              text: "",
              border: [true, false, true, false],
            },
            {
              text: "1)	โมบายแบงค์กิ้ง (Mobile Banking)",
              alignment: "left",
              border: [true, false, true, false],
              margin: [10, 0, 0, 0],
            },
            {
              text: "",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: res.data.payment[6].payment_list.toLocaleString(),
              border: [true, false, true, false],
            },
            {
              text: res.data.payment[6].amount_received.toLocaleString(),
              border: [true, false, true, false],
            },
            {
              text: "",
              border: [true, false, true, false],
            },
          ],
          [
            {
              text: "",
              border: [true, false, true, false],
            },
            {
              text: "2)	ธนาคาร (Counter Bank)",
              alignment: "left",
              border: [true, false, true, false],
              margin: [10, 0, 0, 0],
            },
            {
              text: "",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: "0",
              border: [true, false, true, false],
            },
            {
              text: "0",
              border: [true, false, true, false],
            },
            {
              text: "",
              border: [true, false, true, false],
            },
          ],
          [
            {
              text: "",
              border: [true, false, true, false],
            },
            {
              text: "3)	อินเทอร์เน็ต (Internet/ CRD)",
              alignment: "left",
              border: [true, false, true, false],
              margin: [10, 0, 0, 0],
            },
            {
              text: "",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: res.data.payment[5].payment_list.toLocaleString(),
              border: [true, false, true, false],
            },
            {
              text: res.data.payment[5].amount_received.toLocaleString(),
              border: [true, false, true, false],
            },
            {
              text: "",
              border: [true, false, true, false],
            },
          ],
          [
            {
              text: "",
              border: [true, false, true, false],
            },
            {
              text: "4)	ตู้บริการเงินสด (ATM)",
              alignment: "left",
              border: [true, false, true, false],
              margin: [10, 0, 0, 0],
            },
            {
              text: "",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: res.data.payment[1].payment_list.toLocaleString(),
              border: [true, false, true, false],
            },
            {
              text: res.data.payment[1].amount_received.toLocaleString(),
              border: [true, false, true, false],
            },
            {
              text: "",
              border: [true, false, true, false],
            },
          ],
          [
            {
              text: "",
              border: [true, false, true, false],
            },
            {
              text: "5)	ผู้ให้บริการรับชำระเงิน (Counter Service)",
              alignment: "left",
              border: [true, false, true, false],
              margin: [10, 0, 0, 0],
            },
            {
              text: "",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: res.data.payment[3].payment_list.toLocaleString(),
              border: [true, false, true, false],
            },
            {
              text: res.data.payment[3].amount_received.toLocaleString(),
              border: [true, false, true, false],
            },
            {
              text: "",
              border: [true, false, true, false],
            },
          ],
          [
            {
              text: "",
              border: [true, false, true, true],
            },
            {
              text: "6)	ใบแจ้งการชำระเงิน (Bill Payment)",
              alignment: "left",
              border: [true, false, true, true],
              margin: [10, 0, 0, 0],
            },
            {
              text: "",
              alignment: "left",
              border: [true, false, true, true],
            },
            {
              text: "0",
              border: [true, false, true, true],
            },
            {
              text: "0",
              border: [true, false, true, true],
            },
            {
              text: "",
              border: [true, false, true, true],
            },
          ],
          [
            {
              text: "6",
            },
            {
              text: "อิ่นๆ",
              alignment: "left",
            },
            {
              text: "",
              alignment: "left",
            },
            {
              text: "0",
            },
            {
              text: "0",
            },
            {
              text: "",
            },
          ],
          [
            {
              text: "",
            },
            {
              text: "รวมทั้งหมด",
              alignment: "left",
            },
            {
              text: "",
            },
            {
              text: res.data.payment[8].payment_list.toLocaleString(),
            },
            {
              text: res.data.payment[8].amount_received.toLocaleString(),
            },
            {
              text: "",
            },
          ]
        );
        setTimeout(async () => {
          await pdfGenDownload(docDefinition);
          Swal.close();
        }, 1000);
        // console.log();
      });
    },
  });

  const pdfGenDownload = (docDefinition) => {
    return new Promise((resolve, reject) => {
      try {
        console.log("generate");
        pdfMake
          .createPdf(docDefinition)
          .download("รายงานสรุปการชำระค่าผ่านทางประจำวัน.pdf", () => {
            resolve();
          });
      } catch (err) {
        reject(err);
      }
    });
  };

  let docDefinition = {
    footer: function (currentPage, pageCount) {
      return [
        {
          columns: [
            {},
            {
              // text: `หน้า ${currentPage.toString()}`,
              text: "",
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
              text: "รายงานสรุปการชำระค่าผ่านทางประจำวัน",
              alignment: "left",
              fontSize: 9,
              margin: [40, 0, 0, 0],
            },
            {
              text: "ตส.02",
              alignment: "right",
              fontSize: 9,
              margin: [0, 0, 40, 0],
            },
          ],
        },
      ];
    },
    pageOrientation: "landscape",
    //page1
    content: [
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
        text: "รายงานสรุปการชำระค่าผ่านทางประจำวัน",
        fontSize: 14,
        margin: [0, 20, 0, 0],
      },

      {
        style: "table",
        margin: [70, 10, 0, 0],
        table: {
          widths: [100, 190, 100, 190],
          body: [
            [
              {
                text: "ข้อมูล ณ วันที่ : ",
                alignment: "left",
              },
              {
                text: `วันที่ ${format(new Date(), "dd MMMM yyyy", {
                  locale: th,
                })}`,
                alignment: "left",
              },
              {
                text: "ข้อมูลเริ่มต้นวันที่ :",
                alignment: "left",
              },
              {
                text: `${format(selectedDate, "dd MMMM yyyy", {
                  locale: th,
                })} เวลา ${format(startTime, "HH:mm")} น.`,
                alignment: "left",
              },
            ],
            [
              {
                text: "สายทาง : ",
                alignment: "left",
              },
              {
                text: "ทางหลวงหมายเลข 9",
                alignment: "left",
              },
              {
                text: "ข้อมูลสิ้นสุดวันที่ :",
                alignment: "left",
              },
              {
                text: `${format(selectedDate, "dd MMMM yyyy", {
                  locale: th,
                })} เวลา ${format(endTime, "HH:mm")} น.`,
                alignment: "left",
              },
            ],
          ],
        },
      },

      {
        columns: [
          {
            margin: [70, 10, 0, 0],
            style: "table",
            table: {
              widths: [30, 200, 81, 81, 81, 90],
              body: body,
            },
          },
        ],
      },
      {
        text: "(____________________)",
        margin: [590, 15, 0, 0],
      },
      {
        text: "ผู้ตรวจสอบ",
        margin: [620, 5, 0, 0],
      },

      //page2
    ],
    styles: {
      table: { marginTop: 10, alignment: "center", fontSize: 11 },
      table2: { marginTop: 10, alignment: "center", fontSize: 11 },
    },
    defaultStyle: { font: "THSarabun" },
  };
  // await pushToBody(res);
  // console.log(body1, body2);

  // pdfMake.createPdf(docDefinition).open({}, win);
}
