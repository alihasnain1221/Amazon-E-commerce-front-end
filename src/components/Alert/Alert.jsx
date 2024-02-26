import { Alert as AlertComponent } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALERT_MODES } from "../../constants/constant";
import { alertMessage } from "../../state/actions";
import useStyles from "./styles";

const Alert = () => {
  const { alert } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (alert.message) {
      setTimeout(() => dispatch(alertMessage()), 2500);
    }
  }, [alert, dispatch]);

  return (
    <>
      {alert?.message && (
        <AlertComponent
          severity={alert.mode || ALERT_MODES.info}
          className={classes.alertBar}
        >
          {alert.message}
        </AlertComponent>
      )}
    </>
  );
};

export default Alert;
