import {
    Button,
    Divider,
    Grid,
    makeStyles,
    Modal,
    TextField,
    Typography,
  } from "@material-ui/core";
  import axios from "axios";
  import React, { useState } from "react";
  import Swal from "sweetalert2";
  
  const apiURL = axios.create({
    baseURL: "http://202.183.167.119:3011/audit/api",
  });
  
  const useStyle = makeStyles((theme) => {
    return {
      root: {},
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
  
  export default function ModalActivity(props) {
    const classes = useStyle();  
    const [showResult, setshowResult] = useState(false);
    const body = (
      <div className={classes.modal}>
        
      </div>
    );
  
    return (
      <div>
        <Modal
          open={props.open}
          onClose={props.onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {body}
        </Modal>
      </div>
    );
  }
  