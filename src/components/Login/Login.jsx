import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../assets/commerce.png";
import {
  ALERT_MODES,
  INPUT_FIELDS,
  INPUT_FIELDS_TO_SHOW,
  ROLES,
  SIGN_UP_FORMS,
  SIGN_UP_FORMS_DATA,
} from "../../constants/constant";
import {
  addNewUser,
  alertMessage,
  getUser,
  getUserByEmailPhone,
  updateUser,
} from "../../state/actions";
import { ecommerceSessionStorage } from "../../utils";
import useStyles from "./styles";

const LoginPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [fieldsToShowArr, setFieldsToShowArr] = useState(
    INPUT_FIELDS_TO_SHOW.login || []
  );
  const [visibleForm, setVisibleForm] = useState(SIGN_UP_FORMS.login || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      if (user.role === ROLES.admin) {
        navigate("/admin");
      } else {
        navigate("/categories");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (visibleForm) {
      setFieldsToShowArr(INPUT_FIELDS_TO_SHOW[visibleForm]);
    }
  }, [visibleForm]);

  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address.");
    return isValid;
  };

  const validateUsername = () => {
    const isValid = username.length >= 4;
    setUsernameError(isValid ? "" : "Username must be at least 4 characters.");
    return isValid;
  };

  const validatePhone = () => {
    const isValid = phone.length >= 6;
    setPhoneError(
      isValid ? "" : "Contact number must be at least 6 characters."
    );
    return isValid;
  };

  const validatePassword = () => {
    const isValid = password.length >= 4;
    setPasswordError(isValid ? "" : "Password must be at least 4 characters.");
    return isValid;
  };

  const validateConfirmPassword = () => {
    const isValid = confirmPassword === password;
    setConfirmPasswordError(isValid ? "" : "Passwords do not match.");
    return isValid;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setPhoneError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const handleFormSwitch = () => {
    if (visibleForm === SIGN_UP_FORMS.login) {
      setVisibleForm(SIGN_UP_FORMS.signup);
    } else {
      setVisibleForm(SIGN_UP_FORMS.login);
    }
  };

  const FieldsData = {
    [INPUT_FIELDS.email]: {
      id: "email",
      label: "Email Address",
      value: email,
      onChange: handleEmailChange,
      helperText: emailError,
      validate: validateEmail,
    },
    [INPUT_FIELDS.username]: {
      id: "username",
      label: "Username",
      value: username,
      onChange: handleUsernameChange,
      helperText: usernameError,
      validate: validateUsername,
    },
    [INPUT_FIELDS.phone]: {
      id: "phone",
      label: "Phone",
      value: phone,
      onChange: handlePhoneChange,
      helperText: phoneError,
      validate: validatePhone,
    },
    [INPUT_FIELDS.password]: {
      id: "password",
      label: "Password",
      value: password,
      onChange: handlePasswordChange,
      helperText: passwordError,
      validate: validatePassword,
    },
    [INPUT_FIELDS.confirmPassword]: {
      id: "confirmPassword",
      label: "ConfirmPassword",
      value: confirmPassword,
      onChange: handleConfirmPasswordChange,
      helperText: confirmPasswordError,
      validate: validateConfirmPassword,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isDataValid = true;

    fieldsToShowArr.forEach(
      (field) => isDataValid && (isDataValid = FieldsData[field].validate())
    );

    if (!isDataValid) return;

    switch (visibleForm) {
      case SIGN_UP_FORMS.signup:
        dispatch(
          addNewUser({
            email,
            password,
            phone,
            username,
            role: ROLES.user,
          })
        );
        break;

      case SIGN_UP_FORMS.login:
        dispatch(getUser({ email, password }));
        break;

      case SIGN_UP_FORMS.findAccount:
        dispatch(getUserByEmailPhone(email, phone));
        setVisibleForm(SIGN_UP_FORMS.resetPassword);
        break;

      case SIGN_UP_FORMS.resetPassword:
        const updatedUser = ecommerceSessionStorage.get("forgottenUser");
        const token = ecommerceSessionStorage.get("token");
        Object.assign(updatedUser, {
          password,
        });
        dispatch(updateUser(updatedUser, token));
        ecommerceSessionStorage.clear();
        dispatch(
          alertMessage(
            "User password updated successfully!",
            ALERT_MODES.success
          )
        );
        setVisibleForm(SIGN_UP_FORMS.login);
        break;

      default:
        break;
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      {/* <Grid item xs={false} sm={4} md={7}>
        <div className={classes.leftContainer}>
          <div className={classes.logoContainer}>
            <img
              src={logoIcon}
              alt="Logo"
              className={`logo-animation ${classes.leftContainerLogo}`}
            />
          </div>
          <Typography component="h5" variant="h5">
            Commerce Js
          </Typography>
        </div>
      </Grid> */}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {SIGN_UP_FORMS_DATA[visibleForm].title}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {fieldsToShowArr.map((field, i) => {
              const data = FieldsData[field];
              return (
                <TextField
                  key={i}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id={data.id + Math.random()}
                  label={data.label}
                  name={data.id + Math.random()}
                  autoComplete={data.id}
                  // autoFocus
                  value={data.value}
                  onChange={data.onChange}
                  error={Boolean(data.helperText)}
                  helperText={data.helperText}
                  onBlur={data.validate}
                />
              );
            })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {SIGN_UP_FORMS_DATA[visibleForm].buttonLabel}
            </Button>
            <Grid container>
              <Grid item xs className={classes.bottomGrid}>
                <Button onClick={handleFormSwitch}>
                  {visibleForm === SIGN_UP_FORMS.signup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </Button>
                <Button
                  onClick={() => {
                    setVisibleForm(SIGN_UP_FORMS.findAccount);
                  }}
                >
                  Forgot Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
