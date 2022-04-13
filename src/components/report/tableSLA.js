import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
    },
    th: {
      fontWeight: 700,
      border: "1px solid black",
      width: 150,
      fontSize: 14,
      padding: "5px",
    },
    th2: {
      fontWeight: 700,
      border: "1px solid black",
      width: 150,
      padding: "5px",
      fontSize: 14,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 150,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableSLA(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <th className={classes.th} colSpan={6} align="left">
                การประเมินระดับการให้บริการ (SLA) การสร้างรายการผ่านทาง
                (Transaction Generation)
              </th>
              <th className={classes.th} colSpan={3} align="right">
                วันที่ 23 ก.พ. 2565 เวลา 00:00 - 23:59
              </th>
              <th>{null}</th>
              <th className={classes.th} colSpan={2}>
                ค่าปรับสะสมประจำเดือน ก.พ.
              </th>
            </tr>
            <tr>
              <td className={classes.th} colSpan={9}>
                SLA 8.3.1 การสร้างรายการผ่านทางภายใน 8 นาที
              </td>
              <td>{null}</td>
              <td className={classes.th} colSpan={2}>
                SLA 8.3.1
              </td>
            </tr>

            <tr>
              <td className={classes.td} rowSpan={3}>
                SLA 8.3.1
              </td>
              <td className={classes.td} rowSpan={2}>
                On SLa
              </td>
              <td className={classes.td} rowSpan={2}>
                Over SLA
              </td>
              <td className={classes.td} colSpan={2} rowSpan={2}>
                ค่าเฉลี่ยเวลาที่อยู่ในเกณฑ์ SLA
              </td>
              <td className={classes.td} colSpan={2} rowSpan={2}>
                ค่าเฉลี่ยเวลาที่เกินจากเกณฑ์ SLA
              </td>
              <td className={classes.td} colSpan={2}>
                ค่าปรับ 250 บาทต่อนาที
              </td>
              <td>{null}</td>
              <td className={classes.td}>ยอดวันที่ 1-22</td>
              <td className={classes.td}>ยอดสะสมรวม</td>
            </tr>
            <tr>
              <td className={classes.td}>ระยะเวลาที่เกิน (นาที)</td>
              <td className={classes.td}>จำนวนค่าปรับ (บาท)</td>
              <td>{null}</td>
              <td className={classes.td} rowSpan={2}>
                data
              </td>
              <td className={classes.td} rowSpan={2}>
                data
              </td>
            </tr>
            <tr>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td} colSpan={2}>
                data
              </td>
              <td className={classes.td} colSpan={2}>
                data
              </td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
            </tr>
            <tr>
              <td className={classes.td} colSpan={3}>
                chart
              </td>
              <td className={classes.td} colSpan={6}>
                chart
              </td>
            </tr>
            <tr>
              <td className={classes.td} colSpan={9}>
                SLA 8.3.2 การส่งรายงานสรุปรายงานผ่านทางรายวันของระบบ M-Flow
                (M-Flow transaction Report) ภายใน 6 ชั่วโมง
                หลังเวลาตัดรอบผ่านทาง
              </td>
              <td>{null}</td>
              <td className={classes.th} colSpan={2}>
                SLA 8.3.2
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={3}>
                SLA 8.3.2
              </td>
              <td className={classes.td} rowSpan={2}>
                รายงาน #2
              </td>
              <td className={classes.td} rowSpan={2}>
                เวลาตามข้อกำหนด
              </td>
              <td className={classes.td} colSpan={2}>
                (#2) ALPR_MLPR_06
              </td>
              <td className={classes.td} colSpan={2}>
                (#2) ALPR_MLPR_07
              </td>
              <td className={classes.td} colSpan={2}>
                (#2) ALPR_MLPR_08
              </td>
              <td>{null}</td>
              <td className={classes.td}>ยอดวันที่ 1-22</td>
              <td className={classes.td}>ยอดสะสมรวม</td>
            </tr>
            <tr>
              <td className={classes.td}>เวลาที่แจ้งรายงาน</td>
              <td className={classes.td}>SLA</td>
              <td className={classes.td}>เวลาที่แจ้งรายงาน</td>
              <td className={classes.td}>SLA</td>
              <td className={classes.td}>เวลาที่แจ้งรายงาน</td>
              <td className={classes.td}>SLA</td>
              <td>{null}</td>
              <td className={classes.td} rowSpan={2}>
                data
              </td>
              <td className={classes.td} rowSpan={2}>
                data
              </td>
            </tr>
            <tr>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td>{null}</td>
            </tr>

            <tr>
              <td className={classes.td} colSpan={9}>
                SLA 8.3.3 การชี้แจงและแก้ไขรายการที่คลาดเคลื่อนภายใน 12 ชั่วโมง
              </td>
              <td>{null}</td>
              <td className={classes.th} colSpan={2}>
                SLA 8.3.3
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={3}>
                SLA 8.3.3
              </td>
              <td className={classes.td} rowSpan={2}>
                รายงาน Pk3
              </td>
              <td className={classes.td} rowSpan={2}>
                รายการที่คลาดเคลื่อน
              </td>
              <td className={classes.td} colSpan={2}>
                การชี้แจงตอบโต้ภายในเวลา 12 ชั่วโมง
              </td>
              <td className={classes.td} colSpan={2}>
                การชี้แจงตอบโต้เกินเวลา 12 ชั่วโมง
              </td>
              <td className={classes.td} rowSpan={2}>
                รายการตอบโต้เกินเวลา 24 ชั่วโมง
              </td>
              <td className={classes.td} rowSpan={2}>
                ค่าปรับ 2,000 บาท เมื่อเกินเวลา 24 ชั่วโมง
              </td>
              <td>{null}</td>
              <td className={classes.td}>ยอดวันที่ 1-22</td>
              <td className={classes.td}>ยอดสะสมรวม</td>
            </tr>
            <tr>
              <td className={classes.td}>จำนวนรายการ</td>
              <td className={classes.td}>เวลาเฉลี่ย (ชั่วโมง)</td>
              <td className={classes.td}>จำนวนรายการ</td>
              <td className={classes.td}>เวลาเฉลี่ย (ชั่วโมง)</td>
              <td>{null}</td>
              <td className={classes.td} rowSpan={2}>
                data
              </td>
              <td className={classes.td} rowSpan={2}>
                data
              </td>
            </tr>
            <tr>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td className={classes.td}>data</td>
              <td>{null}</td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
