import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
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

export default function TableGuarantee3(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={3}>
                สรุปข้อมูลรถวันที่ 15 กุมภาพันธ์ 2565
              </td>
            </tr>

            <tr>
              <td
                className={classes.td2}
                style={{
                  width: 200,
                  textAlign: "left",
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                }}
              >
                จำนวนรถคงค้าง
              </td>
              <td
                className={classes.td2}
                style={{
                  textAlign: "right",
                  borderLeft: "1px solid black",
                }}
              >
                {!!dataList.result_2 ? dataList.result[3].vehicle : "0"}
              </td>
              <td
                className={classes.td2}
                style={{ textAlign: "left", borderLeft: "1px solid black" }}
              >
                คัน
              </td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  textAlign: "left",
                }}
              >
                จำนวนใบแจ้งหนี้คงค้าง
              </td>
              <td
                className={classes.td2}
                style={{ borderRight: "1px solid black", textAlign: "right" }}
              >
                {!!dataList.result_2 ? dataList.result[3].bill : "0"}
              </td>
              <td className={classes.td2} style={{ textAlign: "left" }}>
                บาท
              </td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  textAlign: "left",
                }}
              >
                หนี้คงค้างค่าผ่านทาง
              </td>
              <td className={classes.td2} style={{ textAlign: "right" }}>
                {!!dataList.result_2 ? dataList.result[3].demand_fee : "0"}
              </td>
              <td className={classes.td2} style={{ textAlign: "left" }}>
                บาท
              </td>
            </tr>
            <tr>
              <td className={classes.td} style={{ textAlign: "left" }}>
                ยอดประกันค่าผ่านทาง
              </td>
              <td className={classes.td} style={{ textAlign: "right" }}>
                {!!dataList.result_2 ? dataList.result[3].demand_fee : "0"}
              </td>
              <td className={classes.td} style={{ textAlign: "left" }}>
                บาท
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
