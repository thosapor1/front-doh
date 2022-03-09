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

export default function TableMonthlyMFlow4(props) {
  const { dataList, selectedDate } = props;

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
                รายได้พึงได้
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
                  ? dataList.result_sum[3].income.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ borderLeft: "0px" }}>
                บาท
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
                ยอดชำระจากผู้ใช้ทาง
              </td>
              <td
                className={classes.td2}
                style={{ borderRight: "0px", textAlign: "right" }}
              >
                {!!dataList.result_classify
                  ? (
                      dataList.result_classify[3].income_due +
                      dataList.result_classify[3].income_overdue
                    ).toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td2}>บาท</td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{ borderLeft: "1px solid black", borderRight: "0px" }}
              >
                - ยอดชำระตามกำหนด
              </td>
              <td
                className={classes.td2}
                style={{ borderRight: "0px", textAlign: "right" }}
              >
                {!!dataList.result_sum
                  ? dataList.result_classify[3].income_due.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td2}>บาท</td>
            </tr>
            <tr>
              <td
                className={classes.td3}
                style={{ borderLeft: "1px solid black", borderRight: "0px" }}
              >
                - ยอดชำระเกินกำหนด
              </td>
              <td
                className={classes.td3}
                style={{ borderRight: "0px", textAlign: "right" }}
              >
                {!!dataList.result_sum
                  ? dataList.result_classify[3].income_overdue.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td3}>บาท</td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
