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

export default async function PdfPressTheClaim(
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

  Swal.fire({
    title: `กำลังสร้างรายงาน`,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      return apiURL.post("/report-debt", sendData).then(async (res) => {
        body1.push(
          [
            {
              text: "จำนวนรถผ่านเข้าระบบ M-Flow",
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            { text: "ประเภทรถ", rowSpan: 3, margin: [0, 23, 0, 0] },
            {
              text: "ชำระเกินกำหนดหลังวันที่ 16",
              colSpan: 2,
            },
            {},
          ],
          [
            {},
            { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
            { text: "ค่าทวงถามพึงได้", border: [true, true, true, false] },
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
          ],
          [
            { text: "C1" },
            { text: res.data.result_sum[0].count_bill.toLocaleString() },
            {
              text: res.data.result_sum[0].demand_fee_amount.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "C2" },
            { text: res.data.result_sum[1].count_bill.toLocaleString() },
            {
              text: res.data.result_sum[1].demand_fee_amount.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "C3" },
            { text: res.data.result_sum[2].count_bill.toLocaleString() },
            {
              text: res.data.result_sum[2].demand_fee_amount.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "รวม" },
            { text: res.data.result_sum[3].count_bill.toLocaleString() },
            {
              text: res.data.result_sum[3].demand_fee_amount.toLocaleString(),
              alignment: "right",
            },
          ]
        );
        body2.push(
          [
            {
              text: "รายได้ค่าปรับการชำระช้าเกินกำหนด",
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
          ],
          [
            { text: "ประเภทรถ", rowSpan: 3, margin: [0, 23, 0, 0] },
            { text: "ชำระเกินกำหนดหลังวันที่ 16", colSpan: 2 },
            {},
            { text: "คงเหลือ", colSpan: 2 },
            {},
          ],
          [
            {},
            { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
            { text: "ค่าทวงถาม", border: [true, true, true, false] },
            { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
            { text: "ยอดเงิน", border: [true, true, true, false] },
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
            { text: "C1" },
            {
              text: res.data.result_classify[0].invoice_overdue.toLocaleString(),
            },
            {
              text: res.data.result_classify[0].amount.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_classify_balance[0].bill_balance.toLocaleString(),
            },
            {
              text: res.data.result_classify_balance[0].demand_balance.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "C2" },
            {
              text: res.data.result_classify[1].invoice_overdue.toLocaleString(),
            },
            {
              text: res.data.result_classify[1].amount.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_classify_balance[1].bill_balance.toLocaleString(),
            },
            {
              text: res.data.result_classify_balance[1].demand_balance.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "C3" },
            {
              text: res.data.result_classify[2].invoice_overdue.toLocaleString(),
            },
            {
              text: res.data.result_classify[2].amount.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_classify_balance[2].bill_balance.toLocaleString(),
            },
            {
              text: res.data.result_classify_balance[2].demand_balance.toLocaleString(),
              alignment: "right",
            },
          ],
          [
            { text: "รวม" },
            {
              text: res.data.result_classify[3].invoice_overdue.toLocaleString(),
            },
            {
              text: res.data.result_classify[3].amount.toLocaleString(),
              alignment: "right",
            },
            {
              text: res.data.result_classify_balance[3].bill_balance.toLocaleString(),
            },
            {
              text: res.data.result_classify_balance[3].demand_balance.toLocaleString(),
              alignment: "right",
            },
          ]
        );
        body3.push(
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
              text: "จำนวนใบแจ้งหนี้ที่มีค่าทวงถาม",
              alignment: "left",
              border: [true, false, false, false],
            },
            {
              text: res.data.result_classify_balance[2].demand_balance.toLocaleString(),
              alignment: "right",
              border: [false, false, false, false],
            },
            { text: "รายการ", border: [false, false, true, false] },
          ],
          [
            {
              text: "จำนวนใบแจ้งหนี้ที่ชำระค่าทวงถาม",
              alignment: "left",
              border: [true, false, false, true],
            },
            {
              text: res.data.result_classify[3].invoice_overdue.toLocaleString(),
              alignment: "right",
              margin: [10, 0, 0, 0],
              border: [false, false, false, true],
            },
            { text: "รายการ", border: [false, false, true, true] },
          ],
          [
            {
              text: "คงเหลือ",
              alignment: "left",
              border: [true, false, false, true],
            },
            {
              text: res.data.result_classify_balance[3].bill_balance.toLocaleString(),
              alignment: "right",
              border: [false, false, false, true],
            },
            { text: "บาท", border: [false, false, true, true] },
          ]
        );
        body4.push(
          [
            {
              text: `สรุปข้อมูลยอดชำระวันที่ ${format(
                selectedDate,
                "dd MMMM yyyy",
                { locale: th }
              )}`,
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            {
              text: "ยอดค่าทวงถามพึงได้",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: res.data.result_sum[3].demand_fee_amount.toLocaleString(),
              alignment: "right",
              border: [true, false, true, false],
            },
            { text: "บาท", border: [false, false, true, false] },
          ],
          [
            {
              text: "ยอดชำระค่าทวงถาม",
              alignment: "left",
              border: [true, false, true, true],
            },
            {
              text: res.data.result_classify[3].amount.toLocaleString(),
              alignment: "right",
              margin: [10, 0, 0, 0],
              border: [false, false, true, true],
            },
            { text: "บาท", border: [false, false, true, true] },
          ],
          [
            {
              text: "คงเหลือ",
              alignment: "left",
            },
            {
              text: res.data.result_classify_balance[3].demand_balance.toLocaleString(),
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
          .download("รายงานการชำระค่าผ่านทางสรุปรายเดือน.pdf", () => {
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
              text: "รายงานสรุปจำนวนรถวิ่งผ่านด่าน M-Flow และรายได้พึงได้",
              alignment: "left",
              fontSize: 9,
              margin: [40, 0, 0, 0],
            },
            {
              text: "ตส.04.2",
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
        text: "รายงานการชำระค่าปรับสรุปรายเดือน (ค่าทวงถาม)",
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
              widths: [65, 65, 65],
              body: body1,
            },
          },

          {
            style: "table",
            margin: [-70, 10, 0, 0],
            table: {
              widths: [66, 66, 66, 66, 66],
              body: body2,
            },
          },
        ],
      },
      {
        columns: [
          {
            style: "table2",
            margin: [263, 10, 0, 0],
            table: {
              widths: [110, 40, 30],
              body: body3,
            },
          },

          {
            style: "table2",
            margin: [10, 10, 0, 0],
            table: {
              widths: [110, 40, 30],
              body: body4,
            },
          },
        ],
      },
      {
        columns: [
          {
            text: "*มีการยกเว้นค่าปรับถึงวันที่ 31 มีนาคม 2565",
            margin: [70, 15, 0, 0],
          },
          {
            text: "(____________________)",
            margin: [200, 15, 0, 0],
          },
        ],
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
