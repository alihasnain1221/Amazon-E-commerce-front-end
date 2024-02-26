import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#2196f3", // Customize the color of the app bar here
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
  image: {
    // width: "100%",
    height: "60vh",
  },
  content: {
    padding: theme.spacing(2),
    width: "60%",
    marginInline: "auto",
  },
}));
