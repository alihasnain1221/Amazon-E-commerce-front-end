import { combineReducers } from "redux";
import amazonNodes from "./amazonNodes";
import authReducer from "./auth";
import cartReducer from "./cart";
import generalReducer from "./general";
import ordersReducer from "./orders";
import productsReducer from "./products";
import usersReducer from "./users";

export default combineReducers({
  nodes: amazonNodes,
  general: generalReducer,
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
  orders: ordersReducer,
  users: usersReducer,
});
