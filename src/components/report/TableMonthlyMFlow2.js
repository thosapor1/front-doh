import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
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
      width: 90,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td2: {
      fontWeight: 400,
      borderRight: "1px solid black",
      width: 90,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td3: {
      fontWeight: 400,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      width: 90,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableMonthlyMFlow2(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={7}>
                รายได้การชำระค่าธรรมเนียมผ่านทาง
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={3}>
                ประเภทรถ
              </td>
              <td className={classes.td} colSpan={2}>
                ขำระตามกำหนด
              </td>
              <td className={classes.td} colSpan={2}>
                ขำระเกินกำหนด
              </td>
              <td className={classes.td} colSpan={2}>
                คงเหลือ
              </td>
            </tr>

            <tr>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>ยอดเงิน</td>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>ยอดเงิน</td>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>ยอดเงิน</td>
            </tr>
            <tr>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>

            <tr>
              <td className={classes.td}>C1</td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[0].count_bill_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[0].income_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[0].count_bill_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[0].income_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[0].count_bill_remain.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[0].income_remain.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C2</td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[1].count_bill_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[1].income_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[1].count_bill_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[1].income_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[1].count_bill_remain.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[1].income_remain.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C3</td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[2].count_bill_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[2].income_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[2].count_bill_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[2].income_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[2].count_bill_remain.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[2].income_remain.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>รวม</td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[3].count_bill_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[3].income_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[3].count_bill_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[3].income_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[3].count_bill_remain.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_classify
                  ? dataList.result_classify[3].income_remain.toLocaleString()
                  : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}