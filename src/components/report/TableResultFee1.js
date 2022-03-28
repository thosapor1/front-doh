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
      width: 107,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td2: {
      fontWeight: 400,
      borderRight: "1px solid black",
      width: 107,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td3: {
      fontWeight: 400,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      width: 107,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableResultFee1(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={7}>
                จำนวนรายการที่ต้องการชี้แจงจากฝ่ายจัดเก็บรายได้
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={3}>
                ประเภทรถจากการตรวจสอบ
              </td>
              <td className={classes.td} colSpan={4}>
                ข้อมูลประเภทรถจากจัดเก็บ
              </td>
              <td className={classes.td} colSpan={2}>
                ข้อมูลเพิ่มเติมจากตรวจสอบ
              </td>
            </tr>

            <tr>
              <td className={classes.td2}>C1</td>
              <td className={classes.td2}>C2</td>
              <td className={classes.td2}>C3</td>
              <td className={classes.td2}>รถยกเว้น</td>
              <td className={classes.td2}>รถสูญหาย</td>
              <td className={classes.td2}>รวม</td>
            </tr>
            <tr>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(รายการ)</td>
            </tr>

            <tr>
              <td className={classes.td}>C1</td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].C1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].C2.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].C3.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].reject.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].lost_vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].sum.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C2</td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].C1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].C2.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].C3.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].reject.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].lost_vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].sum.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C3</td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].C1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].C2.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].C3.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].reject.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].lost_vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].sum.toLocaleString()
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>รวมรายการ</td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].C1.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].C2.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].C3.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].reject.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].lost_vehicle.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].sum.toLocaleString()
                  : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
