import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  wrapperContainer: {
    width: "75%",
    textAlignLast: "center",
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
    padding: "15px",
  },
  graphContainer: {
    width: "100%",
    height: "80vh",
  },
}));
