import { makeStyles } from "@material-ui/core";
import React from "react";

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "inline-block",
      borderRadius: "50%",
      flexGrow: 0,
      flexShrink: 0,
      color:'red'
    },    
  }));


export default function StatusBullet(props) {
  // const { datalist } = props;

  const classes = useStyles();
  return (
    <span className={classes.root} ></span>
  );
}

StatusBullet.defaultProps = {
  size: "md",
  color: "default",
};
