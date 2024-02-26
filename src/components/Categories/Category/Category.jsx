import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import questionMarkIcon from "../../../assets/questionMark.png";
import { getCategories } from "../../../state/actions";
import useStyles from "./styles";

const Category = (props) => {
  const { category } = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClick = (category) => {
    const categoryId = category.link
      .split("?")[1]
      .split("&")
      .find((i) => i.startsWith("node="))
      .split("=")[1];
    dispatch(getCategories(categoryId));
  };
  return (
    <>
      <Card className={classes.root} onClick={() => handleClick(category)}>
        <CardMedia
          className={classes.media}
          image={category.thumbnail || questionMarkIcon}
          title={category.title}
          alt="Category Image"
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom noWrap>
              {category.title}
            </Typography>
            {/* <Typography variant="h5">
                    {product.price.formatted_with_symbol}
                </Typography> */}
          </div>
          {/* <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" /> */}
        </CardContent>
        {/* <CardActions disableSpacing className={classes.cardActions}>
            <IconButton onClick={() => dispatch(addToCart(product.id))} aria-label="Add to Cart">
                <AddShoppingCart />
            </IconButton>
        </CardActions> */}
      </Card>
    </>
  );
};

export default Category;
