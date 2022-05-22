import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
      display: "flex",
      justifyContent: "center",
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
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableRemainMonthly(props) {
  const { checkMonth } = props;
  let dataList = [];

  const mockDataFeb = [
    {
      type: "C1",
      member: { car: 357, amount: 10710 },
      nonMem: { car: 105145, amount: 3154350 },
    },
    {
      type: "C2",
      member: { car: 15, amount: 750 },
      nonMem: { car: 193, amount: 9650 },
    },
    {
      type: "C3",
      member: { car: 0, amount: 0 },
      nonMem: { car: 146, amount: 10220 },
    },
    {
      type: "all",
      member: { car: 372, amount: 11460 },
      nonMem: { car: 105484, amount: 3174220 },
    },
  ];

  const mockDataMar = [
    {
      type: "C1",
      member: { car: 4417, amount: 132510 },
      nonMem: { car: 116926, amount: 3507780 },
    },
    {
      type: "C2",
      member: { car: 131, amount: 6550 },
      nonMem: { car: 496, amount: 24800 },
    },
    {
      type: "C3",
      member: { car: 14, amount: 980 },
      nonMem: { car: 472, amount: 33040 },
    },
    {
      type: "all",
      member: { car: 4562, amount: 140040 },
      nonMem: { car: 1178, amount: 3565620 },
    },
  ];

  const mockDataApr = [
    {
      type: "C1",
      member: { car: 2574, amount: 77220 },
      nonMem: { car: 34023, amount: 1020690 },
    },
    {
      type: "C2",
      member: { car: 150, amount: 7500 },
      nonMem: { car: 288, amount: 14400 },
    },
    {
      type: "C3",
      member: { car: 22, amount: 1540 },
      nonMem: { car: 275, amount: 19250 },
    },
    {
      type: "all",
      member: { car: 2746, amount: 86260 },
      nonMem: { car: 34586, amount: 1054340 },
    },
  ];

  if (checkMonth === "Feb") {
    dataList = mockDataFeb;
  } else if (checkMonth === "Mar") {
    dataList = mockDataMar;
  } else if (checkMonth === "Apr") {
    dataList = mockDataApr;
  } else {
    dataList = [];
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
                rowSpan="2"
                style={{ borderBottom: "1px solid black" }}
              >
                ประเภทรถ
              </th>

              <th className={classes.th} colSpan={2}>
                Member
              </th>
              <th className={classes.th} colSpan={2}>
                Non-Member
              </th>
            </tr>
            <tr>
              <th
                className={classes.th}
                style={{ borderBottom: "1px solid black" }}
              >
                จำนวนรถ (รายการ)​
              </th>
              <th
                className={classes.th}
                style={{ borderBottom: "1px solid black" }}
              >
                จำนวนเงิน (บาท)
              </th>
              <th
                className={classes.th}
                style={{ borderBottom: "1px solid black" }}
              >
                จำนวนรถ (รายการ)​
              </th>
              <th
                className={classes.th}
                style={{ borderBottom: "1px solid black" }}
              >
                จำนวนเงิน (บาท)
              </th>
            </tr>
            {!!dataList
              ? dataList.map((item, index) => (
                  <tr key={index}>
                    <td className={classes.td} style={{ height: 20 }}>
                      {item.type === "all" ? "รวมทั้งหมด" : item.type}
                    </td>
                    <td className={classes.td}>
                      {!!item.member.car
                        ? item.member.car.toLocaleString()
                        : "0"}
                    </td>
                    <td className={classes.td} style={{ textAlign: "right" }}>
                      {!!item.member.amount
                        ? item.member.amount.toLocaleString()
                        : "0"}
                    </td>
                    <td className={classes.td}>
                      {!!item.nonMem.car
                        ? item.nonMem.car.toLocaleString()
                        : "0"}
                    </td>
                    <td className={classes.td} style={{ textAlign: "right" }}>
                      {!!item.nonMem.car
                        ? item.nonMem.car.toLocaleString()
                        : "0"}
                    </td>
                  </tr>
                ))
              : dataList}
          </table>
        </div>
      </Box>
    </>
  );
}
