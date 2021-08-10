import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@material-ui/core";
  import React from "react";
  
  const useStyles = makeStyles((theme) => {
    return {
      container: {
        maxHeight: 300,
      },
    };
  });
  
  const columns = [
    {
      id: "station",
      label: "ด่าน",
      minWidth: 170,
    },
    {
      id: "lane",
      label: "ช่องจราจร",
    },
    {
      id: "volume",
      label: "ปริมาณรถ",
    },
  ];
  
  export default function AllTsTable(props) {
    const classes = useStyles();
  
    return (
      <div>
        <TableContainer className={classes.container}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>สถานะ</TableCell>
                <TableCell>transaction</TableCell>
                <TableCell>เวลาเข้าด่าน</TableCell>
                <TableCell>ประเภทรถ ระบบตรวจสอบ</TableCell>
                <TableCell>ค่าผ่านทาง ระบบตรวจสอบ</TableCell>
                <TableCell>ประเภทรถ PK3</TableCell>
                <TableCell>ค่าผ่านทาง PK3</TableCell>
                <TableCell>รายละเอียดรถ</TableCell>
              </TableRow>
              <TableBody></TableBody>
              <TableRow>
              <TableCell>
                  test
              </TableCell>
              <TableCell>
                  test
              </TableCell>
              <TableCell>
                  test
              </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    );
  }
  