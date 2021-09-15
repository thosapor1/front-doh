import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  IconButton,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import Swal from "sweetalert2";
import axios from "axios";
import ModalEdit from "./ModalEdit";

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V1}`,
});

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.3em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px  lightgray",
      },
    },
    container: {
      maxHeight: "80vh",
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    btn: {
      height: "40px",
      width: "150",
      marginTop: "2rem",
      marginBottom: "1rem",
      backgroundColor: "#46005E",
    },
  };
});

const headerCells = [
  {
    id: "order",
    label: "ลำดับ",
  },
  {
    id: "highwayName",
    label: "ชื่อสายทาง",
  },
  {
    id: "checkpointName",
    label: "ชื่อด่าน",
  },
  {
    id: "action",
    label: "คำสั่ง",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableCheckpointTab(props) {
  const [dataForEdit, setDataForEdit] = useState(null);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleGetDataForEdit = (item) => {
    setDataForEdit(item);
    console.log(item);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
    console.log("hello");
  };

  const handleDelete = async (item) => {
    alert("delete");
  };
  const classes = useStyles();
  const { dataList, page, onChange } = props;

  return (
    <Container maxWidth="xl">
      <div style={{ display: "flex", justifyContent: "right" }}>
        {/* <Pagination
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
        /> */}

        <Button
          className={classes.btn}
          startIcon={<AddTwoToneIcon />}
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          เพิ่มผู้ใช้งาน
        </Button>
      </div>
      <TableContainer className={classes.container}>
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
              ? dataList.map((data, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="center">{data.username} </TableCell>
                    <TableCell align="center">{data.firstname}</TableCell>
                    <TableCell align="center">{data.lastname}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          handleOpenModalEdit();
                          handleGetDataForEdit(data);
                        }}
                      >
                        <EditTwoToneIcon color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(data)}
                        color="secondary"
                      >
                        <DeleteForeverTwoToneIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))
              : dataList}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalEdit
        dataForEdit={dataForEdit}
        open={openModalEdit}
        onClose={() => handleCloseModalEdit()}
        onClick={() => handleCloseModalEdit()}
      />
    </Container>
  );
}
