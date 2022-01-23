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
      fontWeight: 400,
      borderTop: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      fontSize: 11,
      padding: "0px",
    },
    th2: {
      fontWeight: 400,
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      padding: "0px",
      fontSize: 11,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 150,
      fontSize: 11,
      padding: "0px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableReportDaily(props) {
  const { dataList, selectedDate, checkpoint } = props;
  const date = !!selectedDate ? (selectedDate, "dd/MM/yyyy") : "";
  const classes = useStyles();
  return (
    <>
      <Box>
        <Typography
          style={{
            paddingTop: 20,
            paddingLeft: 20,
            fontWeight: 600,
            fontFamily: "sarabun",
          }}
        >
          {checkpoint === 0
            ? "ทุกด่าน"
            : checkpoint === 1
            ? "ด่านทับช้าง1"
            : checkpoint === 2
            ? "ด่านทับช้าง2"
            : checkpoint === 3
            ? "ด่านธัญบุรี1"
            : checkpoint === 4
            ? "ด่านธัญบุรี2"
            : ""}
        </Typography>
        <Typography
          style={{
            paddingLeft: 20,
            fontWeight: 600,
            fontFamily: "sarabun",
          }}
        >
          {`เอกสาร สรุป Transaction ประจำวันที่ ${date}`}
        </Typography>
      </Box>
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
              <th className={classes.th}>จำนวนรถที่ผิดพลาด</th>
              <th className={classes.th}>รถยกเว้น</th>
              <th className={classes.th}>รถที่คงค้าง</th>
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
                      {item.label}
                    </td>
                    <td className={classes.td}>{item.sumCar}</td>
                    <td className={classes.td}>{item.miss}</td>
                    <td className={classes.td}>{item.except}</td>
                    <td className={classes.td}>{item.remain}</td>
                  </tr>
                ))
              : dataList}
          </table>
        </div>
      </Box>
    </>
  );
}
