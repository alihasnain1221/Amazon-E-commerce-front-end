import axios from "axios";
import { ALERT_MODES } from "../../constants/constant";
import ACTIONS, { ADMIN_MAIN_PATH } from "../../constants/storeConstants";
import { emptyCart } from "./cart";
import { alertMessage, loading } from "./general";

export const addNewOrder =
  (products = [], userId) =>
  async (dispatch) => {
    if (!products || products.length === 0) return;
    try {
      dispatch(loading(true));
      const productsArr = [];
      for (let i = 0; i < products.length; i++) {
        productsArr.push({
          asin: products[i].productId,
          imageUrl: products[i].imageLink,
          name: products[i].name,
          quantity: products[i].quantity,
        });
      }
      const objToSend = {
        userId,
        products: productsArr,
      };
      const res = await axios.post(ADMIN_MAIN_PATH + "Orders/", objToSend);
      await dispatch(emptyCart(userId));
      dispatch(loading(false));
      await dispatch(
        alertMessage(
          "Congratulations! Your order have been placed successfully.",
          ALERT_MODES.success
        )
      );
      return dispatch({ type: ACTIONS.ADD_NEW_ORDER, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch(alertMessage(error.message, ALERT_MODES.error));
      dispatch(loading(false));
    }
  };

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.get(ADMIN_MAIN_PATH + "Orders/");
    dispatch(loading(false));
    return dispatch({ type: ACTIONS.GET_MANAGEABLE_ORDERS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
  }
};

export const updateOrder = (order) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const updatedOrder = {
      products: order.products,
      userId: order.user.id,
      status: order.status,
      createdAt: order.createdAt,
    };

    const options = {
      ...updatedOrder,
    };
    const res = await axios.put(
      ADMIN_MAIN_PATH + "Orders/" + order.id,
      options
    );
    dispatch(loading(false));
    return dispatch({
      type: ACTIONS.UPDATE_ORDER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
  }
};
