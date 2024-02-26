import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../state/actions";
import useStyles from "./styles";

const NodesUpdateModal = (props) => {
  const { handleClose, node } = props;
  const [updatedNode, setUpdatedNode] = useState(node || {});
  const [inputs, setInputs] = useState({
    name: node?.name || "",
    domain: node?.domain || "",
    amazonNodeId: node?.amazonNodeId || "",
    nodeId: node?.nodeId || "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const onHandleSave = () => {
    dispatch(updateCategory(updatedNode));
    handleClose();
  };

  const handleInputChange = (e, fieldKey) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldKey]: e.target.value,
    }));
    setUpdatedNode((prevNode) => ({
      ...prevNode,
      [fieldKey]: e.target.value,
    }));
  };

  const fieldData = [
    {
      label: "Name",
      itemKey: "name",
    },
    {
      label: "Domain",
      itemKey: "domain",
    },
    {
      label: "Amazon Node ID",
      itemKey: "amazonNodeId",
    },
    {
      label: "Node ID",
      itemKey: "nodeId",
    },
  ];

  return (
    <>
      <Dialog
        open={!!updatedNode}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Node</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the node as per your own demand!
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
              <TextField
                margin="dense"
                value={inputs[field.itemKey]}
                variant="standard"
                onChange={(e) => handleInputChange(e, field.itemKey)}
              />
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

export default NodesUpdateModal;
