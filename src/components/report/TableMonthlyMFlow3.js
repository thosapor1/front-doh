import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { th } from "date-fns/locale";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 10,
    },
    th: {
      fontWeight: 700,
      border: "1px solid black",
      width: 200,
      fontSize: 14,
      padding: "5px",
    },
    th2: {
      fontWeight: 700,
      border: "1px solid black",
      width: 200,
      padding: "5px",
      fontSize: 14,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 100,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td2: {
      fontWeight: 400,
      borderRight: "1px solid black",
      width: 100,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td3: {
      fontWeight: 400,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      width: 100,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableMonthlyMFlow3(props) {
  const { dataList, selectedDate } = props;
  const [data, setData] = useState([
    { class: "C1", car: 0, invoice: 0, expectIncome: 0 },
    { class: "C2", car: 0, invoice: 0, expectIncome: 0 },
    { class: "C3", car: 0, invoice: 0, expectIncome: 0 },
    { class: "Total", car: 0, invoice: 0, expectIncome: 0 },
  ]);

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={3}>
                {`สรุปข้อมูลรถวันที่ ${format(selectedDate, "dd MMMM yyyy", {
                  locale: th,
                })}`}
              </td>
            </tr>

            <tr>
              <td
                className={classes.td}
                style={{ width: 200, textAlign: "left", borderRight: "0px" }}
              >
                ใบแจ้งหนี้รถวิ่งผ่านทาง
              </td>
              <td
                className={classes.td}
                style={{
                  borderLeft: "0px",
                  borderRight: "0px",
                  textAlign: "right",
                }}
              >
                {!!dataList.result_sum
                  ? dataList.result_sum[3].count_bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ borderLeft: "0px" }}>
                รายการ
              </td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{
                  borderLeft: "1px solid black",
                  borderRight: "0px",
                  textAlign: "left",
                }}
              >
                จำนวนรถที่ชำระค่าผ่านทาง
              </td>
              <td
                className={classes.td2}
                style={{ borderRight: "0px", textAlign: "right" }}
              >
                {!!dataList.result_classify
                  ? (
                      dataList.result_classify[3].count_bill_due +
                      dataList.result_classify[3].count_bill_overdue
                    ).toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td2}>รายการ</td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{ borderLeft: "1px solid black", borderRight: "0px" }}
              >
                - จำนวนรถที่ชำระตามกำหนด
              </td>
              <td
                className={classes.td2}
                style={{ borderRight: "0px", textAlign: "right" }}
              >
                {!!dataList.result_sum
                  ? dataList.result_classify[3].count_bill_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td2}>รายการ</td>
            </tr>
            <tr>
              <td
                className={classes.td3}
                style={{ borderLeft: "1px solid black", borderRight: "0px" }}
              >
                - จำนวนรถที่ชำระเกินกำหนด
              </td>
              <td
                className={classes.td3}
                style={{ borderRight: "0px", textAlign: "right" }}
              >
                {!!dataList.result_sum
                  ? dataList.result_classify[3].count_bill_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td3}>รายการ</td>
            </tr>
            <tr>
              <td
                className={classes.td3}
                style={{
                  borderLeft: "1px solid black",
                  borderRight: "0px",
                  textAlign: "left",
                }}
              >
                คงเหลือ
              </td>
              <td
                className={classes.td3}
                style={{ borderRight: "0px", textAlign: "right" }}
              >
                {!!dataList.result_sum
                  ? dataList.result_classify[3].count_bill_remain.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td3}>รายการ</td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
