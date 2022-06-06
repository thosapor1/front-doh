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
      borderTop: "1px solid black",
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

export default function TablePaymentDaily2(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td} rowSpan={2}>
                ลำดับ
              </td>
              <td
                className={classes.td}
                rowSpan={2}
                colSpan={2}
                style={{ width: 370 }}
              >
                ช่องทางรับชำระเงิน
              </td>
              <td className={classes.td2}>รายการรับชำระ</td>
              <td className={classes.td} colSpan={2}>
                ยอดเงินรับชำระ
              </td>
              <td className={classes.td2}>ส่วนต่าง</td>
            </tr>
            <tr>
              <td className={classes.td3}>M-Flow(รายการ)</td>
              <td className={classes.td3}>M-Flow</td>
              <td className={classes.td3}>กรมทางหลวง</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>
            <tr>
              <td className={classes.td}>1</td>
              <td
                className={classes.td}
                style={{ width: 300, textAlign: "left" }}
              >
                ผู้ให้บริการรับชำระเงิน (Counter Service)
              </td>
              <td
                className={classes.td}
                style={{ width: 120, textAlign: "left" }}
              >
                Counter Service
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[0].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[0].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}></td>
              <td className={classes.td} style={{ width: 115 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>2</td>
              <td
                className={classes.td}
                style={{ width: 270, textAlign: "left" }}
              >
                เอ็มพาส (M-PASS)
              </td>
              <td
                className={classes.td}
                style={{ width: 214, textAlign: "left" }}
              >
                M-PASS
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[3].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[3].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}></td>
              <td className={classes.td} style={{ width: 115 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>3</td>
              <td
                className={classes.td}
                style={{ width: 270, textAlign: "left" }}
              >
                อีซี่พาส (EASYPASS)
              </td>
              <td
                className={classes.td}
                style={{ width: 214, textAlign: "left" }}
              >
                EASYPASS
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[9].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[9].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}></td>
              <td className={classes.td} style={{ width: 115 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>4</td>
              <td
                className={classes.td}
                style={{ width: 270, textAlign: "left" }}
              >
                บัตรเครดิต/เดบิต (Credit/Debit Card)
              </td>
              <td
                className={classes.td}
                style={{ width: 214, textAlign: "left" }}
              >
                AQDD (FAST PAY)
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[6].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[6].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}></td>
              <td className={classes.td} style={{ width: 115 }}></td>
            </tr>

            <tr>
              <td
                className={classes.td4}
                style={{ borderLeft: "1px solid black" }}
              >
                5
              </td>
              <td
                className={classes.td}
                style={{ width: 270, textAlign: "left" }}
              >
                การจ่ายผ่านบิล (Bill Payment)
              </td>
              <td
                className={classes.td}
                style={{ width: 214, textAlign: "left" }}
              >
                SPODD (BILL PAYMENT)
              </td>
              <td className={classes.td2} style={{ width: 115 }}>
                0
              </td>
              <td className={classes.td2} style={{ width: 115 }}>
                0
              </td>
              <td className={classes.td} style={{ width: 115 }}></td>
              <td className={classes.td} style={{ width: 115 }}></td>
            </tr>
            <tr>
              <td
                className={classes.td4}
                style={{ borderLeft: "1px solid black" }}
              >
                6
              </td>
              <td
                className={classes.td4}
                style={{ width: 270, textAlign: "left" }}
              >
                บัญชีธนาคาร (Account)
              </td>
              <td
                className={classes.td4}
                style={{ width: 214, textAlign: "left" }}
              >
                BPDDT (DIRECT DEBIT)
              </td>
              <td className={classes.td2} style={{ width: 115 }}>
                0
              </td>
              <td className={classes.td2} style={{ width: 115 }}>
                0
              </td>
              <td className={classes.td} style={{ width: 115 }}></td>
              <td className={classes.td} style={{ width: 115 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>7</td>
              <td
                colSpan={2}
                className={classes.td}
                style={{ width: 270, textAlign: "left" }}
              >
                อื่นๆ
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                0
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                0
              </td>
              <td className={classes.td} style={{ width: 115 }}></td>
              <td className={classes.td} style={{ width: 115 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>{null}</td>
              <td
                colSpan={2}
                className={classes.td}
                style={{ width: 270, textAlign: "right" }}
              >
                รวมทั้งสิ้น
              </td>

              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[10].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}>
                {!!dataList.payment
                  ? dataList.payment[10].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 115 }}></td>
              <td className={classes.td} style={{ width: 115 }}></td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
