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
      width: 150,
      fontSize: 14,
      padding: "5px",
    },
    th2: {
      fontWeight: 700,
      border: "1px solid black",
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

export default function TabledataTX(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <th className={classes.th}>ด่าน</th>
              <th className={classes.th}>TVCS</th>
              <th className={classes.th}>Audit</th>
              <th className={classes.th}>HQ</th>
              <th className={classes.th}>Match AD+HQ</th>
              <th className={classes.th}>Miss-Match AD+HQ</th>
            </tr>

            <tr>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[0].checkpoint_name.toLocaleString()
                  : "ด่านทับช้าง 1 ML"}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[0].count_tvcs.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[0].count_audit.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[0].count_hq.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[0].count_match_data.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[0].count_mis_match_data.toLocaleString()
                  : 0}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[1].checkpoint_name.toLocaleString()
                  : "ด่านทับช้าง 1 SL"}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[1].count_tvcs.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[1].count_audit.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[1].count_hq.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[1].count_match_data.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[1].count_mis_match_data.toLocaleString()
                  : 0}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[2].checkpoint_name.toLocaleString()
                  : "ด่านทับช้าง 2 ML"}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[2].count_tvcs.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[2].count_audit.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[2].count_hq.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[2].count_match_data.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[2].count_mis_match_data.toLocaleString()
                  : 0}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[3].checkpoint_name.toLocaleString()
                  : "ด่านทับช้าง 2 SL"}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[3].count_tvcs.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[3].count_audit.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[3].count_hq.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[3].count_match_data.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[3].count_mis_match_data.toLocaleString()
                  : 0}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[4].checkpoint_name.toLocaleString()
                  : "ด่านธัญบุรี 1 ML"}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[4].count_tvcs.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[4].count_audit.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[4].count_hq.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[4].count_match_data.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[4].count_mis_match_data.toLocaleString()
                  : 0}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                {!!dataList.result
                  ? dataList.result[5].checkpoint_name.toLocaleString()
                  : "ด่านธัญบุรี 2 ML"}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[5].count_tvcs.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[5].count_audit.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[5].count_hq.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[5].count_match_data.toLocaleString()
                  : 0}
              </td>
              <td className={classes.td}>
                {" "}
                {!!dataList.result
                  ? dataList.result[5].count_mis_match_data.toLocaleString()
                  : 0}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
