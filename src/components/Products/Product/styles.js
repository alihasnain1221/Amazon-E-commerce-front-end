import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "30px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    "&:hover": {
      transform: `scale(1.1)`,
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "var(--border-color)"
  },
  ratings: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardContentWrapper: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  description: {
    flexGrow: "1",
  },
  price: {
    textAlign: "end",
  },
  cardDetails: {
    display: "-webkit-box",
    "-webkit-line-clamp": "7",
    lineClamp: "7",
    "-webkit-box-orient": "vertical",
  },
}));
