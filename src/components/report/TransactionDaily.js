import axios from "axios";
import { format } from "date-fns";
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

export default function TransactionDaily(selectedDate, checkpoint) {
  let win = window.open("", "_blank");
  const date = format(new Date(), "dd MMMM yyyy");

  const getDate = format(selectedDate, "yyyy-MM-dd");
  const ck = checkpoint;
  console.log(getDate, ck);
  const url =
    "http://1d32-45-117-208-162.ap.ngrok.io/audit/api/v1/expect-pdf-ts";
  let sendData = { date: getDate, checkpoint: ck.toString() };

  let income = 0;
  let incomeHQ = 0;

  let body1 = [
    [
      {
        text: "ประเภทรถ",
        rowSpan: 2,
        border: [true, true, true, true],
        margin: [0, 5, 0, 0],
      },
      { text: "จำนวนรถทั้งหมด", border: [true, true, true, false] },
      {
        text: "จำนวนรถที่ผิดพลาด",
        border: [true, true, true, false],
      },
      { text: "รถยกเว้น", border: [true, true, true, false] },
      { text: "รถที่คงค้าง", border: [true, true, true, false] },
    ],
    [
      {},
      {
        text: "(คัน)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(คัน)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(คัน)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(คัน)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
    ],
  ];

  let body2 = [
    [
      {
        text: "ประเภทรถ",
        rowSpan: 2,
        margin: [0, 5, 0, 0],
      },
      {
        text: "จำนวนรถทั้งหมด",
        border: [true, true, true, false],
        margin: [0, 5, 0, 0],
      },
    ],
    [{}, { text: "(คัน)", border: [true, false, true, true] }],
  ];

  const pdfGenDownload = (docDefinition) => {
    return new Promise((resolve, reject) => {
      try {
        console.log("generate");
        pdfMake
          .createPdf(docDefinition)
          .download("รายงานสรุปTrasactionประจำวัน.pdf", () => {
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
        for (let index = 0; index < res.data.length; index++) {
          body1.push([
            !!res.data.result_hq && res.data.result_hq[index].class === "total"
              ? `รวมทั้งหมด`
              : `C${res.data.result_hq[index].class}`,
            !!res.data.result_hq ? res.data.result_hq[index].count : "",
            !!res.data.result_hq ? res.data.result_hq[index].normal : "",
            !!res.data.result_hq ? res.data.result_hq[index].reject : "",
            !!res.data.result_hq ? res.data.result_hq[index].illegal : "",
          ]);

          body2.push([
            !!res.data.reuslt_lane &&
            res.data.reuslt_lane[index].class === "total"
              ? `รวมทั้งหมด`
              : `C${res.data.reuslt_lane[index].class}`,
            !!res.data.reuslt_lane ? res.data.reuslt_lane[index].count : "",
          ]);
        }
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
              x2: 555,
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
                    x2: 455,
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
        text: "รายงานประจำวัน",
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
        margin: [55, 20, 0, 0],
        fontSize: 11,
        style: "table",
        table: {
          widths: [70, 70, 70, 70, 70],
          body: body1,
        },
      },
      {
        columns: [
          {
            fontSize: 11,
            style: "table",
            // margin: [35, 20, 0, 450],
            table: {
              body: body2,
            },
          },
          {
            fontSize: 11,
            style: "table",
            // margin: [35, 20, 0, 450],
            table: {
              body: [
                [
                  {
                    text: "รายได้ด่านทับช้าง 1",
                    border: [true, true, true, false],
                    colSpan: 3,
                    bold: true,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: "รายได้ที่พึงได้",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  { text: income },
                  { text: "บาท" },
                ],
                [
                  {
                    text: "รายได้ที่พึงได้ (HQ)",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  { text: incomeHQ },
                  { text: "บาท" },
                ],
              ],
            },
          },
        ],
      },

      //page2
    ],
    styles: {
      table: { marginTop: 20, alignment: "center", fontSize: 11 },
      table2: { marginTop: 20, alignment: "center", fontSize: 11 },
    },
    defaultStyle: { font: "THSarabun" },
  };

  Swal.fire({
    title: `กำลังสร้างรายงาน`,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  axios
    .post(url, sendData)
    .then(async (res) => {
      income = !!res ? res.data.result_revenue[0].revenue : "";
      incomeHQ = !!res ? res.data.result_revenue[0].revenue_mFlow : "";
      console.log(income, incomeHQ);

      await pushToBody(res);
      console.log(docDefinition);

      await pdfGenDownload(docDefinition);

      // pdfMake.createPdf(docDefinition).open({}, win);
    })
    .then(() => {
      Swal.close();
    });
}
