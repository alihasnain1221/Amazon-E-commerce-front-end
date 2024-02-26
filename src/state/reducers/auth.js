import ACTIONS from "../../constants/storeConstants";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.ADD_USER:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export default authReducer;
