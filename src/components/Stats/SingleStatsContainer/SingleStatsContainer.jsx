import { Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";

const SingleStatsContainer = (props) => {
  const { label, quantity, amount } = props;
  const classes = useStyles();
  return (
    <div className={classes.singleStatsContainer}>
      <Typography variant="h6" component="h6">
        {label}
      </Typography>
      <hr />
      <Typography variant="subtitle1" component="span">
        {quantity}
      </Typography>
      <Typography variant="subtitle1" component="span">
        {amount}
      </Typography>
    </div>
  );
};

export default SingleStatsContainer;
