import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
    },
    th: {
      fontWeight: 600,
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      fontSize: 13,
    },
    th2: {
      fontWeight: 400,
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 130,
      // padding: "0px",
      fontSize: 11,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 130,
      fontSize: 11,
      padding: "0px",
      textAlign: "left",
    },
    td2: {
      fontWeight: 400,
      borderLeft: "1px solid black",
      width: 130,
      fontSize: 11,
      paddingLeft: "10px",
      textAlign: "left",
    },
    td3: {
      fontWeight: 400,
      borderRight: "1px solid black",
      width: 150,
      fontSize: 11,
      padding: "0px",
      textAlign: "center",
    },
    td4: {
      fontWeight: 400,
      //   borderRight: "1px solid black",
      width: 150,
      fontSize: 12,
      padding: "0px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
    tr: {
      marginTop: "-20px",
    },
  };
});

export default function BlockDailyReport() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <table className={classes.table}>
          <tr>
            <th className={classes.th} colSpan="3">
              รายได้ด่านทับช้าง 1
            </th>
            <th className={classes.th} colSpan="3">
              ค่าปรับด่านทับช้าง 1
            </th>
            <th className={classes.th} colSpan="3">
              สรุปข้อมูลรถ
            </th>
          </tr>
          <tr>
            <td className={classes.td2}>รายได้ที่พึงได้</td>
            <td className={classes.td4}>1,000,000</td>
            <td className={classes.td3}>บาท</td>
            <td className={classes.td2}>ค่าปรับที่เกิดขึ้น</td>
            <td className={classes.td4}>300,000</td>
            <td className={classes.td3}>บาท</td>
            <td className={classes.td2}>จำนวนรถทั้งหมด</td>
            <td className={classes.td4}>40</td>
            <td className={classes.td3}>คัน</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td2}>รายได้ที่ได้รับ</td>
            <td className={classes.td4}>500,000</td>
            <td className={classes.td3}>บาท</td>
            <td className={classes.td2}>เรทค่าปรับ</td>
            <td className={classes.td4}>300</td>
            <td className={classes.td3}>บาท</td>
            <td className={classes.td2} style={{ width: 250 }}>
              จำนวนที่มีข้อยกเว้นพิเศษ
            </td>
            <td className={classes.td4}>30</td>
            <td className={classes.td3}>คัน</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td2}>รวมทั้งสิ้น</td>
            <td className={classes.td4}>500,000</td>
            <td className={classes.td3}>บาท</td>
            <td className={classes.td2} style={{ width: 170 }}>
              ค่าปรับที่ทำการพักชำระ
            </td>
            <td className={classes.td4}>200,000</td>
            <td className={classes.td3}>บาท</td>
            <td
              className={classes.td2}
              style={{ borderRight: "1px solid black" }}
              colSpan="3"
            >
              (จำนวนรถที่ผิดพลาด,รถยกเว้น,รถที่คงค้าง)
            </td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td2}>คงค้าง</td>
            <td className={classes.td4}>500,000</td>
            <td className={classes.td3}>บาท</td>
            <td className={classes.td2}>รวมทั้งสิ้น</td>
            <td className={classes.td4}>200,000</td>
            <td className={classes.td3}>บาท</td>
            <td
              className={classes.td2}
              colSpan="3"
              style={{ borderRight: "1px solid black" }}
            ></td>
          </tr>
          <tr className={classes.tr}>
            <td
              className={classes.td2}
              colSpan="3"
              style={{
                borderBottom: "1px solid black",
              }}
            ></td>
            <td
              className={classes.td2}
              style={{
                borderBottom: "1px solid black",
                paddingBottom: 6,
              }}
            >
              คงค้าง
            </td>
            <td
              className={classes.td4}
              style={{
                borderBottom: "1px solid black",
              }}
            >
              100,000
            </td>
            <td
              className={classes.td3}
              style={{
                borderBottom: "1px solid black",
              }}
            >
              บาท
            </td>
            <td
              className={classes.td2}
              colSpan="3"
              style={{
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
              }}
            ></td>
          </tr>
        </table>
      </div>
    </>
  );
}
