import { Box, CardMedia, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { th } from "date-fns/locale";
import React from "react";
import mockData4 from "../../data/mockdata4.json";
import mockData5 from "../../data/mockdata5.json";
import mockData6 from "../../data/mockdata6.json";
import logoHighways from "../../image/logo_doh1.png";

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
    typography: {
      fontFamily: "Sarabun",
    },
  };
});

export default function TableAmountPayment(props) {
  const { checkMonth, startDate } = props;
  let dataList = [];

  if (checkMonth === "Feb") {
    dataList = mockData4;
  } else if (checkMonth === "Mar") {
    dataList = mockData5;
  } else if (checkMonth === "Apr") {
    dataList = mockData6;
  } else {
    dataList = [];
  }

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root} id="tableAmountPayment">
          <Box style={{ display: "flex", flexWrap: "wrap" }}>
            <CardMedia
              component="img"
              src={logoHighways}
              alt="logo_highways"
              style={{ width: 100, marginBottom: 30, marginRight: 20 }}
            />
            <Box style={{ paddingTop: 15 }}>
              <Typography
                className={classes.typography}
                style={{ fontSize: "1.2rem" }}
              >
                ฝ่ายตรวจสอบรายได้
              </Typography>
              <hr style={{ width: "370%" }} />
              <Typography
                className={classes.typography}
                style={{ fontSize: "1.2rem" }}
              >
                กองทางหลวงพิเศษระหว่างเมือง กรมทางหลวง
              </Typography>
            </Box>
          </Box>
          <Typography
            className={classes.typography}
            style={{ marginBottom: 10 }}
          >
            รายงานสรุปการชำระค่าผ่านทางในแต่ละวัน
          </Typography>
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
          <Box
            style={{
              marginTop: 10,
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <table className={classes.table}>
              <tr>
                <td
                  className={classes.td}
                  style={{ height: 10 }}
                  align="center"
                  rowSpan={2}
                >
                  วันที่
                </td>
                <td
                  className={classes.td}
                  style={{ height: 10 }}
                  align="center"
                  rowSpan={2}
                >
                  {`รายการรับชำระ`} <br /> {`(รายการ)`}
                </td>
                <td
                  className={classes.td}
                  style={{ height: 10 }}
                  align="center"
                  colSpan={2}
                >
                  ยอดเงินรับชำระ (บาท)
                </td>
                <td
                  className={classes.td}
                  style={{ height: 10 }}
                  align="center"
                  rowSpan={2}
                >
                  {`ส่วนต่างยอดเงิน`} <br /> {`(บาท)`}
                </td>
              </tr>
              <tr>
                <td
                  className={classes.td}
                  style={{ height: 10 }}
                  align="center"
                >
                  ระบบ M-Flow
                </td>
                <td
                  className={classes.td}
                  style={{ height: 10 }}
                  align="center"
                >
                  กรมทางหลวง
                </td>
                <td>{null}</td>
                <td>{null}</td>
              </tr>
              {dataList
                ? dataList
                    .filter((row, index) => index < 16)
                    .map((row) => (
                      <tr>
                        <td className={classes.td} align="center">
                          {row.day}
                        </td>
                        <td className={classes.td} align="center">
                          {row.receive.toLocaleString()}
                        </td>
                        <td className={classes.td} align="right">
                          {row.mflow.toLocaleString()}
                        </td>
                        <td className={classes.td} align="right">
                          {row.highways.toLocaleString()}
                        </td>
                        <td className={classes.td} align="right">
                          {row.diff.toLocaleString()}
                        </td>
                      </tr>
                    ))
                : []}
            </table>

            <table className={classes.table}>
              <tr>
                <td className={classes.td} align="center" rowSpan={2}>
                  วันที่
                </td>
                <td className={classes.td} align="center" rowSpan={2}>
                  {`รายการรับชำระ`} <br /> {`(รายการ)`}
                </td>
                <td className={classes.td} align="center" colSpan={2}>
                  ยอดเงินรับชำระ (บาท)
                </td>
                <td className={classes.td} align="center" rowSpan={2}>
                  {`ส่วนต่างยอดเงิน`} <br /> {`(บาท)`}
                </td>
              </tr>
              <tr>
                <td className={classes.td} align="center">
                  ระบบ M-Flow
                </td>
                <td className={classes.td} align="center">
                  กรมทางหลวง
                </td>
              </tr>
              {dataList
                .filter((row, index) => index > 15)
                .map((row) => (
                  <tr>
                    <td className={classes.td} align="center">
                      {row.day}
                    </td>
                    <td className={classes.td} align="center">
                      {row.receive.toLocaleString()}
                    </td>
                    <td className={classes.td} align="right">
                      {row.mflow.toLocaleString()}
                    </td>
                    <td className={classes.td} align="right">
                      {row.highways.toLocaleString()}
                    </td>
                    <td
                      className={classes.td}
                      align="right"
                      style={row.diff !== 0 ? { color: "red" } : {}}
                    >
                      {row.diff.toLocaleString()}
                    </td>
                  </tr>
                ))}
            </table>
          </Box>
          <Box
            style={{
              margin: "40px 30px 20px 0px",
              float: "right",
              textAlign: "center",
            }}
          >
            <Typography className={classes.typography}>
              (............................................)
            </Typography>
            <Typography className={classes.typography}>ผู้ตรวจสอบ</Typography>
          </Box>
          <hr style={{ backgroundColor: "black", width: "100%" }} />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography className={classes.typography}>
              รายงานสรุปการชำระค่าผ่านทางในแต่ละวัน
            </Typography>
            <Typography className={classes.typography}>ตส.07</Typography>
          </Box>
        </div>
      </Box>
    </>
  );
}
