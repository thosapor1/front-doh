import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  TableFooter,
  TablePagination,
  makeStyles,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import React from "react";
import { withStyles } from "@material-ui/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    headerAudit: {
      backgroundColor: "#46005E",
      border: "1px solid white",
      color: "white",
      position: "sticky",
      top: 0,
    },
    headerPK: {
      backgroundColor: "#ef6c00",
      border: "1px solid white",
      color: "white",
      position: "sticky",
      top: 0,
    },
  };
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function AuditTable(props) {
  const statusBullet = (prpps) => {
    const { className, size, color, ...rest } = prpps;
  };
  const classes = useStyle();
  return (
    <div>
      <Paper style={{ marginTop: 20 }}>
        <TableContainer style={{ width: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
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
              {props.datalist.map((row) => (
                <StyledTableRow key={row.transactionId}>
                  <TableCell align="center">
                    <FiberManualRecordIcon
                      fontSize="small"
                      style={{
                        color:
                          row.state === 2 && row.sub_state === 1
                            ? "orange"
                            : row.state === 2 && row.sub_state === 2
                            ? "red"
                            : "green",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.transactionId}</TableCell>
                  <TableCell align="center">{row.lane_id}</TableCell>
                  <TableCell align="center">{row.timestamp}</TableCell>
                  <TableCell align="center">{row.timestamp}</TableCell>
                  <TableCell align="center">{row.vehicleClass}</TableCell>
                  <TableCell align="center">
                    <ImageIcon />
                  </TableCell>
                  <TableCell align="center">{row.timestamp}</TableCell>
                  <TableCell align="center">{row.wheel_description}</TableCell>
                  <TableCell align="center">{row.cameras_plateNo1}</TableCell>
                  <TableCell align="center">
                    {row.province_description}
                  </TableCell>
                  <TableCell align="center">{row.brand_description}</TableCell>
                  <TableCell align="center">{row.colors_description}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
