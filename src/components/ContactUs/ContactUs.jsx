import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { alertMessage, contactUs } from "../../state/actions/general";
import { ALERT_MODES } from "../../constants/constant";
import contactUsImg from "../../assets/contactUs.jpg";

const ContactUs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("contact us", { e });
    if (name === "" || email === "" || message === "") {
      dispatch(
        alertMessage(
          "All 3 of the fields shouldn't be empty!",
          ALERT_MODES.error
        )
      );
      return;
    }
    dispatch(contactUs(name, email, message));
    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <Container maxWidth="sm" className={classes.mainConatiner}>
      <img
        src={contactUsImg}
        alt="Contact Us Header"
        className={classes.headerImage}
      />
      <div className={classes.contactInfoContainer}>
        <Typography variant="h5" gutterBottom color="primary">
          Contact Information
        </Typography>
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            id="name"
            required
            fullWidth
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            id="email"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            label="Message"
            variant="outlined"
            id="message"
            required
            multiline
            rows={4}
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ContactUs;
