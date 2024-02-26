import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  bodyWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
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
  banner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  bannerImage: {
    width: "100vw",
    height: "75vh",
    borderRadius: theme.spacing(1),
  },
}));
