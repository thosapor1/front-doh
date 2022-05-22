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

export default function TableReportMockMonthly(props) {
  const { checkMonth } = props;
  let dataList = [];
  const mockFeb = [
    {
      type: "C1",
      allCar: 731123,
      normal: 710306,
      except: 3294,
      illegal: 17523,
    },
    {
      type: "C2",
      allCar: 8062,
      normal: 2290,
      except: 68,
      illegal: 5704,
    },
    {
      type: "C3",
      allCar: 2835,
      normal: 1248,
      except: 18,
      illegal: 1569,
    },
    {
      type: "all",
      allCar: 742020,
      normal: 713844,
      except: 3380,
      illegal: 24796,
    },
  ];
  const mockMar = [
    {
      type: "C1",
      allCar: 1841893,
      normal: 1797647,
      except: 7697,
      illegal: 36549,
    },
    {
      type: "C2",
      allCar: 21597,
      normal: 20236,
      except: 151,
      illegal: 1210,
    },
    {
      type: "C3",
      allCar: 13203,
      normal: 12922,
      except: 97,
      illegal: 184,
    },
    {
      type: "all",
      allCar: 1876693,
      normal: 1830805,
      except: 7945,
      illegal: 37943,
    },
  ];

  const mockApr = [
    {
      type: "C1",
      allCar: 1638626,
      normal: 1610018,
      except: 4674,
      illegal: 23934,
    },
    {
      type: "C2",
      allCar: 31118,
      normal: 29965,
      except: 156,
      illegal: 997,
    },
    {
      type: "C3",
      allCar: 23674,
      normal: 23443,
      except: 67,
      illegal: 164,
    },
    {
      type: "all",
      allCar: 1693418,
      normal: 1663426,
      except: 4897,
      illegal: 25095,
    },
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
              <th className={classes.th}>รถปกติ</th>
              <th className={classes.th}>รถยกเว้น</th>
              <th className={classes.th}>รถผิดกฏหมาย</th>
            </tr>
            <tr>
              <th className={classes.th2}>(คัน)</th>
              <th className={classes.th2}>(คัน)</th>
              <th className={classes.th2}>(คัน)</th>
              <th className={classes.th2}>(คัน)</th>
            </tr>
            {!!dataList
              ? dataList.map((item, index) => (
                  <tr key={index}>
                    <td className={classes.td} style={{ height: 20 }}>
                      {item.type === "all" ? "รวมทั้งหมด" : item.type}
                    </td>
                    <td className={classes.td}>
                      {!!item.allCar ? item.allCar.toLocaleString() : "0"}
                    </td>
                    <td className={classes.td}>
                      {!!item.normal ? item.normal.toLocaleString() : "0"}
                    </td>
                    <td className={classes.td}>
                      {!!item.except ? item.except.toLocaleString() : "0"}
                    </td>
                    <td className={classes.td}>
                      {!!item.illegal ? item.illegal.toLocaleString() : "0"}
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
