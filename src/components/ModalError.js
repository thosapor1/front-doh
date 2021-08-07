import { makeStyles, Modal } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => {
    return {
      root: { backgroundColor: "#f9f9f9", paddingTop: "2rem" },
      paper: { marginTop: "1rem", padding: theme.spacing(2) },
      btn: { marginTop: "2rem", marginBottom: "1rem" },
      modal: {
        width: "65%",
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      
    };
  });

export default function ModalError() {
    return (
        <div>
            <Modal>

            </Modal>
        </div>
    )
}
