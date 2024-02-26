import { ALERT_MODES } from "../../constants/constant";
import ACTIONS, { SERVER_URLS } from "../../constants/storeConstants";
import axios from "axios";

export const toastMessage = (message) => async (dispatch) =>
  dispatch({
    type: ACTIONS.SHOW_TOAST,
    payload: message,
  });

export const loading = (visible) => async (dispatch) =>
  dispatch({
    type: ACTIONS.LOADING,
    payload: visible,
  });

export const alertMessage =
  (message = "", mode = "") =>
  async (dispatch) => {
    dispatch({
      type: ACTIONS.ALERT_MESSAGE,
      payload: {
        message,
        mode,
      },
    });
  };

export const profileSideBar = (user) => async (dispatch) =>
  dispatch({
    type: ACTIONS.PROFILE_SIDEBAR,
    payload: user || null,
  });

export const contactUs = (name, email, message) => async (dispatch) => {
  try {
    await axios.post(
      SERVER_URLS.generals + "/contactUs?name=" + name + "&email=" + email + "&message=" + message );
    dispatch(alertMessage("Message sent successfully.", ALERT_MODES.success));
  } catch (error) {
    console.log(error);
  }
};
