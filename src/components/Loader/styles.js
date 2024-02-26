import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  loaderWrapper: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1000000000000",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loader: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  logo: {
    height: "200px",
    width: "200px",
  },
}));
