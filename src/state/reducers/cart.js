import ACTIONS from "../../constants/storeConstants";

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_CART_ITEMS:
      return [...state, ...action.payload];
    case ACTIONS.ADD_TO_CART:
      return [...state, { ...action.payload }];
    case ACTIONS.UPDATE_CART_QUANTITY:
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...action.payload }
          : { ...product }
      );
    case ACTIONS.REMOVE_FROM_CART:
      return state.filter((product) => product.id !== action.payload.id);
    case ACTIONS.EMPTY_CART:
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
