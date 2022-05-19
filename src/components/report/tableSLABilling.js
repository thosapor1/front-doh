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

export default function TableSLABilling(props) {
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
              colSpan={7}
              align="left"
              style={{
                backgroundColor: "darkgray",
                color: "white",
                borderRight: "none",
              }}
            >
              การประเมินระดับการให้บริการ (SLA)
              การแจ้งเรียกเก็บค่าธรรมเนียมผ่านทาง (Billing)
            </th>
            <th
              className={classes.th}
              colSpan={7}
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
              ค่าปรับสะสมประจำเดือน ก.พ.
            </th>
          </tr>
          <tr>
            <td
              className={classes.th}
              colSpan={14}
              style={{ backgroundColor: "lightgray" }}
            >
              SLA 8.4.1
              การแจ้งเรียกเก็บค่าธรรมเนียมผ่านทางจากผู้ใช้บริการในรูปแบบการชำระเอง
              (Manual Payment)
            </td>
            <td>{null}</td>
            <td
              className={classes.th}
              colSpan={2}
              align="center"
              style={{ backgroundColor: "lightgray" }}
            >
              SLA 8.4.1
            </td>
          </tr>

          <tr>
            <td className={classes.td} rowSpan={4}>
              SLA 8.4.1
            </td>
            <td className={classes.td} colSpan={4}>
              {`แจ้งการชำระแบบอิเลคทรอนิสก์`} <br />
              {`ทั้งหมดเฉลี่ยไม่เกิน 10 นาที`}
            </td>
            <td className={classes.td} colSpan={5}>
              {`แจ้งการชำระเป็นรายครั้งแต่ละรายการ`} <br />
              {`ภายในระยะเวลา 90 นาที่`}
            </td>
            <td className={classes.td} colSpan={4}>
              {`วิธีการชำระเงินเป็นรอบบิล`} <br />
              {`ภายในระยะเวลา 6 ชั่วโมงหลังจากวันตัดยอด`}
            </td>
            <td>{null}</td>
            <td
              className={classes.td}
              style={{ backgroundColor: "darkgray", color: "white" }}
            >
              ยอดวันที่ 1-16
            </td>
            <td
              className={classes.td}
              style={{ backgroundColor: "darkgray", color: "white" }}
            >
              ยอดสะสมรวม
            </td>
          </tr>
          <tr>
            <td className={classes.td}>
              {`On SLA`} <br />
              {`รายการ`}
            </td>
            <td className={classes.td}>
              {`Over SLA`} <br />
              {`รายการ`}
            </td>
            <td className={classes.td}>เวลาเฉลี่ย</td>
            <td className={classes.td}>ค่าปรับ</td>
            <td className={classes.td}>
              {`On SLA`} <br />
              {`รายการ`}
            </td>
            <td className={classes.td}>
              {`Over SLA`} <br />
              {`รายการ`}
            </td>
            <td className={classes.td}>
              {`รายการที่เกิน`} <br />
              {`เวลาเฉลี่ย`}
            </td>
            <td className={classes.td}>
              {`รายการเกินเวลา`} <br />
              {`ร้อยละ`}
            </td>
            <td className={classes.td}>ค่าปรับ</td>
            <td className={classes.td}>
              {`On SLA`} <br />
              {`รายการ`}
            </td>
            <td className={classes.td}>
              {`Over SLA`} <br />
              {`รายการ`}
            </td>
            <td className={classes.td}>
              {`รายการที่เกิน`} <br />
              {`เวลาเฉลี่ย`}
            </td>
            <td className={classes.td}>ค่าปรับ</td>
            <td>{null}</td>
            <td className={classes.td} rowSpan={2}>
              0
            </td>
            <td className={classes.td} rowSpan={2}>
              0
            </td>
          </tr>
          <tr>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
            <td className={classes.td}>0</td>
          </tr>
          <tr>
            <td className={classes.td} colSpan={4} align="center">
              <Chart
                chartType="PieChart"
                width="350px"
                height="200px"
                data={dataDonutChart}
                options={{
                  title: "การสร้างรายการผ่านทางภายใน 8 นาที",
                  pieHole: 0.2,
                  is3D: false,
                  legend: "left",
                  titleTextStyle: {
                    fontSize: 12,
                  },
                }}
              />
            </td>
            <td className={classes.td} colSpan={5} align="center">
              <Chart
                chartType="PieChart"
                width="350px"
                height="200px"
                data={dataDonutChart}
                options={{
                  title: "การสร้างรายการผ่านทางภายใน 8 นาที",
                  pieHole: 0.2,
                  is3D: false,
                  legend: "left",
                  titleTextStyle: {
                    fontSize: 12,
                  },
                }}
              />
            </td>
            <td className={classes.td} colSpan={4} align="center">
              <Chart
                chartType="PieChart"
                width="350px"
                height="200px"
                data={dataDonutChart}
                options={{
                  title: "การสร้างรายการผ่านทางภายใน 8 นาที",
                  pieHole: 0.2,
                  is3D: false,
                  legend: "left",
                  titleTextStyle: {
                    fontSize: 12,
                  },
                }}
              />
            </td>
          </tr>
          <tr>
            <th
              className={classes.th}
              colSpan={9}
              align="left"
              style={{ backgroundColor: "lightgray" }}
            >
              SLA 8.3.2 การส่งรายงานสรุปรายงานผ่านทางรายวันของระบบ M-Flow
              (M-Flow transaction Report) ภายใน 6 ชั่วโมง หลังเวลาตัดรอบผ่านทาง
            </th>
            <td>{null}</td>
            <td
              className={classes.th}
              colSpan={2}
              align="center"
              style={{ backgroundColor: "lightgray" }}
            >
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
            <td className={classes.td} style={{ backgroundColor: "pink" }}>
              {!!dataList.sla_832_1 ? dataList.sla_832_1.slaPercent : "0"}
            </td>
            <td className={classes.td}>
              {!!dataList.sla_832_1 ? dataList.sla_832_1.slaDueDateTime : "0"}
            </td>
            <td className={classes.td}>
              {!!dataList.sla_832_2 ? dataList.sla_832_2[0].sla : "0"}
            </td>
            <td className={classes.td} style={{ backgroundColor: "#ffcd38" }}>
              {!!dataList.sla_832_2 ? dataList.sla_832_2[0].dateTime : "0"}
            </td>
            <td className={classes.td}>
              {!!dataList.sla_832_2 ? dataList.sla_832_2[1].sla : "0"}
            </td>
            <td className={classes.td} style={{ backgroundColor: "#ffcd38" }}>
              {!!dataList.sla_832_2 ? dataList.sla_832_2[1].dateTime : "0"}
            </td>
            <td className={classes.td}>
              {!!dataList.sla_832_2 ? dataList.sla_832_2[2].sla : "0"}
            </td>
            <td className={classes.td} style={{ backgroundColor: "#ffcd38" }}>
              {!!dataList.sla_832_2 ? dataList.sla_832_2[1].dateTime : "0"}
            </td>
            <td>{null}</td>
          </tr>
        </table>
      </div>
    </>
  );
}
