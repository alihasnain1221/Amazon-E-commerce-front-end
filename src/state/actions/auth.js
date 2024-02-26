import axios from "axios";
import { ALERT_MODES, ROLES } from "../../constants/constant";
import ACTIONS, {
  ADMIN_MAIN_PATH,
  CLIENT_PATH,
  ERROR_MESSAGES,
} from "../../constants/storeConstants";
import { ecommerceLocalStorage, ecommerceSessionStorage } from "../../utils";
import { getCartItems } from "./cart";
import { alertMessage, loading, toastMessage } from "./general";
import { getAllOrders } from "./orders";
import { getAllUsers } from "./users";

const path = CLIENT_PATH;

export const getUser = (userData) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const options = {
      params: {
        email: userData.email,
        password: userData.password,
      },
    };
    const link = `${path}getUserByEmailPass`;
    const res = await axios.get(link, options);
    const user = res.data.user;
    if (user) {
      ecommerceLocalStorage.saveAs("token", res.data.token);
      ecommerceLocalStorage.saveAs("userId", user.id);
      dispatch(getCartItems(user.id));
      dispatch({
        type: ACTIONS.GET_USER_ORDERS,
        payload: res.data.orders,
      });

      if (user.role === ROLES.admin) {
        dispatch(getAllOrders());
        dispatch(getAllUsers());
      }

      dispatch(toastMessage("Loggedin Successfully!"));
      dispatch(loading(false));
      return dispatch({
        type: ACTIONS.GET_USER,
        payload: user,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(toastMessage(error.response?.data || ERROR_MESSAGES.serverDown));
    dispatch(loading(false));
  }
};

export const getUserById = (userId) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const link = `${path + userId}`;
    const res = await axios.get(link);
    const user = res.data;
    dispatch(loading(false));
    if (user) {
      dispatch(getCartItems(user.id));

      const options = {
        params: {
          userId: user.id,
        },
      };
      const orderRes = await axios.get(
        `${ADMIN_MAIN_PATH}Orders/GetUserOrders`,
        options
      );
      dispatch({
        type: ACTIONS.GET_USER_ORDERS,
        payload: orderRes.data,
      });

      if (user.role === ROLES.admin) {
        dispatch(getAllOrders());
        dispatch(getAllUsers());
      }

      return dispatch({
        type: ACTIONS.GET_USER,
        payload: user,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(toastMessage(error.response?.data || ERROR_MESSAGES.serverDown));
    dispatch(loading(false));
  }
};

export const getUserByEmailPhone = (email, phone) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const link = path + "getUserByEmailPhone/";
    const options = {
      params: {
        email,
        phone,
      },
    };
    const res = await axios.get(link, options);
    ecommerceSessionStorage.saveAs("forgottenUser", res.data.user);
    ecommerceSessionStorage.saveAs("token", res.data.token);
    dispatch(alertMessage("", ALERT_MODES.info));
    dispatch(loading(false));
  } catch (error) {
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
    console.log(error);
  }
};

export const updateUser = (user, newToken) => async (dispatch) => {
  try {
    dispatch(loading(true));
    if (!Object.keys(user).includes("password"))
      Object.assign(user, {
        password: "",
      });

    const token = newToken || ecommerceLocalStorage.get("token");
    if (user.id) {
      const options = {
        ...user,
      };
      await axios.put(path + user.id, options, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
    }
    dispatch(loading(false));
  } catch (error) {
    console.log(error);
    dispatch(toastMessage(error.response?.data || ERROR_MESSAGES.serverDown));
    dispatch(loading(false));
  }
};

export const addNewUser = (userData) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const newUser = {
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      username: userData.username,
      address: userData?.address || "",
      role: userData?.role || ROLES.user,
    };
    const res = await axios.post(path, newUser);
    dispatch(
      alertMessage(
        "Your account has been created Successfully!",
        ALERT_MODES.success
      )
    );
    dispatch(loading(false));
    return dispatch({
      type: ACTIONS.ADD_USER,
      payload: res,
    });
  } catch (error) {
    console.log(error);
    dispatch(
      alertMessage(
        error.response?.data || ERROR_MESSAGES.serverDown,
        ALERT_MODES.error
      )
    );
    dispatch(loading(false));
  }
};

export const logoutUser = (message) => async (dispatch) => {
  dispatch(loading(true));
  ecommerceLocalStorage.clear();
  dispatch(
    alertMessage(message || "Logged out successfully!", ALERT_MODES.success)
  );
  dispatch(loading(false));
  setTimeout(() => {
    window.location.reload(false);
    window.location.href = "/";
  }, 2000);
};
