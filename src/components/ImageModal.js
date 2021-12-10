import { Box, CardMedia, makeStyles, Modal, Tooltip } from "@material-ui/core";
import React from "react";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    bodyModal: {
      height: "auto",
    //   width: "auto",
      position: "absolute",
      border: "1px solid lightgray",
    },
    imageContainer: {},
  };
});

export default function ImageModal(props) {
  const classes = useStyle();
  const { open, onClose, dataList } = props;

  const body = (
    <Box className={classes.bodyModal}>
      <Box style={{ display: "flex" }}>
        <Box className={classes.imageContainer}>
          <CardMedia
            component="img"
            src={
              !!dataList.audit_pic_crop
                ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                : noImage
            }
            className={classes.image}
          />
        </Box>
        <Box>
          <CardMedia
            component="img"
            src={
              !!dataList.audit_pic_crop
                ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                : noImage
            }
            className={classes.image}
          />
        </Box>
        <Box style={{backgroundColor:'#E6E6E6'}}>
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
      </Box>
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
