import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  singleStatsContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid var(--border-color)",
    borderRadius: "25px",
    minWidth: "150px",
    padding: "10px",
    background: "linear-gradient(45deg, var(--primary-color), transparent)",
    cursor: "pointer",
    textTransform: "capitalize",
    "&:hover": {
      background: "var(--primary-color)",
    },
  },
}));
