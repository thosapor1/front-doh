import { makeStyles } from "@material-ui/core";
import { th } from "date-fns/locale";
import format from "date-fns/format";
import React from "react";
import Chart from "react-google-charts";

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

export default function TableSLAPayment(props) {
  const {
    dataList,
    dataColumnChart,
    dataDonutChart,
    selectedDate,
    startTime,
    endTime,
  } = props;

  const classes = useStyles();
  return (
    <>
      <div className={classes.root} id="tableSLA">
        <table className={classes.table}>
          <tr>
            <th
              className={classes.th}
              colSpan={6}
              align="left"
              style={{
                backgroundColor: "darkgray",
                color: "white",
                borderRight: "none",
              }}
            >
              การประเมินระดับการให้บริการ (SLA)
              การตรวจสอบและยืนยันการชำระค่าธรรมเนียมผ่านทาง
            </th>
            <th
              className={classes.th}
              colSpan={3}
              align="right"
              style={{
                backgroundColor: "darkgray",
                color: "white",
                borderLeft: "none",
              }}
            >
              {`วันที่ ${format(selectedDate, "dd MMM yyyy", {
                locale: th,
              })} เวลา ${format(startTime, "HH:mm")} - ${format(
                endTime,
                "HH:mm"
              )}`}
            </th>
            <th>{null}</th>
            <th
              className={classes.th}
              colSpan={2}
              style={{ backgroundColor: "darkgray", color: "white" }}
            >
              ค่าปรับสะสมประจำเดือน
              {` ${format(selectedDate, "MMM", {
                locale: th,
              })} `}
            </th>
          </tr>
          <tr>
            <td
              className={classes.th}
              colSpan={9}
              style={{ backgroundColor: "lightgray" }}
            >
              SLA 8.5.1 การตรวจสอบและยืนยันการชำระค่าธรรมเนียมผ่านทาง (Payment
              Verification and Reconciliation)
            </td>
            <td>{null}</td>
            <td
              className={classes.th}
              colSpan={2}
              align="center"
              style={{ backgroundColor: "lightgray" }}
            >
              SLA 8.5.1
            </td>
          </tr>

          <tr>
            <td className={classes.td} rowSpan={3}>
              SLA 8.5.1
            </td>
            <td className={classes.td} rowSpan={2}>
              รายงาน #XX
            </td>
            <td className={classes.td} rowSpan={2}>
              รายงานที่ไม่ตรงตามข้อกำหนด
            </td>
            <td className={classes.td} colSpan={2}>
              {`รายงานสรุปรายการยอดชำระรายวัน`} <br />
              {`ภายใน 8 ชั่วโมงหลังจากสิ้นสุดรอบวัน`}
            </td>
            <td className={classes.td} colSpan={2}>
              {`รายงานสรุปรายการยอดชำระรายเดือน`}
              <br />
              {`ภายใน 8 ชั่วโมงหลังจากสิ้นสุดรอบวัน`}
            </td>
            <td className={classes.td} colSpan={2}>
              {`ชี้แจงกรณีที่มึความคลาดเคลื่อนของยอดเงิน`}
              <br />
              {`ภายใน 7 วันที่การ`}
            </td>
            <td>{null}</td>
            <td
              className={classes.td}
              style={{ backgroundColor: "darkgray", color: "white" }}
            >
              ยอดวันที่ 1-22
            </td>
            <td
              className={classes.td}
              style={{ backgroundColor: "darkgray", color: "white" }}
            >
              ยอดสะสมรวม
            </td>
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
              0
            </td>
            <td className={classes.td} rowSpan={2}>
              0
            </td>
          </tr>
          <tr>
            <td className={classes.td}>100%</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0:21:20</td>
            <td className={classes.td}>ผ่าน</td>
            <td className={classes.td}>0:21:20</td>
            <td className={classes.td}>ผ่าน</td>
            <td className={classes.td}>0:21:20</td>
            <td className={classes.td}>ผ่าน</td>
          </tr>
        </table>
      </div>
    </>
  );
}
