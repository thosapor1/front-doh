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
  const [data, setData] = useState([
    { class: "C1", fee: 0, invoice: 0, feeAmount: 0, fine: 0 },
    { class: "C2", fee: 0, invoice: 0, feeAmount: 0, fine: 0 },
    { class: "C3", fee: 0, invoice: 0, feeAmount: 0, fine: 0 },
    { class: "Total", fee: 0, invoice: 0, feeAmount: 0, fine: 0 },
  ]);

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
            {!!data
              ? data.map((row) => (
                  <tr>
                    <td className={classes.td}>
                      {row.class === "Total" ? "รวมทั้งหมด" : row.class}
                    </td>
                    <td className={classes.td}>{row.fee}</td>
                    <td className={classes.td}>{row.invoice}</td>
                    <td className={classes.td}>{row.feeAmount}</td>
                    <td className={classes.td}>{row.fine}</td>
                  </tr>
                ))
              : []}
          </table>
        </div>
      </Box>
    </>
  );
}
