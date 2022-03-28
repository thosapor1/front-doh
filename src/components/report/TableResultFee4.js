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

export default function TableResultFee4(props) {
  const { dataList, selectedDate } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={3}>
                {`สรุปข้อมูลการตอบโต้วันที่ ${format(
                  selectedDate,
                  "dd MMMM yyyy",
                  {
                    locale: th,
                  }
                )}`}
              </td>
            </tr>

            <tr>
              <td
                className={classes.td2}
                style={{
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  textAlign: "left",
                  width: 200,
                }}
              >
                จำนวนรายการที่ส่งชี้แจง
              </td>
              <td
                className={classes.td2}
                style={{ borderRight: "1px solid black", textAlign: "right" }}
              >
                {!!dataList.result_2
                  ? (
                      dataList.result_2[3].interactive +
                      dataList.result_2[3].no_interaction
                    ).toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td2} style={{ textAlign: "left" }}>
                รายการ
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
                จำนวนรายการที่ตอบโต้
              </td>
              <td className={classes.td2} style={{ textAlign: "right" }}>
                {!!dataList.result_2
                  ? dataList.result_2[3].interactive.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td2} style={{ textAlign: "left" }}>
                รายการ
              </td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  textAlign: "left",
                }}
              >
                จำนวนรายการที่ยังไม่ได้ตอบโต้
              </td>
              <td
                className={classes.td2}
                style={{
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  textAlign: "right",
                }}
              >
                {!!dataList.result_2
                  ? dataList.result_2[3].no_interaction.toLocaleString()
                  : "0"}
              </td>
              <td
                className={classes.td2}
                style={{
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  textAlign: "left",
                }}
              >
                รายการ
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}