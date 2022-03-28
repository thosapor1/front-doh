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

export default function TableResultFee2(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={3}>
                รายการการตอบโต้จากฝ่ายจัดเก็บ
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={2}>
                ประเภทรถจากการตรวจสอบ
              </td>
              <td className={classes.td2}>จำนวนที่ตอบโต้</td>
              <td className={classes.td2}>จำนวนที่ยังไม่ได้ตอบโต้</td>
            </tr>
            <tr>
              <td className={classes.td3} style={{ paddingBottom: 16 }}>
                (รายการ)
              </td>
              <td className={classes.td3} style={{ paddingBottom: 16 }}>
                (รายการ)
              </td>
            </tr>

            <tr>
              <td className={classes.td}>C1</td>
              <td className={classes.td}>
                {!!dataList.result_2
                  ? dataList.result_2[0].interactive.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2
                  ? dataList.result_2[0].no_interaction.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C2</td>
              <td className={classes.td}>
                {!!dataList.result_2
                  ? dataList.result_2[1].interactive.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2
                  ? dataList.result_2[1].no_interaction.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C3</td>
              <td className={classes.td}>
                {!!dataList.result_2
                  ? dataList.result_2[2].interactive.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2
                  ? dataList.result_2[2].no_interaction.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>รวมรายการ</td>
              <td className={classes.td}>
                {!!dataList.result_2
                  ? dataList.result_2[3].interactive.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result_2
                  ? dataList.result_2[3].no_interaction.toLocaleString()
                  : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
