import { Container, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    filterSection: {},
    cardSection: {},
    tableSection: {},
  };
});
export default function Pk3Display() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h6">Pk3Display</Typography>
      <Paper className={classes.cardSection}></Paper>
    </Container>
  );
}
