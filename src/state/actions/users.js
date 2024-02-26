import axios from "axios";
import { ALERT_MODES } from "../../constants/constant";
import ACTIONS, { CLIENT_PATH } from "../../constants/storeConstants";
import { alertMessage, loading } from "./general";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const usersRes = await axios.get(CLIENT_PATH);
    dispatch(loading(false));
    return dispatch({ type: ACTIONS.GET_ALL_USERS, payload: usersRes.data });
  } catch (error) {
    console.log(error);
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
  }
};

export const deleteUser =
  (userId = "") =>
  async (dispatch) => {
    if (!userId) return;
    try {
      dispatch(loading(true));
      const usersRes = await axios.delete(CLIENT_PATH + userId);
      dispatch(loading(false));
      return dispatch({ type: ACTIONS.DELETE_USER, payload: usersRes.data });
    } catch (error) {
      console.log(error);
      dispatch(alertMessage(error.message, ALERT_MODES.error));
      dispatch(loading(false));
    }
  };
