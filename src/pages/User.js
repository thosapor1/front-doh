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
  Modal,
  TextField,
  Grid,
  Divider,
  FormControlLabel,
  Switch,
  TableBody,
  TableRow,
  IconButton,
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
    },
  };
});

const apiURL = axios.create({
  baseURL: "http://202.183.167.92:5010/audit/api",
});

export default function User() {
  const classes = useStyles();

  const [state, setState] = useState({
    status: "",
    User_list: [
      {
        user_id: "",
        username: "",
        fname: "",
        lname: "",
        position_id: "",
        department_id: "",
        highway_id: "",
        checkpoint_id: "",
      },
    ],
  });

  const [switch1, setSwitch] = useState({
    activeChecked: true,
    inActiveChecked: false,
  });

  const [progressStatus, setProgressStatus] = useState({});

  const [open, setOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [dataForEdit, setDataForEdit] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
    console.log("hello");
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleChangeSwitch = (event, index) => {
    setSwitch({ ...switch1, [event.target.name]: event.target.checked });
  };

  const handleDelete = async (item) => {
    const userId = item.user_id.toString();

    await Swal.fire({
      title: "ต้องการลบข้อมูลนี้?",
      text: "ไม่สามารถย้อนกลับได้หากยืนยันแล้ว",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          () => {
            apiURL
              .post("/delete-user", { user_id: userId })
              .then((res) =>
                setProgressStatus({ progressStatus: res.data.status })
              );
            if (progressStatus == true) {
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
          }
        );
      } else {
        console.log();
      }
    });

    // try {
    //   apiURL.post("/delete-user", { user_id: userId }).then((res) => {});
    // } catch (error) {
    //   alert(error);
    // }
  };

  const handlegetDataForEdit = async (item) => {
    setDataForEdit(item);
    console.log(item);
  };

  const fetchData = async () => {
    await apiURL.get("/user-list").then((res) => {
      setState(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Body Modal

  return (
    <Container className={classes.root}>
      <Typography variant="h6">ตั้งค่า : ผู้ใช้งาน</Typography>
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
              {tableHeader.map((header) => (
                <TableCell key={header.id} align="center">
                  {header.label}
                </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {state.User_list.map((item) => (
                <TableRow key={item.user_id}>
                  <TableCell align="center">{item.user_id} </TableCell>
                  <TableCell align="center">{item.username} </TableCell>
                  <TableCell align="center">{item.fname} </TableCell>
                  <TableCell align="center">{item.lname} </TableCell>
                  <TableCell align="center">{item.position} </TableCell>
                  <TableCell align="center">{item.department} </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EditTwoToneIcon
                        color="primary"
                        onClick={() => {
                          handleOpenModalEdit();
                          handlegetDataForEdit(item);
                        }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item)}
                      color="secondary"
                    >
                      <DeleteForeverTwoToneIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Switch color="primary" />
                  </TableCell>
                </TableRow>
              ))}
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
  );
}
