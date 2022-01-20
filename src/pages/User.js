import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  Switch,
  TableBody,
  TableRow,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalEdit from "../components/ModalEdit";
import ModalAdd from "../components/ModalAdd";
import Swal from "sweetalert2";

const tableHeader = [
  { id: "user_id", label: "user_id" },
  { id: "username", label: "username" },
  { id: "fname", label: "ชื่อ" },
  { id: "lname", label: "นามสกุล" },
  { id: "position", label: "ตำแหน่ง" },
  { id: "department", label: "แผนก" },
  { id: "command", label: "คำสั่ง" },
  { id: "status", label: "สถานะ" },
];

const useStyles = makeStyles((theme) => {
  return {
    root: { backgroundColor: "#f9f9f9", paddingTop: "2rem" },
    paper: { marginTop: "1rem", padding: theme.spacing() },
    btn: {
      marginTop: "2rem",
      marginBottom: "1rem",
      backgroundColor: "#46005E",
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    modal: {
      width: "50%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalTextField: {
      margin: theme.spacing(1, 0, 0),
      width: 300,
    },
    btn2: {
      margin: theme.spacing(1, 1, 0, 0),
      backgroundColor: "#46005E",
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    active: {
      color: "green",
      fontSize: 11,
    },
    inactive: {
      color: "red",
      fontSize: 11,
    },
  };
});

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});

export default function User() {
  const classes = useStyles();

  const [state, setState] = useState({});

  const [progressStatus, setProgressStatus] = useState({});

  const [open, setOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [dataForEdit, setDataForEdit] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataForEdit(null);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleChangeSwitch = (event, index) => {
    const status = event.target.checked;
    let status1 = 1;
    if (status === false) {
      status1 = 0;
    }

    const sendData = {
      user_id: state.user_list[index].id,
      status: status1,
    };
    let items = [...state.user_list];
    items[index].status = status;
    setState(items);

    apiURL.post("/update-user-status", sendData).then((res) => {
      if (res.data.status === true) {
        fetchData();
      }
    });

    console.log("click", sendData, typeof status1);
  };

  const handleDelete = (item) => {
    const userId = item.user_id;

    Swal.fire({
      title: "ต้องการลบข้อมูลนี้?",
      text: "ไม่สามารถเรียกข้อมูลคืนได้หากยืนยันแล้ว",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "ขอมูลของคุณถูกลบแล้ว.", "success").then(() => {
          apiURL
            .post("/delete-user", { user_id: userId })
            .then((res) =>
              setProgressStatus({ progressStatus: res.data.status })
            );
          if (progressStatus === true) {
            Swal.fire({
              title: "Success!",
              text: "ข้อมูลของท่านถูกบันทึกแล้ว",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
          window.location.reload();
          if (progressStatus === false) {
            Swal.fire({
              icon: "error",
              text: "ตรวจสอบข้อมูลของท่าน",
            });
            console.log("no");
          }
        });
      } else {
        console.log();
      }
    });
  };

  const handlegetDataForEdit = (item) => {
    setDataForEdit(item);
    console.log(item);
  };

  const fetchData = () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    apiURL.post("/user-list").then((res) => {
      Swal.close();
      setState(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Body Modal

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          ตั้งค่า : ผู้ใช้งาน
        </Typography>
        <Paper className={classes.paper}>
          <div style={{ textAlign: "right" }}>
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

          {/* Table */}
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {tableHeader.map((header) => (
                    <TableCell
                      key={header.id}
                      align="center"
                      className={classes.header}
                    >
                      {header.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!!state.user_list
                  ? state.user_list.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell align="center">{item.id} </TableCell>
                        <TableCell align="center">{item.username} </TableCell>
                        <TableCell align="center">{item.fname} </TableCell>
                        <TableCell align="center">{item.lname} </TableCell>
                        <TableCell align="center">{item.position} </TableCell>
                        <TableCell align="center">{item.department} </TableCell>
                        <TableCell align="center">
                          <Tooltip title="edit">
                            <IconButton
                              onClick={() => {
                                handleOpenModalEdit();
                                handlegetDataForEdit(item);
                              }}
                            >
                              <EditTwoToneIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="delete">
                            <IconButton
                              onClick={() => handleDelete(item)}
                              color="secondary"
                            >
                              <DeleteForeverTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          {item.status === 1 ? (
                            <Switch
                              checked={true}
                              onChange={(e) => handleChangeSwitch(e, index)}
                              name={`switch${index}`}
                              color="primary"
                            />
                          ) : (
                            <Switch
                              checked={false}
                              onChange={(e) => handleChangeSwitch(e, index)}
                              name={`switch${index}`}
                              color="secondary"
                            />
                          )}
                          <Typography
                            className={
                              item.status === 1
                                ? classes.active
                                : classes.inactive
                            }
                          >
                            {item.status === 1 ? "active" : "inactive"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  : state.user_list}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <ModalAdd
          open={open}
          onClose={() => handleClose()}
          onClick={() => handleClose()}
        />

        <ModalEdit
          dataForEdit={dataForEdit}
          open={openModalEdit}
          onClose={() => handleCloseModalEdit()}
          onClick={() => handleCloseModalEdit()}
        />
      </Container>
    </>
  );
}
