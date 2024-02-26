import axios from "axios";
import { ALERT_MODES } from "../../constants/constant";
import ACTIONS, { ADMIN_MAIN_PATH } from "../../constants/storeConstants";
import { alertMessage, loading } from "./general";

export const getCartItems = (userId) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const options = {
      params: {
        userId,
      },
    };
    const cartRes = await axios.get(
      ADMIN_MAIN_PATH + "Cart/getUserCart/",
      options
    );

    dispatch(loading(false));
    return dispatch({ type: ACTIONS.GET_CART_ITEMS, payload: cartRes.data });
  } catch (error) {
    console.log(error);
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
  }
};

export const addToCart = (productToSave) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const options = await axios.post(ADMIN_MAIN_PATH + "Cart/", productToSave);
    dispatch(loading(false));
    return dispatch({ type: ACTIONS.ADD_TO_CART, payload: options.data });
  } catch (error) {
    console.log(error);
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
  }
};

export const updateCartQuantity = (product, quantity) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const productToSave = {
      ...product,
      quantity,
    };

    const res = await axios.put(ADMIN_MAIN_PATH + "Cart/", productToSave);
    dispatch(loading(false));
    if (res.data.quantity === 0) {
      return dispatch({
        type: ACTIONS.REMOVE_FROM_CART,
        payload: res.data,
      });
    }
    return dispatch({
      type: ACTIONS.UPDATE_CART_QUANTITY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
  }
};

export const emptyCart = (userId) => async (dispatch) => {
  try {
    dispatch(loading(true));
    await axios.delete(
      ADMIN_MAIN_PATH + "Cart/removeProductsFromUser/" + userId
    );
    dispatch(loading(false));
    return dispatch({ type: ACTIONS.EMPTY_CART });
  } catch (error) {
    console.log(error);
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
  }
};
