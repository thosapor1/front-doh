import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { th } from "date-fns/locale";
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

export default function TopTable2(props) {
  const { selectedDate, startTime, endTime } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <td className={classes.td}>ข้อมูล ณ วันที่ :</td>
              <td className={classes.td2}>
                {format(new Date(), "dd MMMM yyyy", { locale: th })}
              </td>
              <td className={classes.td}>ข้อมูลเริ่มต้นวันที่ :</td>
              <td className={classes.td2}>
                {`วันที่ ${format(selectedDate, "dd MMMM yyyy", {
                  locale: th,
                })} เวลา ${format(startTime, "HH:mm")} น.`}
              </td>
            </tr>

            <tr>
              <td className={classes.td}>สายทาง :</td>
              <td className={classes.td2}>ทางหลวงหมายเลข 9</td>
              <td className={classes.td}>ข้อมูลสิ้นสุดวันที่ :</td>
              <td className={classes.td2}>
                {`วันที่ ${format(selectedDate, "dd MMMM yyyy", {
                  locale: th,
                })} เวลา ${format(endTime, "HH:mm")} น.`}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
