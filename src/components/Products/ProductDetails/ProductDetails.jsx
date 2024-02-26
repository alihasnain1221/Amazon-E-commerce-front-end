import { Button, Card, CardActions, Typography } from "@material-ui/core";
import { Divider, Rating, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  alertMessage,
  getProduct,
  toastMessage,
  updateCartQuantity,
} from "../../../state/actions";

import {
  ALERT_MODES,
  PRODUCT_ADD_DROP_OPTIONS,
} from "../../../constants/constant";
import { getPriceFormat } from "../../../utils";
import useStyles from "./styles";

const ProductDetails = () => {
  const { productDetail: product } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (!product) {
      const productId = params.id;
      dispatch(getProduct(productId));
    }
  }, [product, dispatch, params.id]);

  useEffect(() => {
    if (product && !product.isValid) {
      dispatch(
        alertMessage(
          "Following product is still going through verification progress, please try another product untill then.",
          ALERT_MODES.info
        )
      );
    }
  }, [dispatch, product]);

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category.category_id}`);
  };

  const handleProductAddDrop = (product, action) => {
    if (!user) {
      return dispatch(toastMessage("Please login to continue!"));
    }

    const alreadyExists = cart.findIndex(
      (cart) => cart.productId === product.product_id
    );

    if (!product.isValid) {
      return dispatch(
        alertMessage(
          "Following product is still undergoing verification process.",
          ALERT_MODES.info
        )
      );
    }

    if (alreadyExists === -1 && action === PRODUCT_ADD_DROP_OPTIONS.add) {
      const productToSave = {
        productId: product.product_id,
        name: product.title,
        price: getPriceFormat(product.price),
        quantity: 1,
        userId: user.id,
        imageLink: product.main_image,
      };
      return dispatch(addToCart(productToSave));
    }

    if (alreadyExists === -1) return;

    if (action === PRODUCT_ADD_DROP_OPTIONS.clear) {
      dispatch(updateCartQuantity(cart[alreadyExists], 0));
    } else {
      dispatch(
        updateCartQuantity(
          cart[alreadyExists],
          action === PRODUCT_ADD_DROP_OPTIONS.add
            ? cart[alreadyExists].quantity + 1
            : cart[alreadyExists].quantity - 1
        )
      );
    }
  };

  if (!product) return;

  return (
    <>
      {product && (
        <>
          <div className="d-flex">
            {product.parent_categories.map((category, i) => (
              <>
                <Typography
                  variant="body2"
                  className="px-1 cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </Typography>
                {i < product.parent_categories.length - 1 && (
                  <span>{" > "}</span>
                )}
              </>
            ))}
          </div>
          <div className={classes.root}>
            <div className="w-75 p-10">
              <Typography variant="h6">{product.title}</Typography>
              <div
                className="d-flex justify-content-between p-10"
                style={{ marginTop: "20px" }}
              >
                <div className="d-flex align-items-center">
                  <Rating
                    name="read-only"
                    value={product.rating}
                    readOnly
                    size="medium"
                    precision={0.1}
                  />
                  <Typography component="legend" variant="p">
                    ({product.ratings_total})
                  </Typography>
                </div>
                <div className="a">
                  <Typography variant="subtitle1">
                    Price: {product.price}
                  </Typography>
                </div>
              </div>
              <Divider />
              {product.description && (
                <>
                  <div className={classes.productDescription}>
                    <Typography variant="h6">Product Descriptions:</Typography>
                    <Typography variant="caption">
                      {product.description}
                    </Typography>
                  </div>
                  <Divider />
                </>
              )}
              {product.feature_bullets && (
                <>
                  <div className={classes.aboutProduct}>
                    <Typography variant="h6">About Product:</Typography>
                    <ul>
                      {product.feature_bullets.map((feature) => (
                        <Typography variant="caption" component={"li"}>
                          {feature}
                        </Typography>
                      ))}
                    </ul>
                  </div>
                  <Divider />
                </>
              )}
              <div className="w-100">
                <Typography variant="h6">Product Attributes:</Typography>
                <Table className={classes.table}>
                  <TableBody>
                    {product.attributes?.map((attribute) => (
                      <TableRow>
                        <TableCell>{attribute.name}</TableCell>
                        <TableCell style={{ textAlign: "end" }}>
                          {attribute.value}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>Weight</TableCell>
                      <TableCell style={{ textAlign: "end" }}>
                        {product.weight}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className={`w-25`}>
              {product.images && (
                <AliceCarousel
                  mouseTracking
                  infinite
                  autoPlayInterval={1000}
                  animationDuration={1000}
                  disableButtonsControls
                  autoHeight
                  autoWidth={true}
                  autoPlay
                  controlsStrategy="alternate"
                  disableDotsControls
                  disableSlideInfo={false}
                  responsive={{
                    0: { items: 1 },
                  }}
                >
                  {product.images?.map((img, i) => (
                    <div key={i} className={classes.carouselItem}>
                      <img
                        src={img.link}
                        className={classes.carouselItemImg}
                        alt="Product"
                        onDragStart={(e) => e.preventDefault()}
                        role="presentation"
                      />
                    </div>
                  ))}
                </AliceCarousel>
              )}

              <div className="a">
                <Card>
                  <CardActions className={classes.cartActions}>
                    <div className={classes.buttons}>
                      <Button
                        type="button"
                        size="small"
                        onClick={() =>
                          handleProductAddDrop(
                            product,
                            PRODUCT_ADD_DROP_OPTIONS.drop
                          )
                        }
                      >
                        {" "}
                        -{" "}
                      </Button>
                      <Typography>Add To Cart</Typography>
                      <Button
                        type="button"
                        size="small"
                        onClick={() =>
                          handleProductAddDrop(
                            product,
                            PRODUCT_ADD_DROP_OPTIONS.add
                          )
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
                      onClick={() =>
                        handleProductAddDrop(
                          product,
                          PRODUCT_ADD_DROP_OPTIONS.clear
                        )
                      }
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
