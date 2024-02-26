import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    minHeight: "170px",
  },
  leftContainerLogo: {
    width: "150px",
    height: "150px",
  },
  image: {
    backgroundImage:
      "url(https://unblast.com/wp-content/uploads/2020/04/Online-Shopping-Illustration.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
    backgroundColor: "#d4325a",
    fontSize: "medium",
    borderRadius: "10px",
    '&:hover': {
      backgroundColor: "#ff6087",
    }
  },
  bottomGrid: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
