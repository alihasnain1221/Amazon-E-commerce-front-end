import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  cardContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
  },
  media: {
    height: 260,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartActions: {
    justifyContent: "space-between",
    backgroundColor: "var(--border-color)",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
  productName: {
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    lineClamp: "4",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  cardDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: "1",
  },
}));
