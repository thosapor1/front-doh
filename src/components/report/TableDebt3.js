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

export default function TableDebt3(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={4}>
                รายการใบแจ้งหนี้ค่าทวงถาม
              </td>
            </tr>
            <tr>
              <td className={classes.td} colSpan={2}>
                ค่าทวงถามที่ชำระ
              </td>
              <td className={classes.td} colSpan={2}>
                ค่าทวงถามคงค้าง
              </td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{ borderLeft: "1px solid black" }}
              >
                ใบแจ้งหนี้
              </td>
              <td className={classes.td2}>ค่าทวงถาม</td>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>ค่าทวงถาม</td>
            </tr>
            <tr>
              <td
                className={classes.td3}
                style={{ borderLeft: "1px solid black" }}
              >
                (รายการ)
              </td>
              <td className={classes.td3}>(บาท)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>

            <tr>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[0].bill_1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[0].demand_fee_1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[0].bill_2.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[0].demand_fee_2.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[1].bill_1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[1].demand_fee_1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[1].bill_2.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[1].demand_fee_2.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[2].bill_1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[2].demand_fee_1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[2].bill_2.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[2].demand_fee_2.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[3].bill_1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[3].demand_fee_1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[3].bill_2.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_3
                  ? dataList.result_3[3].demand_fee_2.toLocaleString()
                  : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
