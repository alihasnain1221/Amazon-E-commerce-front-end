import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCategories,
  toastMessage,
  updateCartQuantity,
} from "../../state/actions";
import { getPriceFormat } from "../../utils";
import Product from "./Product/Product";
import useStyles from "./styles";

const Products = () => {
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const { products, categoryId, searchTerm, productsAvailable, pageScrapped } =
    useSelector((state) => state.products);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the distance between the bottom of the page and the current scroll position
      const distanceFromBottom =
        document.documentElement.offsetHeight -
        (window.innerHeight + window.scrollY);

      // Adjust the threshold value according to your needs
      if (distanceFromBottom < 100 && !loading && productsAvailable) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const fetchData = () => {
    if (categoryId) {
      dispatch(getCategories(categoryId, pageScrapped));
    } else if (searchTerm) {
      dispatch(getCategories(searchTerm, pageScrapped));
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      return dispatch(toastMessage("Login to add products to cart!"));
    }

    const alreadyExists = cart.findIndex(
      (cart) => cart.productId === product.product_id
    );

    if (alreadyExists === -1) {
      const productToSave = {
        productId: product.product_id,
        name: product.title,
        price: getPriceFormat(product.price),
        quantity: 1,
        userId: user.id,
        imageLink: product.thumbnail,
      };
      dispatch(addToCart(productToSave));
    } else {
      dispatch(
        updateCartQuantity(
          cart[alreadyExists],
          cart[alreadyExists].quantity + 1
        )
      );
    }
  };

  return (
    <>
      {products && products.length > 0 && (
        <main className={classes.content}>
          <Typography align="center" variant="h4">
            Recommended Products
          </Typography>
          <div className={classes.toolbar} />
          <Grid container justifyContent="center" spacing={4}>
            {products.map((product, index) => (
              <Grid
                item
                key={`${product.product_id}${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Product product={product} handleAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        </main>
      )}
    </>
  );
};

export default Products;
