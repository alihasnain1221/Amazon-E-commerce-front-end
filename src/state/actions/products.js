import axios from "axios";
import {
  ALERT_MODES,
  DEFAULT_CATEGORY_ID,
  DEFAULT_SCRAPPED_PAGE,
} from "../../constants/constant";
import ACTIONS, { SERVER_URLS } from "../../constants/storeConstants";
import { alertMessage, loading } from "./general";

export const getCategories =
  (categoryId = DEFAULT_CATEGORY_ID, page = DEFAULT_SCRAPPED_PAGE) =>
  async (dispatch) => {
    // const link = `https://ecom.webscrapingapi.com/v1?engine=amazon&api_key=${process.env.REACT_APP_WEBSCRAPPINGAPI_KEY}&type=category&category_id=2619526011`;
    //   const link = `https://ecom.webscrapingapi.com/v1?engine=amazon&api_key=${process.env.REACT_APP_WEBSCRAPPINGAPI_KEY}&type=category&category_id=2399939011`;

    // const link = `https://ecom.webscrapingapi.com/v1?engine=amazon&api_key=${process.env.REACT_APP_WEBSCRAPPINGAPI_KEY}&type=category&category_id=${categoryId}`;
    try {
      dispatch(loading(true));
      const options = {
        params: {
          categoryId,
          page,
        },
      };
      const res = await axios.get(SERVER_URLS.scrapper.products, options);
      // const { res } = RES_CATEGORY;
      dispatch(loading(false));
      return dispatch({
        type: ACTIONS.GET_SUB_CATEGORY,
        payload: {
          categoryId: res.data?.parent_category_id,
          products: res.data?.product_results || [],
          // products: res.data?.category_results?.product_results || [],
          // categories: res.data?.category_results?.categories || [],
        },
      });
    } catch (error) {
      console.log(error);
      dispatch(alertMessage(error.message, ALERT_MODES.error));
      dispatch(loading(false));
    }
  };

export const getSearchResults =
  (searchTerm = "", page = DEFAULT_SCRAPPED_PAGE) =>
  async (dispatch) => {
    try {
      dispatch(loading(true));
      const options = {
        params: {
          searchTerm,
          page,
        },
      };
      const res = await axios.get(SERVER_URLS.scrapper.searchResults, options);
      dispatch(loading(false));
      return dispatch({
        type: ACTIONS.GET_SUB_CATEGORY,
        payload: {
          searchTerm,
          products: res.data?.product_results || [],
        },
      });
    } catch (error) {
      console.log(error);
      dispatch(alertMessage(error.message, ALERT_MODES.error));
      dispatch(loading(false));
    }
  };

export const getProduct = (productId) => async (dispatch) => {
  // const link = `https://ecom.webscrapingapi.com/v1?engine=amazon&api_key=${process.env.REACT_APP_WEBSCRAPPINGAPI_KEY}&type=product&product_id=${productId}`;
  try {
    dispatch(loading(true));
    const options = {
      params: {
        productAsin: productId,
      },
    };
    const res = await axios.get(SERVER_URLS.scrapper.productDetail, options);
    // const res = RES_PRODUCT_DETAILS_2;
    dispatch(loading(false));
    return dispatch({
      type: ACTIONS.GET_PRODUCT_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch(alertMessage(error.message, ALERT_MODES.error));
    dispatch(loading(false));
  }
};
