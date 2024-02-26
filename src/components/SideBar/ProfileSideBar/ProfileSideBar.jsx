import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeIcon from "../../../assets/close.png";
import logo from "../../../assets/commerce.png";
import userIcon from "../../../assets/user-1.png";
import { USER_MODAL } from "../../../constants/constant";
import {
  getUserById,
  updateUser as updateUserAction,
} from "../../../state/actions";
import { profileSideBar } from "../../../state/actions/general";
import { ecommerceLocalStorage } from "../../../utils";
import useStyles from "./styles";

const ProfileSideBar = () => {
  const [isSelf, setIsSelf] = useState(false);
  const classes = useStyles();
  const { profileSideBar: user } = useSelector((state) => state.general);
  const [updateUser, setUpdateUser] = useState(USER_MODAL);
  const dispatch = useDispatch();

  useEffect(() => {
    const selfId = ecommerceLocalStorage.get("userId");
    if (user && selfId === user.id) {
      setIsSelf(true);
      setUpdateUser(user);
    } else {
      setIsSelf(false);
    }
  }, [user]);

  if (!user) return;

  const FieldsToShow = [
    {
      itemKey: "username",
      label: "Username",
    },
    {
      itemKey: "address",
      label: "Address",
    },
    {
      itemKey: "email",
      label: "Email",
      disabled: true,
    },
    {
      itemKey: "phone",
      label: "Phone",
      disabled: true,
    },
  ];

  return (
    <>
      <div className={classes.rightSideBarWrapper}>
        <IconButton
          aria-label="profile"
          color="inherit"
          className={classes.closeBtn}
          onClick={() => dispatch(profileSideBar())}
        >
          <img src={closeIcon} className={`imgTag`} alt="close" />
        </IconButton>
        <div className={classes.profileImage}>
          <img src={userIcon} className="imgTag" alt="profile" />
        </div>
        <div className={classes.formWrapper}>
          <div>
            <Typography
              variant="h5"
              component="h5"
              className={classes.formTitle}
            >
              Personal Info
            </Typography>
            <div className={classes.form}>
              {FieldsToShow.map((field) => (
                <div className={classes.formContainer} key={field.itemKey}>
                  <Typography
                    variant="body2"
                    component="body2"
                    className={classes.label}
                  >
                    {field.label}:
                  </Typography>
                  <TextField
                    id="standard-read-only-input"
                    value={
                      isSelf ? updateUser[field.itemKey] : user[field.itemKey]
                    }
                    disabled={field.disabled || !isSelf}
                    variant="standard"
                    onChange={(e) =>
                      isSelf &&
                      setUpdateUser({
                        ...updateUser,
                        [field.itemKey]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>
            {isSelf && (
              <div className={classes.saveBtnContainer}>
                <Button
                  variant="text"
                  color="primary"
                  size="medium"
                  onClick={async () => {
                    if (updateUser.id) {
                      await dispatch(updateUserAction(updateUser));
                      const userId = ecommerceLocalStorage.get("userId");
                      dispatch(getUserById(userId));
                    }
                  }}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <div className={classes.footer}>
            <Typography
              variant="caption"
              component="caption"
              className="fw-bold"
            >
              Powered by
            </Typography>
            <div className={classes.footerLogo}>
              <img src={logo} className="imgTag" alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSideBar;
