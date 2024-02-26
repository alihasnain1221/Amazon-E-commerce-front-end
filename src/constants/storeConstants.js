export const ADMIN_MAIN_PATH = "https://localhost:7098/api/";
export const ADMIN_PATH = "https://localhost:7098/api/AmazonNodes/";
export const CLIENT_PATH = "https://localhost:7098/api/Users/";

const FILTER_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  EMPTY_CART: "EMPTY_CART",
  GET_CART_ITEMS: "GET_CART_ITEMS",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART_QUANTITY: "UPDATE_CART_QUANTITY",
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_SUB_CATEGORY: "GET_SUB_CATEGORY",
  GET_PRODUCT_DETAILS: "GET_PRODUCT_DETAILS",
  ADD_USER: "ADD_USER",
  GET_USER: "GET_USER",
  SHOW_TOAST: "SHOW_TOAST",
  GET_NODES: "GET_NODES",
  GET_CATEGORY_PRODUCTS: "GET_CATEGORY_PRODUCTS",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  LOG_OUT_USER: "LOG_OUT_USER",
  GET_BASE_CATEGORY_TO_SHOW: "GET_BASE_CATEGORY_TO_SHOW",
  UPDATE_ESTIMATION: "UPDATE_ESTIMATION",
  LOADING: "LOADING",
  ADD_NEW_ORDER: "ADD_NEW_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",
  ALERT_MESSAGE: "ALERT_MESSAGE",
  GET_USER_ORDERS: "GET_USER_ORDERS",
  GET_MANAGEABLE_ORDERS: "GET_MANAGEABLE_ORDERS",
  PROFILE_SIDEBAR: "PROFILE_SIDEBAR",
  GET_ALL_USERS: "GET_ALL_USERS",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
};

export default FILTER_ACTIONS;

export const SERVER_URLS = {
  main: "https://localhost:7098/api",
  generals: "https://localhost:7098",
  scrapper: {
    productDetail: "https://localhost:7098/getProductDetails",
    products: "https://localhost:7098/getCategoryResults",
    searchResults: "https://localhost:7098/getSearchResults",
  },
};

export const ERROR_MESSAGES = {
  serverDown:
    "Sorry for the inconvenience, but the server is down at the moment!",
};
