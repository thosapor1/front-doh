import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import React from "react";

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
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableNumberOfCarTransactionMonthly(props) {
  const { checkMonth } = props;
  let dataList = [];
  const mockFeb = [
    { type: "undefined", number: 0 },
    { type: "C1", number: 731123 },
    { type: "C2", number: 8062 },
    { type: "C3", number: 2835 },
    { type: "all", number: 742020 },
  ];
  const mockMar = [
    { type: "undefined", number: 0 },
    { type: "C1", number: 1841893 },
    { type: "C2", number: 21597 },
    { type: "C3", number: 13203 },
    { type: "all", number: 1876693 },
  ];
  const mockApr = [
    { type: "undefined", number: 0 },
    { type: "C1", number: 1638626 },
    { type: "C2", number: 31118 },
    { type: "C3", number: 23674 },
    { type: "all", number: 1693418 },
  ];

  if (checkMonth === "Feb") {
    dataList = mockFeb;
  } else if (checkMonth === "Mar") {
    dataList = mockMar;
  } else if (checkMonth === "Apr") {
    dataList = mockApr;
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
              <th className={classes.th}>จำนวนรถทั้งหมด</th>
            </tr>
            <tr>
              <th className={classes.th2}>(คัน)</th>
            </tr>
            {!!dataList
              ? dataList.map((item, index) => (
                  <tr key={index}>
                    <td className={classes.td} style={{ height: 20 }}>
                      {item.type === "undefined"
                        ? "ระบุประเภทไม่ได้"
                        : item.type === "all"
                        ? "รวมทั้งหมด"
                        : `${item.type}`}
                    </td>
                    <td className={classes.td}>
                      {!!item.number ? item.number.toLocaleString() : "0"}
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
