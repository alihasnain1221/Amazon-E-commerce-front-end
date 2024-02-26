import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  headerImage: {
    width: "100%",
    height: "auto",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  contactInfoContainer: {
    background: "#f8f8f8", // Replace with your desired background color
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  contactInfoItem: {
    marginBottom: theme.spacing(2),
  },
  mainConatiner: {
    display: "flex !important",
    flexDirection: "column",
    height: "90vh",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
}));
