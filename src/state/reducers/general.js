import ACTIONS from "../../constants/storeConstants";

const initialState = {
  toast: "",
  loading: false,
  alert: {
    message: "",
    mode: "",
  },
  profileSideBar: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_TOAST:
      return { ...state, toast: action.payload };
    case ACTIONS.LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.ALERT_MESSAGE:
      return {
        ...state,
        alert: {
          message: action.payload.message,
          mode: action.payload.mode,
        },
      };
    case ACTIONS.PROFILE_SIDEBAR:
      return {
        ...state,
        profileSideBar: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
