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
      width: 83,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td2: {
      fontWeight: 400,
      borderRight: "1px solid black",
      width: 83,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td3: {
      fontWeight: 400,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      width: 83,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableDebt2(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={3}>
                รายการใบแจ้งหนี้ที่ค้างชำระ
              </td>
            </tr>
            <tr>
              <td className={classes.td} colSpan={3}>
                หนี้คงค้าง
              </td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{ borderLeft: "1px solid black" }}
              >
                ใบแจ้งหนี้
              </td>
              <td className={classes.td2}>ค่าผ่านทาง</td>
              <td className={classes.td2}>ค่าปรับ</td>
            </tr>
            <tr>
              <td
                className={classes.td3}
                style={{ borderLeft: "1px solid black" }}
              >
                (รายการ)
              </td>
              <td className={classes.td3}>(บาท)</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>

            <tr>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[0].bill : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[0].fee : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[0].fine : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[1].bill : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[1].fee : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[1].fine : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[2].bill : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[2].fee : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[2].fine : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[3].bill : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[3].fee : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2 ? dataList.result_2[3].fine : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
