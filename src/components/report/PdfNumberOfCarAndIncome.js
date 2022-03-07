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

export default async function PdfNumberOfCarAndIncome(
  selectedDate,
  checkpoint,
  startTime,
  endTime
) {
  // let win = window.open("", "_blank");
  const date = format(selectedDate, "dd MMMM yyyy");
  const getDate = !!selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const ck = checkpoint;
  console.log(getDate, ck);
  const url = "http://1d32-45-117-208-162.ap.ngrok.io/audit/api/v1/display-ts";
  let sendData = { date: getDate, checkpoint: ck.toString() };

  Swal.fire({
    title: `กำลังสร้างรายงาน`,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      return axios.post(url, sendData).then(async (res) => {
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
          .download(
            "รายงานสรุปจำนวนรถวิ่งผ่านด่าน M-Flow และรายได้พึงได้.pdf",
            () => {
              resolve();
            }
          );
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
              text: "ตส.01",
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
        text: "รายงานสรุปจำนวนรถวิ่งผ่านด่าน M-Flow และรายได้พึงได้",
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
              body: [
                [
                  {
                    text: "จำนวนรถวิ่งผ่านด่าน M-Flow",
                    colSpan: 5,
                  },
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  { text: "ประเภทรถ", rowSpan: 3, margin: [0, 23, 0, 0] },
                  { text: "รถทั่วไป", colSpan: 2, margin: [0, 8, 0, 0] },
                  {},
                  { text: "รถที่ไม่สามารถตรวจสอบได้" },
                  { text: "รถยกเว้น", margin: [0, 8, 0, 0] },
                ],
                [
                  {},
                  { text: "Non-Member", border: [true, true, true, false] },
                  { text: "Member", border: [true, true, true, false] },
                  { text: "จำนวนที่พบ", border: [true, true, true, false] },
                  { text: "จำนวนที่พบ", border: [true, true, true, false] },
                ],
                [
                  {},
                  {
                    text: "(รายการ)",
                    border: [true, false, true, true],
                    margin: [0, -5, 0, 0],
                  },
                  {
                    text: "(รายการ)",
                    border: [true, false, true, true],
                    margin: [0, -5, 0, 0],
                  },
                  {
                    text: "(รายการ)",
                    border: [true, false, true, true],
                    margin: [0, -5, 0, 0],
                  },
                  {
                    text: "(รายการ)",
                    border: [true, false, true, true],
                    margin: [0, -5, 0, 0],
                  },
                ],
                [
                  { text: "C1" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                ],
                [
                  { text: "C2" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                ],
                [
                  { text: "C3" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                ],
                [
                  { text: "รวมรายการ" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                ],
              ],
            },
          },

          {
            style: "table",
            margin: [5, 10, 0, 0],
            table: {
              widths: [49, 49, 49, 49, 60],
              body: [
                [
                  {
                    text: "รายได้พึงได้",
                    colSpan: 5,
                  },
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  { text: "ประเภทรถ", rowSpan: 3, margin: [0, 23, 0, 0] },
                  { text: "ค่าผ่านทาง", rowSpan: 3, margin: [0, 23, 0, 0] },
                  { text: "รถทั่วไป", colSpan: 2, margin: [0, 8, 0, 0] },
                  {},
                  { text: "รถที่ไม่สามารถตรวจสอบได้" },
                ],
                [
                  {},
                  {},
                  { text: "Member", border: [true, true, true, false] },
                  { text: "Non-Member", border: [true, true, true, false] },
                  { text: "จำนวนที่พบ", border: [true, true, true, false] },
                ],
                [
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
                ],
                [
                  { text: "C1" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                ],
                [
                  { text: "C2" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                ],
                [
                  { text: "C3" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                ],
                [
                  { text: "รวมจำนวนเงิน", colSpan: 2 },
                  {},
                  { text: "0" },
                  { text: "0" },
                  { text: "0" },
                ],
              ],
            },
          },
        ],
      },
      {
        style: "table2",
        margin: [385, 10, 0, 0],
        table: {
          widths: [246, 20, 10],
          body: [
            [
              {
                text: `สรุปข้อมูลรถวันที่ ${format(
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
                text: "จำนวนรถทั้งหมด",
                border: [true, false, false, false],
                alignment: "left",
              },
              {
                text: "0",
                border: [false, false, false, false],
                alignment: "right",
              },
              { text: "คัน", border: [false, false, true, false] },
            ],
            [
              {
                text: "จำนวนรถที่มีข้อยกเว้นพิเศษ",
                border: [true, false, false, true],
                alignment: "left",
              },
              {
                text: "0",
                border: [false, false, false, true],
                alignment: "right",
              },
              { text: "คัน", border: [false, false, true, true] },
            ],
            [
              {
                text: "ยอดรถที่เก็บรายได้",
                alignment: "left",
                border: [true, true, false, true],
              },
              {
                text: "0",
                alignment: "right",
                border: [false, true, false, false],
              },
              { text: "คัน", border: [false, true, true, true] },
            ],
            [
              {
                text: "รายได้พึงได้",
                alignment: "left",
                border: [true, true, false, true],
              },
              {
                text: "0",
                alignment: "right",
                border: [false, true, false, true],
              },
              { text: "คัน", border: [false, true, true, true] },
            ],
          ],
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
