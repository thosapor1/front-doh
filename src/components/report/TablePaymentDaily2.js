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
              <td className={classes.td} rowSpan={2} style={{ width: 150 }}>
                ลำดับ
              </td>
              <td
                className={classes.td}
                rowSpan={2}
                colSpan={2}
                style={{ width: 250 }}
              >
                ช่องทางรับชำระเงิน
              </td>
              <td className={classes.td2}>รายการรับชำระ</td>
              <td className={classes.td2}>ยอดเงินรับชำระ</td>
              <td className={classes.td} rowSpan={2}>
                หมายเหตุ
              </td>
            </tr>
            <tr>
              <td className={classes.td3}>(รายการ)</td>
              <td className={classes.td3}>(บาท)</td>
            </tr>
            <tr>
              <td className={classes.td}>1</td>
              <td
                className={classes.td}
                style={{ width: 270, textAlign: "left" }}
              >
                บัญชีธนาคาร (Account)
              </td>
              <td
                className={classes.td}
                style={{ width: 214, textAlign: "left" }}
              >
                BPDDT
              </td>
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[0].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[0].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>2</td>
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
                AQDD
              </td>
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[1].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[1].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>3</td>
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
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[6].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[6].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>4</td>
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
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[3].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[3].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}></td>
            </tr>

            <tr>
              <td
                className={classes.td4}
                style={{ borderLeft: "1px solid black" }}
              >
                5
              </td>
              <td
                className={classes.td4}
                style={{ width: 270, textAlign: "left" }}
              >
                การจ่ายผ่านบิล
              </td>
              <td
                className={classes.td4}
                style={{ width: 214, textAlign: "left" }}
              >
                SPODD
              </td>
              <td className={classes.td2} style={{ width: 150 }}>
                {null}
              </td>
              <td className={classes.td2} style={{ width: 150 }}>
                {null}
              </td>
              <td className={classes.td2} style={{ width: 150 }}>
                {null}
              </td>
            </tr>

            <tr>
              <td
                className={classes.td4}
                rowSpan={6}
                style={{ borderLeft: "1px solid black" }}
              >
                {null}
              </td>
              <td
                className={classes.td4}
                style={{ textAlign: "left", paddingLeft: 25 }}
              >{`1) โมบายแบงค์กิ้ง (Mobile Banking)`}</td>
              <td className={classes.td4} rowSpan={6}>
                {null}
              </td>
              <td className={classes.td4}>
                {!!dataList.payment
                  ? dataList.payment[5].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td4}>
                {!!dataList.payment
                  ? dataList.payment[5].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td4}></td>
            </tr>
            <tr>
              <td
                className={classes.td4}
                style={{ textAlign: "left", paddingLeft: 25 }}
              >{`2)	ธนาคาร (Counter Bank)`}</td>
              <td className={classes.td4}>0</td>
              <td className={classes.td4}>0</td>
              <td className={classes.td4}></td>
            </tr>
            <tr>
              <td
                className={classes.td4}
                style={{ textAlign: "left", paddingLeft: 25 }}
              >{`3)	อินเทอร์เน็ต (Internet/ CRD)`}</td>
              <td className={classes.td4}>
                {!!dataList.payment
                  ? dataList.payment[4].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td4}>
                {!!dataList.payment
                  ? dataList.payment[4].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td4}></td>
            </tr>
            <tr>
              <td
                className={classes.td4}
                style={{ textAlign: "left", paddingLeft: 25 }}
              >{`4)	ตู้บริการเงินสด (ATM)`}</td>
              <td className={classes.td4}>0</td>
              <td className={classes.td4}>0</td>
              <td className={classes.td4}></td>
            </tr>
            <tr>
              <td
                className={classes.td4}
                style={{ textAlign: "left", paddingLeft: 25 }}
              >{`5)	ผู้ให้บริการรับชำระเงิน (Counter Service)`}</td>
              <td className={classes.td4}>
                {!!dataList.payment
                  ? dataList.payment[2].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td4}>
                {!!dataList.payment
                  ? dataList.payment[2].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td4}></td>
            </tr>
            <tr>
              <td
                className={classes.td4}
                style={{ textAlign: "left", paddingLeft: 25 }}
              >{`6)	ใบแจ้งการชำระเงิน (Bill Payment)`}</td>
              <td className={classes.td4}>0</td>
              <td className={classes.td4}>0</td>
              <td className={classes.td4}></td>
            </tr>

            <tr>
              <td className={classes.td}>6</td>
              <td
                className={classes.td}
                style={{ width: 270, textAlign: "left" }}
              >
                อื่นๆ
              </td>
              <td className={classes.td}>{null}</td>
              <td className={classes.td} style={{ width: 150 }}>
                0
              </td>
              <td className={classes.td} style={{ width: 150 }}>
                0
              </td>
              <td className={classes.td} style={{ width: 150 }}></td>
            </tr>

            <tr>
              <td className={classes.td}>{null}</td>
              <td
                className={classes.td}
                style={{ width: 270, textAlign: "left" }}
              >
                รวมทั้งสิ้น
              </td>
              <td className={classes.td}>{null}</td>
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[7].payment_list.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}>
                {!!dataList.payment
                  ? dataList.payment[7].amount_received.toLocaleString()
                  : "0"}
              </td>
              <td className={classes.td} style={{ width: 150 }}></td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
