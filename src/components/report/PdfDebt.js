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

export default async function PdfDebt(
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

  let body1 = [];
  let body2 = [];
  let body3 = [];
  let body4 = [];
  let body5 = [];

  Swal.fire({
    title: `กำลังสร้างรายงาน`,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      return apiURL.post("/report-balance", sendData).then(async (res) => {
        body1.push(
          [
            {
              text: "รายการใบแจ้งหนี้ที่ชำระ",
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          [
            {
              text: "ประเภทรถ",
              rowSpan: 3,
              margin: [23, 0, 0, 0],
            },
            { text: "รายได้พึงได้ที่ชำระ", colSpan: 3 },
            {},
            {},
          ],
          [
            {},
            { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
            { text: "ค่าผ่านทาง", border: [true, true, true, false] },
            { text: "ค่าปรับ", border: [true, true, true, false] },
          ],
          [
            {},
            {
              text: "(รายการ)",
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
          ],
          [
            { text: "C1" },
            { text: res.data.result_1[0].bill.toLocaleString() },
            {
              text: res.data.result_1[0].fee.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_1[0].fine.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "C2" },
            { text: res.data.result_1[1].bill.toLocaleString() },
            {
              text: res.data.result_1[1].fee.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_1[1].fine.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "C3" },
            { text: res.data.result_1[2].bill.toLocaleString() },
            {
              text: res.data.result_1[2].fee.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_1[2].fine.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "รวม" },
            { text: res.data.result_1[3].bill.toLocaleString() },
            {
              text: res.data.result_1[3].fee.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_1[3].fine.toLocaleString(),
              alignment: "right",
            },
          ]
        );

        body2.push(
          [
            {
              text: "รายการใบแจ้งหนี้ที่ค้างชำระ",
              colSpan: 3,
            },
            {},
            {},
          ],
          [{ text: "หนี้คงค้าง", colSpan: 3 }, {}, {}],
          [
            { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
            { text: "ค่าผ่านทาง", border: [true, true, true, false] },
            { text: "ค่าปรับ", border: [true, true, true, false] },
          ],
          [
            {
              text: "(รายการ)",
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
          ],
          [
            { text: res.data.result_2[0].bill.toLocaleString() },
            {
              text: res.data.result_2[0].fee.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_2[0].fine.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: res.data.result_2[1].bill.toLocaleString() },
            {
              text: res.data.result_2[1].fee.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_2[1].fine.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: res.data.result_2[2].bill.toLocaleString() },
            {
              text: res.data.result_2[2].fee.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_2[2].fine.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: res.data.result_2[3].bill.toLocaleString() },
            {
              text: res.data.result_2[3].fee.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_2[3].fine.toLocaleString(),
              alignment: "right",
            },
          ]
        );

        body3.push(
          [
            {
              text: "รายการใบแจ้งหนี้ค่าทวงถาม",
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          [
            { text: "ค่าทวงถามที่ชำระ", colSpan: 2 },
            {},
            { text: "ค่าทวงถามที่ชำระ", colSpan: 2 },
            {},
          ],
          [
            { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
            { text: "ค่าทวงถาม", border: [true, true, true, false] },
            { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
            { text: "ค่าทวงถาม", border: [true, true, true, false] },
          ],
          [
            {
              text: "(รายการ)",
              border: [true, false, true, true],
              margin: [0, -5, 0, 0],
            },
            {
              text: "(บาท)",
              border: [true, false, true, true],
              margin: [0, -5, 0, 0],
            },
            {
              text: "(รายการ)",
              border: [true, false, true, true],
              margin: [0, -5, 0, 0],
            },
            {
              text: "(บาท)",
              border: [true, false, true, true],
              margin: [0, -5, 0, 0],
            },
          ],
          [
            { text: res.data.result_3[0].bill_1.toLocaleString() },
            {
              text: res.data.result_3[0].demand_fee_1.toLocaleString(),
              alignment: "right",
            },
            { text: res.data.result_3[0].bill_2.toLocaleString() },
            {
              text: res.data.result_3[0].demand_fee_2.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: res.data.result_3[1].bill_1.toLocaleString() },
            {
              text: res.data.result_3[1].demand_fee_1.toLocaleString(),
              alignment: "right",
            },
            { text: res.data.result_3[1].bill_2.toLocaleString() },
            {
              text: res.data.result_3[1].demand_fee_2.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: res.data.result_3[2].bill_1.toLocaleString() },
            {
              text: res.data.result_3[2].demand_fee_1.toLocaleString(),
              alignment: "right",
            },
            { text: res.data.result_3[2].bill_2.toLocaleString() },
            {
              text: res.data.result_3[2].demand_fee_2.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: res.data.result_3[3].bill_1.toLocaleString() },
            {
              text: res.data.result_3[3].demand_fee_1.toLocaleString(),
              alignment: "right",
            },
            { text: res.data.result_3[3].bill_2.toLocaleString() },
            {
              text: res.data.result_3[3].demand_fee_2.toLocaleString(),
              alignment: "right",
            },
          ]
        );

        body4.push(
          [
            {
              text: `สรุปข้อมูลรถวันที่ ${format(selectedDate, "dd MMMM yyyy", {
                locale: th,
              })}`,
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            {
              text: "ใบแจ้งหนี้รถวิ่งผ่านทาง",
              alignment: "left",
            },
            {
              text: (
                res.data.result_1[3].bill + res.data.result_2[3].bill
              ).toLocaleString(),
              alignment: "right",
            },
            { text: "รายการ" },
          ],
          [
            {
              text: "รายได้พึงได้รวม",
              border: [true, false, true, false],
              alignment: "left",
            },
            {
              text: (
                res.data.result_1[3].fee +
                res.data.result_2[3].fee +
                res.data.result_1[3].fine +
                res.data.result_2[3].fine
              ).toLocaleString(),
              border: [false, false, true, false],
              alignment: "right",
            },
            { text: "บาท", border: [false, false, true, false] },
          ],
          [
            {
              text: "ยอดชำระ",
              alignment: "left",
              border: [true, false, true, true],
            },
            {
              text: (
                res.data.result_1[3].fee + res.data.result_1[3].fine
              ).toLocaleString(),
              alignment: "right",
              border: [true, false, true, true],
            },
            { text: "บาท", border: [true, false, true, true] },
          ],
          [
            {
              text: "หนี้คงค้าง",
              alignment: "left",
            },
            {
              text: (
                res.data.result_2[3].fee + res.data.result_2[3].fine
              ).toLocaleString(),
              alignment: "right",
            },
            { text: "บาท" },
          ]
        );

        body5.push(
          [
            {
              text: `สรุปข้อมูลรถวันที่ ${format(selectedDate, "dd MMMM yyyy", {
                locale: th,
              })}`,
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            {
              text: "ใบแจ้งหนี้ค่าทวงถาม",
              alignment: "left",
            },
            {
              text: (
                res.data.result_3[3].bill_1 + res.data.result_3[3].bill_2
              ).toLocaleString(),
              alignment: "right",
            },
            { text: "รายการ" },
          ],
          [
            {
              text: "รายได้พึงได้รวม",
              border: [true, false, true, false],
              alignment: "left",
            },
            {
              text: (
                res.data.result_1[3].fee +
                res.data.result_2[3].fee +
                res.data.result_1[3].fine +
                res.data.result_2[3].fine
              ).toLocaleString(),
              border: [false, false, true, false],
              alignment: "right",
            },
            { text: "บาท", border: [false, false, true, false] },
          ],
          [
            {
              text: "ยอดชำระ",
              alignment: "left",
              border: [true, false, true, true],
            },
            {
              text: (
                res.data.result_1[3].fee + res.data.result_1[3].fine
              ).toLocaleString(),
              alignment: "right",
              border: [true, false, true, true],
            },
            { text: "บาท", border: [true, false, true, true] },
          ],
          [
            {
              text: "หนี้คงค้าง",
              alignment: "left",
            },
            {
              text: (
                res.data.result_2[3].fee + res.data.result_2[3].fine
              ).toLocaleString(),
              alignment: "right",
            },
            { text: "บาท" },
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
          .download("รายงานหนี้คงค้าง.pdf", () => {
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
              text: "รายงานหนี้คงค้าง",
              alignment: "left",
              fontSize: 9,
              margin: [40, 0, 0, 0],
            },
            {
              text: "ตส.05",
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
        text: "รายงานหนี้คงค้าง",
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
            [
              {
                text: "ด่าน : ",
                alignment: "left",
              },
              {
                text: `${
                  checkpoint === 0
                    ? "ทุกด่าน"
                    : checkpoint === 1
                    ? "ทับช้าง 1"
                    : checkpoint === 2
                    ? "ทับช้าง 2"
                    : checkpoint === 3
                    ? "ธัญบุรี 1"
                    : checkpoint === 4
                    ? "ธัญบุรี 2"
                    : ""
                }`,
                alignment: "left",
              },
              {},
              {},
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
              widths: [45, 45, 45, 45],
              body: body1,
            },
          },

          {
            style: "table",
            margin: [11, 10, 0, 0],
            table: {
              widths: [45, 45, 45],
              body: body2,
            },
          },
          {
            style: "table",
            margin: [-104, 10, 0, 0],
            table: {
              widths: [45, 45, 45, 45],
              body: body3,
            },
          },
        ],
      },

      {
        columns: [
          {
            style: "table2",
            margin: [281, 10, 0, 0],
            table: {
              widths: [100, 40, 30],
              body: body4,
            },
          },
          {
            style: "table2",
            margin: [10, 10, 0, 0],
            table: {
              widths: [100, 40, 30],
              body: body5,
            },
          },
        ],
      },
      {
        text: "(____________________)",
        margin: [580, 15, 0, 0],
      },
      {
        text: "ผู้ตรวจสอบ",
        margin: [610, 5, 0, 0],
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
