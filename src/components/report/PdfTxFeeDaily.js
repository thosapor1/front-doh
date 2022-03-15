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

export default function PdfTxFeeDaily(
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
      { text: "วันที่ใบแจ้งหนี้", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "เลขที่ใบแจ้งหนี้", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ทะเบียนรถ", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ทะเบียนจังหวัด", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ด่าน", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ประเภทรถ", rowSpan: 2, margin: [0, 8, 0, 0] },
      { text: "ค่าผ่านทาง ", border: [true, true, true, false] },
      { text: "วิธีการชำระเงิน", colSpan: 3 },
      {},
      {},
    ],
    [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {
        text: "(บาท)",
        border: [true, false, false, true],
      },
      { text: "รูปแบบ" },
      {
        text: "ประเภท",
      },
      { text: "ช่องทาง" },
    ],
  ];

  const pdfGenDownload = (docDefinition) => {
    return new Promise((resolve, reject) => {
      try {
        pdfMake
          .createPdf(docDefinition)
          .download("รายงานTransactionการชำระค่าผ่านทางประจำวัน.pdf", () => {
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
        for (let index = 0; index < res.data.length; index++) {
          // console.log(index);
          body.push([
            index + 1,
            !!res.data[index].billing_issueDate
              ? res.data[index].billing_issueDate
              : "-",
            !!res.data[index].billing_invoiceNo
              ? res.data[index].billing_invoiceNo
              : "-",
            !!res.data[index].license_plate
              ? res.data[index].license_plate
              : "-",
            !!res.data[index].province_description
              ? res.data[index].province_description
              : "-",
            !!res.data[index].origin_plaza_name
              ? res.data[index].origin_plaza_name
              : "-",
            !!res.data[index].match_real_vehicleClass
              ? res.data[index].match_real_vehicleClass
              : "-",
            !!res.data[index].match_real_fee
              ? res.data[index].match_real_fee
              : "-",
            !!res.data[index].type_1 ? res.data[index].type_1 : "-",
            !!res.data[index].type_2 ? res.data[index].type_2 : "-",
            !!res.data[index].payment_paymentChannel_code
              ? res.data[index].payment_paymentChannel_code
              : "-",
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
              text: "รายงานสรุปการชำระค่าผ่านทางประจำวัน",
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

      {
        text: "รายงานสรุปการชำระค่าผ่านทางประจำวัน",
        margin: [20, 0, 0, 0],
        fontSize: 14,
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
        style: "table2",
        table: {
          widths: [25, 50, 80, 45, 55, 40, 40, 40, 40, 40, 60],
          headerRows: 2,
          body: body,
        },
      },
    ],
    styles: {
      table: { marginTop: 20, alignment: "center", fontSize: 11 },
      table2: {
        marginLeft: 70,
        marginTop: 10,
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
        .post("/report-list-payment", sendData, {
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
