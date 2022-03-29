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
      width: 85,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td2: {
      fontWeight: 400,
      borderRight: "1px solid black",
      width: 85,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td3: {
      fontWeight: 400,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      width: 85,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableDebt1(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={4}>
                รายการใบแจ้งหนี้ที่ชำระ
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={3}>
                ประเภทรถ
              </td>
              <td className={classes.td} colSpan={3}>
                รายได้พึงได้ที่ชำระ
              </td>
            </tr>

            <tr>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>ค่าผ่านทาง</td>
              <td className={classes.td2}>ค่าปรับ</td>
            </tr>
            <tr>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>

            <tr>
              <td className={classes.td}>C1</td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[0].bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[0].fee.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[0].fine.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C2</td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[1].bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[1].fee.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[1].fine.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C3</td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[2].bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[2].fee.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[2].fine.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>รวม</td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[3].bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[3].fee.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_1
                  ? dataList.result_1[3].fine.toLocaleString()
                  : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
