import { makeStyles } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "inline-block",
      borderRadius: "50%",
      flexGrow: 0,
      flexShrink: 0,
    },
    sm: {
      height: 15,
      width: 15,
    },
    md: {
      height: 15,
      width: 15,
    },
    lg: {
      height: 15,
      width: 15,
    },
    neutral: { backgroundColor: "#fff" },
    primary: { backgroundColor: "#ccc" },
    info: { backgroundColor: "#3cc" },
    warning: { backgroundColor: "#cc3" },
    danger: { backgroundColor: "#c33" },
    success: { backgroundColor: "#3c3" },
  }));
});

export default function StatusBullet(props) {
  const { className, size, color, ...rest } = props;

  const classes = useStyles();
  return (
    <span
      {...rest}
      className={clsx(
        {
          [classes.root]: true,
          [classes[size]]: size,
          [classes[color]]: color,
        },
        className
      )}
    />
  );
}

StatusBullet.defaultProps = {
  size: "md",
  color: "default",
};
