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
  const { dataList } = props;

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
            {!!dataList.result_hq
              ? dataList.result_hq.map((item, index) => (
                  <tr key={index}>
                    <td className={classes.td} style={{ height: 20 }}>
                      {item.class === "total" ? "รวมทั้งหมด" : `C${item.class}`}
                    </td>
                    <td className={classes.td}>
                      {item.count.toLocaleString()}
                    </td>
                    <td className={classes.td}>
                      {item.normal.toLocaleString()}
                    </td>
                    <td className={classes.td}>
                      {item.reject.toLocaleString()}
                    </td>
                    <td className={classes.td}>
                      {item.illegal.toLocaleString()}
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
