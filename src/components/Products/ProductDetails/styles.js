import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    display: "flex",
    padding: "10px",
  },
  carouselItem: {
    maxHeight: "400px",
    padding: "5px",
    boxSizing: "border-box",
  },
  carouselItemImg: {
    width: "100%",
    height: "100%",
  },
  table: {
    width: "50vw !important",
    margin: "0 auto",
  },
  cartActions: {
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
  aboutProduct: {
    maxWidth: "100%",
    padding: "20px",
  },
  productDescription: {
    padding: "20px",
  },
}));
