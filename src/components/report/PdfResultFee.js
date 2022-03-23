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

export default async function PdfResultFee(
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
      return apiURL.post("/report-interactive", sendData).then(async (res) => {
        body1.push(
          [
            {
              text: "จำนวนรายการที่ต้องการการชี้แจงจากฝ่ายจัดเก็บรายได้",
              colSpan: 7,
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            { text: "ประเภทรถ", rowSpan: 3, margin: [0, 19, 0, 0] },
            { text: "ข้อมูลประเภทรถจากจัดเก็บ", colSpan: 4 },
            {},
            {},
            {},
            { text: "ข้อมูลเพิ่มเติมจากตรวจสอบ", colSpan: 2 },
            {},
          ],
          [
            {},
            { text: "C1", border: [true, true, true, false] },
            { text: "C2", border: [true, true, true, false] },
            { text: "C3", border: [true, true, true, false] },
            { text: "รถยกเว้น", border: [true, true, true, false] },
            { text: "รถสูญหาย", border: [true, true, true, false] },
            { text: "รวม", border: [true, true, true, false] },
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
            { text: res.data.result[0].C1.toLocaleString() },
            { text: res.data.result[0].C2.toLocaleString() },
            { text: res.data.result[0].C3.toLocaleString() },
            { text: res.data.result[0].reject.toLocaleString() },
            { text: res.data.result[0].lost_vehicle.toLocaleString() },
            { text: res.data.result[0].sum.toLocaleString() },
          ],
          [
            { text: "C2" },
            { text: res.data.result[1].C1.toLocaleString() },
            { text: res.data.result[1].C2.toLocaleString() },
            { text: res.data.result[1].C3.toLocaleString() },
            { text: res.data.result[1].reject.toLocaleString() },
            { text: res.data.result[1].lost_vehicle.toLocaleString() },
            { text: res.data.result[1].sum.toLocaleString() },
          ],
          [
            { text: "C3" },
            { text: res.data.result[2].C1.toLocaleString() },
            { text: res.data.result[2].C2.toLocaleString() },
            { text: res.data.result[2].C3.toLocaleString() },
            { text: res.data.result[2].reject.toLocaleString() },
            { text: res.data.result[2].lost_vehicle.toLocaleString() },
            { text: res.data.result[2].sum.toLocaleString() },
          ],
          [
            { text: "รวมรายการ" },
            { text: res.data.result[3].C1.toLocaleString() },
            { text: res.data.result[3].C2.toLocaleString() },
            { text: res.data.result[3].C3.toLocaleString() },
            { text: res.data.result[3].reject.toLocaleString() },
            { text: res.data.result[3].lost_vehicle.toLocaleString() },
            { text: res.data.result[3].sum.toLocaleString() },
          ]
        );

        body2.push(
          [
            {
              text: "รายการการตอบโต้จากฝ่ายจัดเก็บ",
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            {
              text: "ประเภทรถจากการตรวจสอบ",
              rowSpan: 2,
              margin: [0, 10, 0, 0],
            },
            {
              text: "จำนวนที่ตอบโต้",
              border: [true, true, true, false],
              margin: [0, 10, 0, 0],
            },
            {
              text: "จำนวนที่ยังไม่ได้ตอบโต้",
              border: [true, true, true, false],
              margin: [0, 10, 0, 0],
            },
          ],
          [
            {},
            {
              text: "(รายการ)",
              border: [true, false, true, true],
              margin: [0, -5, 0, 9],
            },
            {
              text: "(รายการ)",
              border: [true, false, true, true],
              margin: [0, -5, 0, 9],
            },
          ],
          [
            { text: "C1" },
            { text: res.data.result_2[0].interactive.toLocaleString() },
            { text: res.data.result_2[0].no_interaction.toLocaleString() },
          ],
          [
            { text: "C2" },
            { text: res.data.result_2[1].interactive.toLocaleString() },
            { text: res.data.result_2[1].no_interaction.toLocaleString() },
          ],
          [
            { text: "C3" },
            { text: res.data.result_2[2].interactive.toLocaleString() },
            { text: res.data.result_2[2].no_interaction.toLocaleString() },
          ],
          [
            { text: "รวมรายการ" },
            { text: res.data.result_2[3].interactive.toLocaleString() },
            { text: res.data.result_2[3].no_interaction.toLocaleString() },
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
              text: "จำนวนรถที่ตรวจสอบทั้งหมด",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: res.data.result[3].sum.toLocaleString(),
              alignment: "right",
              border: [true, false, true, false],
            },
            { text: "รายการ", border: [true, false, true, false] },
          ],
          [
            {
              text: "จำนวนรถที่ผิดประเภท",
              border: [true, false, true, false],
              alignment: "left",
            },
            {
              text: (
                res.data.result[3].C2 + res.data.result[3].C3
              ).toLocaleString(),
              border: [false, false, true, false],
              alignment: "right",
            },
            { text: "รายการ", border: [false, false, true, false] },
          ],
          [
            {
              text: "จำนวนรถที่มีข้อยกเว้นพิเศษ",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: res.data.result[3].reject.toLocaleString(),
              alignment: "right",
              border: [false, false, true, false],
            },
            { text: "รายการ", border: [false, false, true, false] },
          ],
          [
            {
              text: "จำนวนรถสูญหายที่ตรวจสอบพบ",
              alignment: "left",
              border: [true, false, true, true],
            },
            {
              text: res.data.result[3].lost_vehicle.toLocaleString(),
              alignment: "right",
              border: [true, false, true, true],
            },
            { text: "รายการ", border: [true, false, true, true] },
          ]
        );

        body4.push(
          [
            {
              text: `สรุปข้อมูลการตอบโต้วันที่ ${format(
                selectedDate,
                "dd MMMM yyyy",
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
              text: "จำนวนรายการที่ส่งชี้แจง",
              alignment: "left",
              border: [true, false, true, false],
            },
            {
              text: (
                res.data.result_2[3].interactive +
                res.data.result_2[3].no_interaction
              ).toLocaleString(),
              alignment: "right",
              border: [true, false, true, false],
            },
            { text: "รายการ", border: [true, false, true, false] },
          ],
          [
            {
              text: "จำนวนรายการที่ตอบโต้",
              border: [true, false, true, false],
              alignment: "left",
            },
            {
              text: res.data.result_2[3].interactive.toLocaleString(),
              border: [false, false, true, false],
              alignment: "right",
            },
            { text: "รายการ", border: [false, false, true, false] },
          ],
          [
            {
              text: "จำนวนรายการที่ยังไม่ได้ตอบโต้",
              alignment: "left",
              border: [true, false, true, true],
            },
            {
              text: res.data.result_2[3].no_interaction.toLocaleString(),
              alignment: "right",
              border: [true, false, true, true],
            },
            { text: "รายการ", border: [true, false, true, true] },
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
              text: "ตส.08",
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
        text: "รายงานสรุปการตรวจสอบการจัดเก็บค่าธรรมเนียมผ่านทาง",
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
              widths: [49, 49, 49, 49, 49, 49, 49],
              body: body1,
            },
          },

          {
            style: "table",
            margin: [5, 10, 0, 0],
            table: {
              widths: [56, 46, 75],
              body: body2,
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
              body: body3,
            },
          },
          {
            style: "table2",
            margin: [10, 10, 0, 0],
            table: {
              widths: [100, 40, 30],
              body: body4,
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
