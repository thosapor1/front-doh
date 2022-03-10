import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: "0px 0px 0px 20px",
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
      width: 90,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td2: {
      fontWeight: 400,
      borderRight: "1px solid black",
      width: 90,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    td3: {
      fontWeight: 400,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      width: 90,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableMonthlyPayment2(props) {
  const { dataList } = props;
  const [data, setData] = useState([
    {
      class: "C1",
      invoiceOver3d: 0,
      amountOver3d: 0,
      invoiceOver13d: 0,
      amountOver13d: 0,
      fine: 0,
      invoiceBalance: 0,
      amountBalance: 0,
    },
    {
      class: "C2",
      invoiceOver3d: 0,
      amountOver3d: 0,
      invoiceOver13d: 0,
      amountOver13d: 0,
      fine: 0,
      invoiceBalance: 0,
      amountBalance: 0,
    },
    {
      class: "C3",
      invoiceOver3d: 0,
      amountOver3d: 0,
      invoiceOver13d: 0,
      amountOver13d: 0,
      fine: 0,
      invoiceBalance: 0,
      amountBalance: 0,
    },
    {
      class: "Total",
      invoiceOver3d: 0,
      amountOver3d: 0,
      invoiceOver13d: 0,
      amountOver13d: 0,
      fine: 0,
      invoiceBalance: 0,
      amountBalance: 0,
    },
  ]);

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} colSpan={7}>
                รายได้ค่าปรับการชำระช้าเกินกำหนด
              </td>
            </tr>
            <tr>
              <td className={classes.td} rowSpan={3}>
                ประเภทรถ
              </td>
              <td className={classes.td} colSpan={2}>
                ชำระเกินกำหนดวันที่ 3
              </td>
              <td className={classes.td} colSpan={2}>
                ชำระเกินกำหนดวันที่ 13
              </td>
              <td className={classes.td} colSpan={2}>
                คงเหลือ
              </td>
            </tr>

            <tr>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>ยอดเงิน</td>
              <td className={classes.td2}>ใบแจ้งหนี้</td>

              <td className={classes.td2}>ค่าทวงถาม</td>
              <td className={classes.td2}>ใบแจ้งหนี้</td>
              <td className={classes.td2}>ยอดเงิน</td>
            </tr>
            <tr>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
              <td className={classes.td3}>(รายการ)</td>

              <td className={classes.td3}>(บาท)</td>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>
            {!!data
              ? data.map((row) => (
                  <tr>
                    <td className={classes.td}>
                      {row.class === "Total" ? "รวมทั้งหมด" : row.class}
                    </td>
                    <td className={classes.td}>{row.invoiceOver3d}</td>
                    <td className={classes.td}>{row.amountOver3d}</td>
                    <td className={classes.td}>{row.invoiceOver13d}</td>
                    <td className={classes.td}>{row.amountOver13d}</td>
                    <td className={classes.td}>{row.invoiceBalance}</td>
                    <td className={classes.td}>{row.amountBalance}</td>
                  </tr>
                ))
              : []}
          </table>
        </div>
      </Box>
    </>
  );
}
