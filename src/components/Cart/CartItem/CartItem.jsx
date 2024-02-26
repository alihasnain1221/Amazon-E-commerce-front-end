import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { updateCartQuantity } from "../../../state/actions";

import {
  formatPriceToShow,
  navigateToProductDetailsPage,
} from "../../../utils";
import useStyles from "./styles";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <Card className={classes.cardContainer}>
        <div onClick={() => navigateToProductDetailsPage(item.productId)}>
          <CardMedia
            className={classes.media}
            image={item.imageLink}
            alt={item.name}
          />
        </div>
        <div className={classes.cardDetails}>
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" className={classes.productName}>
              {item.name}
            </Typography>
            <Typography variant="body2">
              {formatPriceToShow(item.price)}
            </Typography>
          </CardContent>
          <CardActions className={classes.cartActions}>
            <div className={classes.buttons}>
              <Button
                type="button"
                size="small"
                onClick={() =>
                  dispatch(updateCartQuantity(item, item.quantity - 1))
                }
              >
                {" "}
                -{" "}
              </Button>
              <Typography>{item.quantity}</Typography>
              <Button
                type="button"
                size="small"
                onClick={() =>
                  dispatch(updateCartQuantity(item, item.quantity + 1))
                }
              >
                {" "}
                +{" "}
              </Button>
            </div>
            <Button
              variant="contained"
              type="button"
              color="secondary"
              onClick={() => dispatch(updateCartQuantity(item, 0))}
            >
              Remove
            </Button>
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default CartItem;
