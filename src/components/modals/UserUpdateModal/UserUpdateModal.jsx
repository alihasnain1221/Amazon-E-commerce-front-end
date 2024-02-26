import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../state/actions";
import useStyles from "./styles";
import { ROLES } from "../../../constants/constant";

const UserUpdateModal = (props) => {
  const { handleClose, user } = props;
  const [updatedUser, setUpdatedUser] = useState(user || {});
  const [inputs, setInputs] = useState({
    username: user?.username || "",
    role: user?.role || "",
    address: user?.address || "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const onHandleSave = async () => {
    let userToUpdateObj = { ...updatedUser };
    delete userToUpdateObj.password;
    await dispatch(updateUser(userToUpdateObj));
    handleClose(true);
  };

  const handleInputChange = (e, fieldKey) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldKey]: e.target.value,
    }));
    setUpdatedUser((prevData) => ({
      ...prevData,
      [fieldKey]: e.target.value,
    }));
  };

  const fieldData = [
    {
      label: "Username",
      itemKey: "username",
    },
    {
      label: "Role",
      itemKey: "role",
      inputType: "dropdown",
      dropdownOptions: Object.values(ROLES).map((role) => {
        return { label: role, value: role };
      }),
    },
    {
      label: "Address",
      itemKey: "address",
    },
  ];

  console.log({ updatedUser });

  return (
    <>
      <Dialog
        open={!!updatedUser}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the user as per your own demand!
          </DialogContentText>
          {fieldData.map((field, index) => (
            <div key={index} className={classes.formContainer}>
              <Typography
                variant="body2"
                component="body2"
                className={classes.label}
              >
                {field.label}:
              </Typography>
              {field.inputType === "dropdown" ? (
                <Select
                  labelId="select-user-role-label"
                  id="select-user-role"
                  className="update-user-select-dropdown"
                  value={inputs[field.itemKey]}
                  onChange={(e) => handleInputChange(e, field.itemKey)}
                >
                  {field.dropdownOptions.map((opt) => (
                    <MenuItem value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              ) : (
                <TextField
                  margin="dense"
                  value={inputs[field.itemKey]}
                  variant="standard"
                  onChange={(e) => handleInputChange(e, field.itemKey)}
                />
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onHandleSave}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserUpdateModal;
