import ACTIONS from "../../constants/storeConstants";

const initialState = {
  userOrders: [],
  manageableOrders: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NEW_ORDER:
      return {
        ...state,
        userOrders: [...state.userOrders, { ...action.payload }],
        manageableOrders: [...state.manageableOrders, { ...action.payload }],
      };
    case ACTIONS.UPDATE_ORDER:
      return {
        ...state,
        userOrders: state.userOrders.map((order) =>
          order.id === action.payload.id ? { ...action.payload } : order
        ),
        manageableOrders: state.manageableOrders.map((order) =>
          order.id === action.payload.id ? { ...action.payload } : order
        ),
      };
    case ACTIONS.GET_USER_ORDERS:
      return { ...state, userOrders: [...action.payload] };
    case ACTIONS.GET_MANAGEABLE_ORDERS:
      return { ...state, manageableOrders: [...action.payload] };
    default:
      return state;
  }
};

export default cartReducer;
