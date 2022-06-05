import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { th } from "date-fns/locale";
import React from "react";
import mockData1 from "../../data/mockdata1.json";
import mockData2 from "../../data/mockdata2.json";
import mockData3 from "../../data/mockdata3.json";
import mockData7 from "../../data/mockdata7.json";
import mockData8 from "../../data/mockdata8.json";
import mockData9 from "../../data/mockdata9.json";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
    },
    th: {
      fontWeight: 700,
      borderTop: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      fontSize: 14,
      padding: "5px",
    },
    th2: {
      fontWeight: 700,
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      padding: "5px",
      fontSize: 14,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 150,
      fontSize: 14,
      padding: "5px",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableReconcile(props) {
  const { checkMonth, startDate } = props;
  let dataList = [];
  let dataList2 = "";

  if (checkMonth === "Feb") {
    dataList = mockData1;
    dataList2 = mockData7;
  } else if (checkMonth === "Mar") {
    dataList = mockData2;
    dataList2 = mockData8;
  } else if (checkMonth === "Apr") {
    dataList = mockData3;
    dataList2 = mockData9;
  } else {
    dataList = [];
    dataList2 = "";
  }

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <th
                className={classes.th}
                style={{ borderBottom: "1px solid black" }}
                align="left"
              >
                ข้อมูลประจำเดือน
              </th>
              <td className={classes.td} align="left">{`${format(
                startDate,
                "MMMM yyyy",
                {
                  locale: th,
                }
              )}`}</td>
              <th
                align="left"
                className={classes.th}
                style={{ borderBottom: "1px solid black" }}
              >
                สายทาง :
              </th>
              <td className={classes.td} align="left">
                ทางหลวงหมายเลข 9
              </td>
            </tr>
          </table>
          <Box style={{ marginTop: 10, marginBottom: 10 }}>
            <table className={classes.table}>
              <tr>
                <td className={classes.td} align="center">
                  รายรับชำระ (รายการ)
                </td>
                <td className={classes.td} colSpan={2} align="center">
                  ยอดเงินรับชำระ (บาท)
                </td>
                <td className={classes.td} align="center">
                  ส่วนต่างยอดเงิน (บาท)
                </td>
              </tr>
              <tr>
                <td className={classes.td} align="center">
                  ระบบ M-Flow
                </td>
                <td className={classes.td} align="center">
                  ระบบ M-Flow
                </td>
                <td className={classes.td} align="center">
                  กรมทางหลวง
                </td>
                <td className={classes.td} align="center">
                  ระบบ M-Flow - กรมทางหลวง
                </td>
              </tr>
              <tr>
                <td className={classes.td} align="center">
                  {dataList2 ? dataList2.m1.toLocaleString() : ""}
                </td>
                <td className={classes.td} align="right">
                  {dataList2 ? dataList2.m2.toLocaleString() : ""}
                </td>
                <td className={classes.td} align="right">
                  {dataList2 ? dataList2.highway.toLocaleString() : ""}
                </td>
                <td
                  className={classes.td}
                  align="right"
                  style={dataList2.diff < 2 ? { color: "red" } : {}}
                >
                  {dataList2 ? dataList2.diff.toLocaleString() : ""}
                </td>
              </tr>
            </table>
          </Box>

          <table className={classes.table}>
            <tr>
              <td className={classes.td} rowSpan={3} align="center">
                เดือนผ่านทาง
              </td>
              <td className={classes.td} colSpan={4} align="center">
                ยอดรวมสะสม
              </td>
              <td></td>
              <td
                className={classes.td}
                colSpan={8}
                align="center"
              >{`ยอดประจำเดือน ${format(startDate, "MMMM yyyy", {
                locale: th,
              })}`}</td>
              <td></td>
              <td className={classes.td} colSpan={3} align="center">
                ประกันรายได้
              </td>
            </tr>
            <tr>
              <td className={classes.td} align="center">
                รถชำระเงิน
              </td>
              <td className={classes.td} colSpan={3} align="center">
                ยอดเงินรับชำระ(บาท)
              </td>
              <td></td>
              <td className={classes.td} align="center">
                รถชำระเงิน
              </td>
              <td className={classes.td} colSpan={3} align="center">
                ยอดเงินรับชำระ(บาท)
              </td>
              <td className={classes.td} align="center">
                รถค้างชำระ
              </td>
              <td className={classes.td} colSpan={3} align="center">
                ยอดเงินค้างชำระ(บาท)
              </td>
              <td></td>
              <td className={classes.td} align="center">
                รถค้างชำระ
              </td>
              <td className={classes.td} align="center">
                ใบแจ้งหนี้
              </td>
              <td className={classes.td} align="center">
                ยอดเงิน (บาท)
              </td>
            </tr>
            <tr>
              <td className={classes.td} align="center">
                (รายการ)
              </td>
              <td className={classes.td} align="center">
                ค่าผ่านทาง
              </td>
              <td className={classes.td} align="center">
                ค่าปรับ
              </td>
              <td className={classes.td} align="center">
                ค่าทวงถาม
              </td>
              <td></td>
              <td className={classes.td} align="center">
                (รายการ)
              </td>
              <td className={classes.td} align="center">
                ค่าผ่านทาง
              </td>
              <td className={classes.td} align="center">
                ค่าปรับ
              </td>
              <td className={classes.td} align="center">
                ค่าทวงถาม
              </td>
              <td className={classes.td} align="center">
                (รายการ)
              </td>
              <td className={classes.td} align="center">
                ค่าผ่านทาง
              </td>
              <td className={classes.td} align="center">
                ค่าปรับ
              </td>
              <td className={classes.td} align="center">
                ค่าทวงถาม
              </td>
              <td></td>
              <td className={classes.td} align="center">
                (รายการ)
              </td>
              <td className={classes.td} align="center">
                (รายการ)
              </td>
              <td className={classes.td} align="center">
                ค่าผ่านทาง
              </td>
            </tr>

            {dataList.map((row) => (
              <tr>
                <td className={classes.td} align="center">
                  {row.year}
                </td>
                <td className={classes.td} align="center">
                  {row[1].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[2].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[3].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[4].toLocaleString()}
                </td>
                <td></td>
                <td className={classes.td} align="center">
                  {row[5].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[6].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[7].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[8].toLocaleString()}
                </td>
                <td className={classes.td} align="center">
                  {row[9].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[10].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[11].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[12].toLocaleString()}
                </td>
                <td></td>
                <td className={classes.td} align="center">
                  {row[13].toLocaleString()}
                </td>
                <td className={classes.td} align="center">
                  {row[14].toLocaleString()}
                </td>
                <td className={classes.td} align="right">
                  {row[15].toLocaleString()}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Box>
    </>
  );
}
