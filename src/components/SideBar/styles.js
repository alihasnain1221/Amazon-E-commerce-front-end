import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  sideBar: {
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
    height: "100%",
    position: "sticky",
    top: "var(--top-navbar-height)",
  },
  sideBarIconWrapper: {
    padding: "20px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--primary-color)",
      borderRadius: "20px",
    },
  },
  sideBarIcon: {
    width: "20px",
    height: "20px",
  },
}));
