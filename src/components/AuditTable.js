import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import React from "react";
import { withStyles } from "@material-ui/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Pagination } from "@material-ui/lab";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    headerAudit: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      padding: 10,
      height: 10,
      fontSize: "0.8rem",
    },
    headerPK: {
      backgroundColor: "#BB564B",
      border: "1px solid white",
      color: "white",
      padding: 10,
      height: 10,
      fontSize: "0.8rem",
    },
    bodyData: {
      fontSize: "0.65rem",
    },
    pageStyle: {
      display: "inline",
      margin: "4rem",
      position: "sticky",
      "& .MuiPaginationItem-root": {
        fontSize: "0.75rem",
      },
    },
  };
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}))(TableRow);

export default function AuditTable(props) {
  const { page, onChange, datalist } = props;
  const classes = useStyle();
  return (
    <div>
      <Pagination
        count={datalist.totalPages}
        color="primary"
        page={page}
        onChange={onChange}
        className={classes.pageStyle}
      />
      <Paper>
        <TableContainer style={{ width: "auto", height: 760 }}>
          <Table>
            <TableHead>
              <TableRow style={{ padding: 5 }}>
                <TableCell colSpan={13} className={classes.headerAudit}>
                  ระบบตรวจสอบรายได้ (Audit)
                </TableCell>
                <TableCell colSpan={10} className={classes.headerPK}>
                  ระบบจัดเก็บรายได้
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  rowSpan={2}
                  className={classes.headerAudit}
                >
                  สถานะ
                </TableCell>
                <TableCell
                  align="center"
                  rowSpan={2}
                  className={classes.headerAudit}
                >
                  หมายเลขรายการ
                </TableCell>
                <TableCell
                  align="left"
                  rowSpan={2}
                  className={classes.headerAudit}
                >
                  ช่องทาง
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  กล้องตรวจจับยานพาหนะ
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={3}
                  className={classes.headerAudit}
                >
                  อุปกรณ์ตรวจจับระบบตรวจสอบรายได้
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={6}
                  className={classes.headerAudit}
                >
                  ข้อมูลยานพาหนะจากกรมการขนส่งทางบก
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  className={classes.headerPK}
                >
                  อุปกรณ์ตรวจจับยานพาหนะ
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={8}
                  className={classes.headerPK}
                >
                  ระบบกล้องถ่ายแผ่นป้าทะเบียน
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" className={classes.headerAudit}>
                  เวลา
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  เวลา
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  ประเภท
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  กล้อง Audit
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.headerAudit}
                  style={{ width: 50 }}
                >
                  เวลา
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  ประเภทรถ
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  เลขทะเบียน
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  หมวดจังหวัด
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  ยี่ห้อรถ
                </TableCell>
                <TableCell align="center" className={classes.headerAudit}>
                  สีรถ
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  เวลา
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  ประเภทรถ
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  เวลา
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  ประเภทรถ
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  กล้อง ALPR
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  กล้อง DVES
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  เลขทะเบียน
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  หมวดจังหวัด
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  ยี่ห้อรถ
                </TableCell>
                <TableCell align="center" className={classes.headerPK}>
                  สีรถ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!datalist.record
                ? datalist.record.map((row,index) => (
                    <StyledTableRow key={index}>
                      <TableCell align="center">
                        <FiberManualRecordIcon
                          fontSize="small"
                          style={{
                            color:
                              row.state === 2
                                ? "#FF2400"
                                : row.state === 3
                                ? "blue"
                                : row.state === 4
                                ? "yellow"
                                : row.state === 5
                                ? "black"
                                : row.state === 6
                                ? "pink"
                                : row.state === 7
                                ? "green"
                                : "gray",
                          }}
                        />
                        {/* {row.match_id} */}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {row.transactionId}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {row.lane_id}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {!!row.timestamp ? row.timestamp.split(" ").pop() : "-"}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {!!row.timestamp ? row.timestamp.split(" ").pop() : "-"}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {row.vehicleClass}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        <ImageIcon />
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {!!row.timestamp ? row.timestamp.split(" ").pop() : "-"}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {row.wheel_description}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {row.cameras_plateNo1}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {row.province_description}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {row.brand_description}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        {row.colors_description}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                      <TableCell align="center" className={classes.bodyData}>
                        -
                      </TableCell>
                    </StyledTableRow>
                  ))
                : []}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
