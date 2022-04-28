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

export default function TableGuarantee1(props) {
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
              <td className={classes.td} colSpan={4}>
                หนี้คงค้าง
              </td>
            </tr>

            <tr>
              <td className={classes.td2}>รถผ่านทาง</td>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>ค่าผ่านทาง</td>
              <td className={classes.td2}>ค่าปรับ</td>
            </tr>
            <tr>
              <td className={classes.td3}>(คัน)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>

            <tr>
              <td className={classes.td}>C1</td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result
                  ? dataList.result[0].fee.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result
                  ? dataList.result[0].demand_fee.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C2</td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result
                  ? dataList.result[1].fee.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result
                  ? dataList.result[1].demand_fee.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C3</td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result
                  ? dataList.result[2].fee.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result
                  ? dataList.result[2].demand_fee.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>รวมทั้งหมด</td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].bill.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result
                  ? dataList.result[3].fee.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result
                  ? dataList.result[3].demand_fee.toLocaleString()
                  : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
