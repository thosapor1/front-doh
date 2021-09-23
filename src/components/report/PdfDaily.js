import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import { report1 } from "../../data/mockDataReport.js";
import { image } from "../../image/logo_base64";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabun: {
    normal: "THSarabun.ttf",
    bold: "THSarabun Bold.ttf",
    italics: "THSarabun Italic.ttf",
    bolditalics: "THSarabun Bold Italic.ttf",
  },
};

const data = [];

export default function PdfDaily() {
  const date = "วันอังคารที่ 29 ธันวาคม 2563";
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
              text: "วันอังคารที่ 29 ธันวาคม 2563 15.30น.",
              alignment: "right",
              fontSize: 9,
              margin: [0, 0, 40, 0],
            },
          ],
        },
      ];
    },
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
        columns: [
          {
            width: "auto",
            style: "table",
            table: {
              body: [
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
                [
                  { text: "C1" },
                  { text: "15" },
                  { text: "5" },
                  { text: "4" },
                  { text: "3" },
                ],
                [
                  { text: "C2" },
                  { text: "20" },
                  { text: "9" },
                  { text: "0" },
                  { text: "1" },
                ],
                [
                  { text: "C3" },
                  { text: "15" },
                  { text: "5" },
                  { text: "4" },
                  { text: "3" },
                ],
                ["รวมทั้งหมด", "15", "5", "4", "3"],
              ],
            },
          },
          {
            width: "*",
            style: "table",
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
                  {
                    text: "ค่าปรับด่านทับช้าง 1",
                    border: [true, true, true, false],
                    colSpan: 3,
                    bold: true,
                  },
                  {},
                  {},
                  {
                    text: "สรุปข้อมูล",
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
                  {
                    text: "1,000,000",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "ค่าปรับที่เกิดขึ้น",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "300,000",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "จำนวนรถทั้งหมด",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "40",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "คัน",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                ],
                [
                  {
                    text: "รายได้ที่ได้รับ",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "500,000",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "เรทค่าปรับ",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "300,000",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "จำนวนที่มีข้อยกเว้นพิเศษ",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "30",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "คัน",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                ],
                [
                  {
                    text: "รวมทั้งสิ้น",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "500,000",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "ค่าปรับที่ทำการชำระ",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "200,000",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "(จำนวนรถที่ผิดพลาด,รถเว้น,รถที่คงค้าง)",
                    border: [true, false, true, true],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                    colSpan: 3,
                    rowSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: "คงค้าง",
                    border: [true, false, false, true],
                    alignment: "left",
                    margin: [0, -2, 0, 5],
                    rowSpan: 2,
                  },
                  {
                    text: "500,000",
                    border: [false, false, false, true],
                    margin: [0, -2, 0, 5],
                    rowSpan: 2,
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, true],
                    margin: [0, -2, 0, 5],
                    rowSpan: 2,
                  },
                  {
                    text: "รวมทั้งสิ้น",
                    border: [true, false, false, false],
                    alignment: "left",
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "200,000",
                    border: [false, false, false, false],
                    margin: [0, -2, 0, 0],
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, false],
                    margin: [0, -2, 0, 0],
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {},
                  {},
                  {},
                  {
                    text: "คงค้าง",
                    border: [true, false, false, true],
                    alignment: "left",
                    margin: [0, -2, 0, 3],
                  },
                  {
                    text: "100,000",
                    border: [false, false, false, true],
                    margin: [0, -2, 0, 3],
                  },
                  {
                    text: "บาท",
                    border: [false, false, true, true],
                    margin: [0, -2, 0, 3],
                  },
                  {},
                  {},
                  {},
                ],
              ],
            },
          },
        ],
        columnGap: 5,
      },
      {
        style: "table2",
        table: {
          headerRows: 2,
          body: [
            [
              { text: "ด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
              { text: "transaction", rowSpan: 2, margin: [0, 5, 0, 0] },
              { text: "เข้าด่าน", colSpan: 2 },
              {},
              { text: "ประเภทรถ", rowSpan: 2, margin: [0, 5, 0, 0] },
              { text: "ค่าผ่านทาง", border: [true, true, true, false] },
              { text: "ค่าปรับ", border: [true, true, true, false] },
              { text: "จัดเก็บ", colSpan: 2 },
              {},
              { text: "ชำระแล้ว", border: [true, true, true, false] },
              { text: "ทะเบียน", rowSpan: 2, margin: [0, 5, 0, 0] },
              { text: "จังหวัด", rowSpan: 2, margin: [0, 5, 0, 0] },
            ],
            [
              {},
              {},
              { text: "วันที่" },
              { text: "เวลา" },
              {},
              {
                text: "(บาท)",
                border: [true, false, true, true],
              },
              {
                text: "(บาท)",
                border: [true, false, true, true],
              },
              { text: "วันที่" },
              { text: "เวลา" },
              {
                text: "(บาท)",
                border: [true, false, true, true],
              },
              {},
              {},
            ],
            [
              { text: "ทับช้าง1" },
              { text: "M202109010000000001" },
              { text: "27/12/2020" },
              { text: "13.24น." },
              { text: "C1" },
              { text: "30" },
              { text: "60" },
              { text: "29/12/2020" },
              { text: "14.14น." },
              { text: "90" },
              { text: "กข3210" },
              { text: "กรุงเทพมหานคร" },
            ],
            [
              { text: "ธัญบุรี1" },
              { text: "M202109010000000001" },
              { text: "27/12/2020" },
              { text: "13.24น." },
              { text: "C1" },
              { text: "30" },
              { text: "60" },
              { text: "29/12/2020" },
              { text: "14.14น." },
              { text: "90" },
              { text: "กข3210" },
              { text: "กรุงเทพมหานคร" },
            ],
          ],
        },
      },
    ],
    styles: {
      table: { marginTop: 20, alignment: "center", fontSize: 9 },
      table2: { marginTop: 20, alignment: "center", fontSize: 11 },
    },
    defaultStyle: { font: "THSarabun" },
  };
  pdfMake.createPdf(docDefinition).download("รายงานประจำวัน.pdf");
}
