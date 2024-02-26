import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  rightSideBarWrapper: {
    top: "var(--top-navbar-height)",
    right: "0",
    width: "33%",
    height: "calc(100vh - var(--top-navbar-height))",
    display: "flex",
    rowGap: "15px",
    position: "fixed",
    background: "transparent",
    opacity: "1",
    flexDirection: "column",
    border: "1px solid var(--border-color)",
    backdropFilter: "blur(10px)",
  },
  closeBtn: {
    position: "absolute !important",
    right: "20px",
    top: "20px",
    width: "40px !important",
    height: "40px !important",
    cursor: "pointer",
  },
  profileImage: {
    width: "30%",
    alignSelf: "center",
    margin: "30px",
  },
  formWrapper: {
    padding: "20px",
    paddingTop: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: "1",
  },
  formTitle: {
    textDecoration: "underline",
    marginBottom: "20px !important",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  label: {
    fontWeight: "800 !important",
    textTransform: "capitalize",
  },
  formContainer: {
    display: "flex",
    columnGap: "10px",
    alignItems: "center",
    justifyContent: "space-around",
  },
  saveBtnContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "15px",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "5px",
    marginBottom: "15px",
  },
  footerLogo: {
    width: "10%",
    height: "100%",
  },
}));
