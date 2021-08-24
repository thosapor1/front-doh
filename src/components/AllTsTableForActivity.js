import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React, { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import ModalActivity from "./ModalActivity";

const apiURL = axios.create({
  baseURL: "http://202.183.167.92:3010/audit/api/v2",
});
const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: 600,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#e8eaf6 !important",
      },
    },
  };
});

const headerCells = [
  {
    id: "status",
    label: "สถานะ",
  },
  {
    id: "transaction",
    label: "transaction",
  },
  {
    id: "timeArrive",
    label: "เวลาเข้าด่าน",
  },
  {
    id: "typeCarAudit",
    label: "ประเภทรถ(ระบบตรวจสอบ)",
  },
  {
    id: "feeAudit",
    label: "ค่าผ่านทาง(ระบบตรวจสอบ)",
  },
  {
    id: "typeCarPK3",
    label: "ประเภทรถ(PK3)",
  },
  {
    id: "feePK3",
    label: "ค่าผ่านทาง(PK3)",
  },
  {
    id: "carDetail",
    label: "รายละเอียดรถ",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function AllTsTableForActivity(props) {
  const [open, setOpen] = useState(false);
  const [dataForActivity, SetDataForActivity] = useState({});

  const fetchData = async (ts) => {
    const res = await apiURL.post("/display-activity", {
      transactionId: ts,
    });
    console.log("res2:", res.data);
    await SetDataForActivity(res.data);
  };

  const handleOpen = async () => {
    // await fetchData();
    await setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const { dataList, page, onChange } = props;

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <TableContainer className={classes.container}>
        <Pagination
          count={dataList.totalPages}
          color="primary"
          page={page}
          onChange={onChange}
          style={{
            display: "inline",
            margin: "2rem",
            position: "sticky",
            top: 0,
          }}
        />
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {headerCells.map((headerCell) => (
                <TableCell
                  align="center"
                  key={headerCell.id}
                  className={classes.header}
                >
                  {headerCell.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList
              ? dataList.ts_table.map((data) => (
                  <StyledTableRow
                    key={data.transactionId}
                    onClick={() => {
                      fetchData(
                        "T20210714-6104bdec-69d7-4d4b-980e-7e5893e1a1136"
                      );
                      handleOpen();
                    }}
                    className={classes.tableRow}
                  >
                    <TableCell align="center">
                      <FiberManualRecordIcon
                        fontSize="small"
                        style={{
                          color:
                            data.state === 2
                              ? "orange"
                              : data.state === 3
                              ? "red"
                              : "green",
                        }}
                      />
                      {data.match_id}
                    </TableCell>
                    <TableCell align="center">{data.transactionId}</TableCell>
                    <TableCell align="center">{data.timestamp}</TableCell>
                    <TableCell align="center">{data.class}</TableCell>
                    <TableCell align="center">{data.fee}</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </StyledTableRow>
                ))
              : dataList}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalActivity
        dataList={dataForActivity}
        open={open}
        onClick={handleClose}
      />
    </div>
  );
}
