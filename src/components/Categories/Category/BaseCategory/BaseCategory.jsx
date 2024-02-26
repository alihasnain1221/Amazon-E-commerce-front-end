import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../../state/actions";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";

const BaseCategory = (props) => {
  const { category } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (category) => {
    if (category.amazonNodeId) {
      dispatch(getCategories(category.amazonNodeId));
      navigate(`/`);
    }
  };
  return (
    <>
      <Card className={classes.root} onClick={() => handleClick(category)}>
        {/* <CardMedia
          className={classes.media}
          image={category.thumbnail || questionMarkIcon}
          title={category.title}
          alt="Category Image"
        /> */}
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom noWrap>
              {category.name}
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

export default BaseCategory;
