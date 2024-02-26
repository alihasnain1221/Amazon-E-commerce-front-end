import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCart } from "../../state/actions";
import { addNewOrder } from "../../state/actions/orders";
import { formatPriceToShow } from "../../utils";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let totalPayableAmount = 0;
    cart.forEach(
      (product) => (totalPayableAmount += product.price * product.quantity)
    );
    setTotalAmount(totalPayableAmount);
  }, [cart]);

  const handleAddOrder = async () => {
    const newOrder = [...cart];
    dispatch(addNewOrder(newOrder, user.id));
  };

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart.
      <Link to="/" className={classes.link}>
        Start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {formatPriceToShow(totalAmount)}
        </Typography>
      </div>
      <div className={classes.bottomButtons}>
        <Button
          onClick={() => dispatch(emptyCart(user.id))}
          className={classes.emptyButton}
          size="large"
          type="button"
          variant="contained"
          color="secondary"
        >
          Empty Cart
        </Button>
        <Button
          className={classes.checkoutButton}
          size="large"
          type="button"
          variant="contained"
          color="primary"
          onClick={handleAddOrder}
        >
          Check out
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Container>
        <div className={classes.toolbar} />
        <Typography variant="h3" className={classes.title} gutterBottom>
          Your Shopping Cart
        </Typography>
        {cart.length ? <FilledCart /> : <EmptyCart />}
      </Container>
    </>
  );
};

export default Cart;
