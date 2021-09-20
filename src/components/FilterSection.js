import { Container, makeStyles, MenuItem, Paper, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    textField: {
      width: 150,
    },
  };
});

export default function FilterSection() {
  const classes = useStyles();
  const [state, setState] = useState("");

  useEffect(() => {}, []);
  return (
    <div>
      <Paper style={{height:'100px'}}>
        <TextField
          className={classes.textField}
          select
          name="dateSelect"
          label="เลือกวันที่"
          value={""}
        />
      </Paper>
    </div>
  );
}
