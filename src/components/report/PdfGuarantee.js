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

export default async function PdfGuarantee(
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

  Swal.fire({
    title: `กำลังสร้างรายงาน`,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      return apiURL
        .post("/report-toll-insurance-6", sendData)
        .then(async (res) => {
          body1.push(
            [
              {
                text: "จำนวนรถผ่านเข้าระบบ M-Flow",
                colSpan: 5,
              },
              {},
              {},
              {},
              {},
            ],
            [
              { text: "ประเภทรถ", rowSpan: 3, margin: [0, 19, 0, 0] },
              { text: "หนี้คงค้าง", colSpan: 4 },
              {},
              {},
              {},
            ],
            [
              {},
              { text: "รถผ่านทาง", border: [true, true, true, false] },
              { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
              { text: "ค่าผ่านทาง", border: [true, true, true, false] },
              { text: "ค่าปรับ", border: [true, true, true, false] },
            ],
            [
              {},
              {
                text: "(คัน)",
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
              {
                text: "(บาท)",
                border: [true, false, true, true],
                margin: [0, -5, 0, 0],
              },
            ],
            [
              { text: "C1" },
              { text: res.data.tx[0].non_member.toLocaleString() },
              { text: res.data.tx[0].member.toLocaleString() },
              { text: res.data.tx[0].illegal.toLocaleString() },
              { text: res.data.tx[0].reject.toLocaleString() },
            ],
            [
              { text: "C2" },
              { text: res.data.tx[1].non_member.toLocaleString() },
              { text: res.data.tx[1].member.toLocaleString() },
              { text: res.data.tx[1].illegal.toLocaleString() },
              { text: res.data.tx[1].reject.toLocaleString() },
            ],
            [
              { text: "C3" },
              { text: res.data.tx[2].non_member.toLocaleString() },
              { text: res.data.tx[2].member.toLocaleString() },
              { text: res.data.tx[2].illegal.toLocaleString() },
              { text: res.data.tx[2].reject.toLocaleString() },
            ],
            [
              { text: "รวม" },
              { text: res.data.tx[3].non_member.toLocaleString() },
              { text: res.data.tx[3].member.toLocaleString() },
              { text: res.data.tx[3].illegal.toLocaleString() },
              { text: res.data.tx[3].reject.toLocaleString() },
            ]
          );

          body2.push(
            [
              {
                text: "การประกันจ่ายค่าธรรมเนียมผ่านทาง",
                colSpan: 5,
              },
              {},
              {},
              {},
              {},
            ],
            [
              { text: "ประเภทรถ", rowSpan: 3, margin: [0, 19, 0, 0] },
              { text: "ยอดการชำระของผ่านจัดเก็บรายได้", colSpan: 4 },
              {},
              {},
              {},
            ],
            [
              {},
              { text: "ค่าผ่านทาง", border: [true, true, true, false] },
              { text: "ใบแจ้งหนี้", border: [true, true, true, false] },
              { text: "ค่าผ่านทาง", border: [true, true, true, false] },
              { text: "ค่าปรับ", border: [true, true, true, false] },
            ],
            [
              {},
              {
                text: "(คัน)",
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
              {
                text: "(บาท)",
                border: [true, false, true, true],
                margin: [0, -5, 0, 0],
              },
            ],
            [
              { text: "C1" },
              { text: res.data.income[0].fee.toLocaleString() },
              { text: res.data.income[0].member.toLocaleString() },
              { text: res.data.income[0].non_member.toLocaleString() },
              {
                text: "ไม่รับประกันค่าปรับ",
                rowSpan: 4,
                margin: [0, 20, 0, 0],
              },
            ],
            [
              { text: "C2" },
              { text: res.data.income[1].fee.toLocaleString() },
              { text: res.data.income[1].member.toLocaleString() },
              { text: res.data.income[1].non_member.toLocaleString() },
              {},
            ],
            [
              { text: "C3" },
              { text: res.data.income[2].fee.toLocaleString() },
              { text: res.data.income[2].member.toLocaleString() },
              { text: res.data.income[2].non_member.toLocaleString() },
              {},
            ],
            [
              { text: "รวม" },
              { text: res.data.income[3].member.toLocaleString() },
              { text: res.data.income[3].member.toLocaleString() },
              { text: res.data.income[3].non_member.toLocaleString() },
              {},
            ]
          );

          body3.push(
            [
              {
                text: `สรุปข้อมูลรถประจำเดือน ${format(
                  selectedDate,
                  "MMMM yyyy",
                  {
                    locale: th,
                  }
                )}`,
                colSpan: 3,
              },
              {},
              {},
            ],
            [
              {
                text: "จำนวนรถคงค้าง",
                alignment: "left",
                border: [true, false, true, false],
              },
              {
                text: res.data.count.count.toLocaleString(),
                alignment: "right",
                border: [true, false, true, false],
              },
              { text: "คัน", border: [true, false, true, false] },
            ],
            [
              {
                text: "จำนวนใบแจ้งหนี้คงค้าง",
                border: [true, false, true, false],
                alignment: "left",
              },
              {
                text: res.data.count.count_reject.toLocaleString(),
                border: [false, false, true, false],
                alignment: "right",
              },
              { text: "รายการ", border: [false, false, true, false] },
            ],
            [
              {
                text: "หนี้คงค้างค่าผ่านทาง",
                alignment: "left",
                border: [true, false, true, true],
              },
              {
                text: res.data.count.count_pay_car.toLocaleString(),
                alignment: "right",
                border: [true, false, true, true],
              },
              { text: "บาท", border: [true, false, true, true] },
            ],
            [
              {
                text: "ยอดประกันค่าผ่านทาง",
                alignment: "left",
              },
              {
                text: res.data.count.count_income.toLocaleString(),
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
          .download("รายงานการประกันค่าธรรมเนียมผ่านทาง.pdf", () => {
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
              text: "รายงานการประกันค่าธรรมเนียมผ่านทาง",
              alignment: "left",
              fontSize: 9,
              margin: [40, 0, 0, 0],
            },
            {
              text: "ตส.06",
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
        text: "รายงานการประกันค่าธรรมเนียมผ่านทาง",
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
              widths: [49, 49, 49, 60, 49],
              body: body1,
            },
          },

          {
            style: "table",
            margin: [5, 10, 0, 0],
            table: {
              widths: [49, 49, 49, 49, 60],
              body: body2,
            },
          },
        ],
      },
      {
        style: "table2",
        margin: [490, 10, 0, 0],
        table: {
          widths: [100, 40, 30],
          body: body3,
        },
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
