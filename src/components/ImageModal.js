import {
  Box,
  CardMedia,
  Grid,
  makeStyles,
  Modal,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    bodyModal: {
      display: "flex",
      height: "auto",
      width: "50%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      //   [theme.breakpoints.only("md")]: {
      //     marginTop: "90%",
      //   },
      //   [theme.breakpoints.only("sm")]: {
      //     marginTop: "120%",
      //   },
    },
    // imageWrap: {
    //   height: "0",
    //   paddingBottom: "20%",
    //   position: "relative",
    //   overflow: "hidden",
    // },
    // image: {
    //   height: "100%",
    //   Width: "100%",
    //   border: "1px solid lightgray",
    //   position: "absolute",
    //   objectFit: "cover",
    // },
  };
});

export default function ImageModal(props) {
  const classes = useStyle();
  const { open, onClose, dataList } = props;

  const body = (
    <Box className={classes.bodyModal}>
      <Grid container>
        <Grid item lg={6}>
          <CardMedia
            component="img"
            src={
              !!dataList.picFull
                ? `data:image/png;base64, ${dataList.picFull}`
                : noImage
            }
            className={classes.image}
          />
          <Grid item lg={6}>
            <CardMedia
              component="img"
              src={
                !!dataList.picCrop
                  ? `data:image/png;base64, ${dataList.picCrop}`
                  : noImage
              }
              className={classes.image}
            />
          </Grid>
        </Grid>
        <Box style={{ backgroundColor: "#E6E6E6" }}>
          <Tooltip title="close">
            <CancelTwoToneIcon
              onClick={props.onClick}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                paddingTop: 5,
                color: "red",
              }}
            />
          </Tooltip>
        </Box>
      </Grid>
    </Box>
  );
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          overflow: "scroll",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
