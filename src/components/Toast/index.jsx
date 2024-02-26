import { Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastMessage } from "../../state/actions";

const Toast = () => {
  const { toast } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  const handleClearToast = () => {
    dispatch(toastMessage(""));
  };
  return (
    <>
      {toast && (
        <Snackbar
          open={toast.length > 0}
          autoHideDuration={3000}
          onClose={() => handleClearToast()}
          message={toast}
        />
      )}
    </>
  );
};

export default Toast;
