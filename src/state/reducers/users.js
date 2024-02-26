import ACTIONS from "../../constants/storeConstants";

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_USERS:
      return [...action.payload];
    case ACTIONS.UPDATE_USER:
      return state.map((user) =>
        user.id === action.payload.id ? { ...action.payload } : { ...user }
      );
    case ACTIONS.DELETE_USER:
      return state.filter((user) => user.id !== action.payload.id);
    default:
      return state;
  }
};

export default usersReducer;
