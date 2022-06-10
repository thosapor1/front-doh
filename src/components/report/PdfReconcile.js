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

export default async function PdfReconcile(
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
      return apiURL.post("/report-tx", sendData).then(async (res) => {
        body1.push(
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
            { text: res.data.tx[0].non_member.toLocaleString() },
            {
              text: res.data.tx[0].member.toLocaleString(),
            },
            {
              text: res.data.tx[0].illegal.toLocaleString(),
            },
            {
              text: res.data.tx[0].reject.toLocaleString(),
            },
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
            { text: "รวมรายการ" },
            { text: res.data.tx[3].non_member.toLocaleString() },
            { text: res.data.tx[3].member.toLocaleString() },
            { text: res.data.tx[3].illegal.toLocaleString() },
            { text: res.data.tx[3].reject.toLocaleString() },
          ]
        );

        body2.push(
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
            { text: res.data.income[0].fee.toLocaleString() },
            {
              text: res.data.income[0].member.toLocaleString(),
              style: "cellRight",
            },
            {
              text: res.data.income[0].non_member.toLocaleString(),
              style: "cellRight",
            },
            {
              text: res.data.income[0].illegal.toLocaleString(),
              style: "cellRight",
            },
          ],
          [
            { text: "C2" },
            { text: res.data.income[1].fee.toLocaleString() },
            {
              text: res.data.income[1].member.toLocaleString(),
              style: "cellRight",
            },
            {
              text: res.data.income[1].non_member.toLocaleString(),
              style: "cellRight",
            },
            {
              text: res.data.income[1].illegal.toLocaleString(),
              style: "cellRight",
            },
          ],
          [
            { text: "C3" },
            { text: res.data.income[2].fee.toLocaleString() },
            {
              text: res.data.income[2].member.toLocaleString(),
              style: "cellRight",
            },
            {
              text: res.data.income[2].non_member.toLocaleString(),
              style: "cellRight",
            },
            {
              text: res.data.income[2].illegal.toLocaleString(),
              style: "cellRight",
            },
          ],
          [
            { text: "รวมจำนวนเงิน", colSpan: 2 },
            {},
            {
              text: res.data.income[3].member.toLocaleString(),
              style: "cellRight",
            },
            {
              text: res.data.income[3].non_member.toLocaleString(),
              style: "cellRight",
            },
            {
              text: res.data.income[3].illegal.toLocaleString(),
              style: "cellRight",
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
              text: "จำนวนรถทั้งหมด",
              border: [true, false, false, false],
              alignment: "left",
            },
            {
              text: res.data.count.count.toLocaleString(),
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
              text: res.data.count.count_reject.toLocaleString(),
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
              text: res.data.count.count_pay_car.toLocaleString(),
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
              text: res.data.count.count_income.toLocaleString(),
              alignment: "right",
              border: [false, true, false, true],
            },
            { text: "คัน", border: [false, true, true, true] },
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
          .download("รายงานสรุปกระทบยอดการชำระค่าผ่านทางประจำเดือน.pdf", () => {
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
              text: "รายงานสรุปกระทบยอดการชำระค่าผ่านทางประจำเดือน",
              alignment: "left",
              fontSize: 9,
              margin: [40, 0, 0, 0],
            },
            {
              text: "ตส.07",
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
        text: "รายงานสรุปกระทบยอดการชำระค่าผ่านทางประจำเดือน",
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
                text: "สายทาง :",
                alignment: "left",
              },
              {
                text: "ทางหลวงหมายเลข 9",
                alignment: "left",
              },
            ],
          ],
        },
      },

      {
        style: "table",
        margin: [70, 10, 0, 0],
        table: {
          widths: [100, 190, 100, 190],
          body: [
            [
              {
                text: "รายรับชำระ (รายการ)",
                alignment: "center",
              },
              {
                text: "ยอดเงินชำระ (บาท)",
                alignment: "center",
                colSpan: 2,
              },
              {
                text: "ส่วนต่างยอดเงิน (บาท) :",
                alignment: "center",
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
        margin: [385, 10, 0, 0],
        table: {
          widths: [226, 40, 10],
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
      cellRight: { alignment: "right" },
    },
    defaultStyle: { font: "THSarabun" },
  };
  // await pushToBody(res);
  // console.log(body1, body2);

  // pdfMake.createPdf(docDefinition).open({}, win);
}
