import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      paddingRight: 20,
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

export default function TableMFlow1(props) {
  const { dataList } = props;
  const [data, setData] = useState([
    { class: "C1", member: 0, non_member: 0, undefined: 0, except: 0 },
    { class: "C2", member: 0, non_member: 0, undefined: 0, except: 0 },
    { class: "C3", member: 0, non_member: 0, undefined: 0, except: 0 },
    { class: "Total", member: 0, non_member: 0, undefined: 0, except: 0 },
  ]);

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={5}>
                จำนวนรถวิ่งเข้าด่าน M-Flow
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={3}>
                ประเภทรถ
              </td>
              <td className={classes.td} colSpan={2}>
                รถทั่วไป
              </td>
              <td className={classes.td}>รถที่ไม่สามารถตรวจสอบได้</td>
              <td className={classes.td}>รถยกเว้น</td>
            </tr>
            <tr>
              <td className={classes.td2}>Member</td>
              <td className={classes.td2}>Non-Member</td>
              <td className={classes.td2}>จำนวนที่พบ</td>
              <td className={classes.td2}>จำนวนที่พบ</td>
            </tr>
            <tr>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(รายการ)</td>
            </tr>

            <tr>
              <td className={classes.td}>C1</td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[0].member.toLocaleString() : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx
                  ? dataList.tx[0].non_member.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[0].illegal.toLocaleString() : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[0].reject.toLocaleString() : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C2</td>

              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[1].member.toLocaleString() : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx
                  ? dataList.tx[1].non_member.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[1].illegal.toLocaleString() : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[1].reject.toLocaleString() : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>C3</td>

              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[2].member.toLocaleString() : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx
                  ? dataList.tx[2].non_member.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[2].illegal.toLocaleString() : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[2].reject.toLocaleString() : "0"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>รวมรายการ</td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[3].member.toLocaleString() : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx
                  ? dataList.tx[3].non_member.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[3].illegal.toLocaleString() : "0"}
              </td>
              <td className={classes.td}>
                {!!dataList.tx ? dataList.tx[3].reject.toLocaleString() : "0"}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
