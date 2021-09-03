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
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
  };
});

const apiURL = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_V2}`,
});

export default function User() {
  const classes = useStyles();

  const [state, setState] = useState({
    status: "",
    user_list: [
      {
        checkpoint: "",
        checkpoint_id: "",
        department: "",
        department_id: "",
        email: "",
        fname: "",
        highway: "",
        highway_id: "",
        lname: "",
        position: "",
        position_id: "",
        status: "",
        tel: "",
        user_id: "",
        username: "",
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
    setDataForEdit(null);
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
    const userId = event.target.id;
    console.log("click", userId, event.target.value);
  };

  const handleDelete = async (item) => {
    const userId = item.user_id.toString();

    await Swal.fire({
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

  const fetchData = async () => {
    await apiURL.post("/user-list").then((res) => {
      setState(res.data);
      console.log(res.data, "state:", state);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Body Modal

  return (
    <Container maxWidth="xl" className={classes.root}>
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
                <TableCell
                  key={header.id}
                  align="center"
                  className={classes.header}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {!!state.user_list
                ? state.user_list.map((item) => (
                    <TableRow key={item.id}>
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
                        {item.status == true ? (
                          <Switch
                            checked={switch1.activeChecked}
                            onChange={handleChangeSwitch}
                            name="activeChecked"
                            id={item.user_id.toString()}
                            color="primary"
                          />
                        ) : (
                          <Switch
                            checked={switch1.inActiveChecked}
                            onChange={handleChangeSwitch}
                            name="inActiveChecked"
                            id={item.user_id.toString()}
                            color="primary"
                          />
                        )}
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
  );
}
