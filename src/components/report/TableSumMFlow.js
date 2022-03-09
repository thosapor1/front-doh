import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { th } from "date-fns/locale";
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
      width: 200,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td2: {
      fontWeight: 400,
      borderLeft: "1px solid black",
      width: 250,
      fontSize: 14,
      padding: "5px",
      textAlign: "Left",
    },
    td3: {
      fontWeight: 400,
      width: 174,
      fontSize: 14,
      padding: "5px",
      textAlign: "right",
    },
    td4: {
      fontWeight: 400,
      borderRight: "1px solid black",
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

export default function TableSumMFlow1(props) {
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
              <td className={classes.td2}>จำนวนรถทั้งหมด</td>
              <td className={classes.td3}>
                {!!dataList.count ? dataList.count.count.toLocaleString() : "0"}
              </td>
              <td className={classes.td4}>คัน</td>
            </tr>
            <tr>
              <td className={classes.td2}>จำนวนรถที่มีข้อยกเว้นพิเศษ</td>
              <td className={classes.td3}>
                {!!dataList.count
                  ? dataList.count.count_reject.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td4}>คัน</td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                }}
              >
                ยอดรถที่เก็บรายได้
              </td>
              <td
                className={classes.td3}
                style={{
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                }}
              >
                {!!dataList.count
                  ? dataList.count.count_pay_car.toLocaleString()
                  : "0"}
              </td>
              <td
                className={classes.td4}
                style={{
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                }}
              >
                คัน
              </td>
            </tr>
            <tr>
              <td
                className={classes.td2}
                style={{ borderBottom: "1px solid black" }}
              >
                รายได้พึงได้
              </td>
              <td
                className={classes.td3}
                style={{ borderBottom: "1px solid black" }}
              >
                {!!dataList.count
                  ? dataList.count.count_income.toLocaleString()
                  : "0"}
              </td>
              <td
                className={classes.td4}
                style={{ borderBottom: "1px solid black" }}
              >
                บาท
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
