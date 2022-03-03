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
      width: 150,
      fontSize: 14,
      padding: "5px",
      textAlign: "left",
    },
    td2: {
      fontWeight: 400,
      border: "1px solid black",
      width: 403,
      fontSize: 14,
      padding: "5px",
      textAlign: "left",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TopTable(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td}>ข้อมูล ณ วันที่ :</td>
              <td className={classes.td2}>วันที่ 28 กุมภาพันธ์ 2565</td>
              <td className={classes.td}>ข้อมูลเริ่มต้นวันที่ :</td>
              <td className={classes.td2}>
                วันที่ 27 กุมภาพันธ์ 2565 เวลา 00.00 น.
              </td>
            </tr>

            <tr>
              <td className={classes.td}>สายทาง :</td>
              <td className={classes.td2}>ทางหลวงหมายเลข 9</td>
              <td className={classes.td}>ข้อมูลสิ้นสุดวันที่ :</td>
              <td className={classes.td2}>
                วันที่ 27 กุมภาพันธ์ 2565 เวลา 23.59 น.
              </td>
            </tr>
            <tr>
              <td className={classes.td}>ด่าน :</td>
              <td className={classes.td2}>ทุกด่าน</td>
              <td className={classes.td}>{null}</td>
              <td className={classes.td2}>{null}</td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
