import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { AddShoppingCart, GradeRounded } from "@material-ui/icons";
import React from "react";
import questionMarkIcon from "../../../assets/questionMark.png";
import {
  formatNumberWithUnits,
  navigateToProductDetailsPage,
} from "../../../utils";
import useStyles from "./styles";

const Product = (props) => {
  const { product, handleAddToCart } = props;
  const classes = useStyles();

  const ratings = product.rating?.rating
    .split(" ")
    .filter((f) => f.match(/(\d+)/));

  return (
    <>
      <Card
        className={classes.root}
        onClick={() => navigateToProductDetailsPage(product.product_id)}
      >
        <CardMedia
          className={classes.media}
          image={product.thumbnail || questionMarkIcon}
          title={product.title}
          alt="Product Image"
        />
        <div className={classes.cardContentWrapper}>
          <CardContent>
            <div className={classes.cardContent}>
              <div className={classes.description}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  title={product.title}
                  style={{ minWidth: "100%", whiteSpace: "break-spaces" }}
                  className={`ellipsis ${classes.cardDetails}`}
                >
                  {product.title}
                </Typography>
              </div>
              <div className={classes.price}>
                <Typography variant="h5">
                  {/* {product.price.replace(/[a-z][A-Z]/gi, '')} */}
                  {product.price}
                </Typography>
                {/* <Typography
                  style={{ textDecoration: "line-through" }}
                  variant="subtitle1"
                > */}
                {/* {product.price.replace(/[a-z][A-Z]/gi, '')} */}
                {/* {product.price_raw}
                </Typography> */}
              </div>
            </div>
            {/* <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body2"
            color="textSecondary"
          /> */}
          </CardContent>
          <CardActions disableSpacing className={classes.cardActions}>
            <div className={classes.ratings}>
              {ratings && ratings.length > 0 && (
                <>
                  <IconButton
                    aria-label="Ratings"
                    style={{ color: "gold" }}
                  >
                    <GradeRounded />
                  </IconButton>
                  <Typography variant="h5">
                    {ratings[0]} / {ratings[1] || "5"} (
                    {formatNumberWithUnits(product.rating?.total_ratings)})
                  </Typography>
                </>
              )}
            </div>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product);
              }}
              aria-label="Add to Cart"
            >
              <AddShoppingCart color="yellow" />
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default Product;
