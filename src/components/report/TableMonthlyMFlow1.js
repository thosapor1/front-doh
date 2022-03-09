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

export default function TableMonthlyMFlow1(props) {
  const { dataList } = props;
  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={5}>
                จำนวนรถผ่านเข้าระบบ M-Flow
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={3}>
                ประเภทรถ
              </td>
              <td className={classes.td} colSpan={3}>
                รถที่คิดค่าธรรมเนียมผ่านทาง
              </td>
            </tr>

            <tr>
              <td className={classes.td2}>จำนวน</td>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>รายได้พึงได้</td>
            </tr>
            <tr>
              <td className={classes.td3}>(คัน)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>

            <tr>
              <td className={classes.td}>C1</td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[0].count_vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[0].count_bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[0].income.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C2</td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[1].count_vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[1].count_bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[1].income.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C3</td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[2].count_vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[2].count_bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[2].income.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>รวม</td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[3].count_vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[3].count_bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_sum
                  ? dataList.result_sum[3].income.toLocaleString()
                  : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}