import axios from "axios";
import { ALERT_MODES } from "../../constants/constant";
import ACTIONS, {
  ADMIN_MAIN_PATH,
  ADMIN_PATH,
  ERROR_MESSAGES,
} from "../../constants/storeConstants";
import { alertMessage, loading, toastMessage } from "./general";

const path = ADMIN_PATH;

export const getNodes = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    let res = await axios.get(path);
    const nodesArr = [];
    for (let i = 0; i < res.data.length; i++) {
      const node = res.data[i].node;
      const productsRes = await axios.get(
        ADMIN_MAIN_PATH + "NodeProducts/get-products/" + node.id
      );
      nodesArr.push({
        ...node,
        products: productsRes.data,
        estimations: res.data[i].estimations || null,
      });
    }
    dispatch(loading(false));
    return dispatch({
      type: ACTIONS.GET_NODES,
      payload: nodesArr,
    });
  } catch (error) {
    console.log(error);
    dispatch(loading(false));
    dispatch(toastMessage(error.response?.data || ERROR_MESSAGES.serverDown));
  }
};

export const getNodeSalesEstimation = (product, node) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const path = `https://api.rainforestapi.com/request?api_key=${process.env.REACT_APP_RAIN_FOREST_API}&type=sales_estimation&amazon_domain=${node.domain}&asin=${product.asin}`;
    const res = await axios.get(path);
    console.log("sales estimation", { res });

    if (!res.data.sales_estimation.has_sales_estimation) {
      dispatch(loading(false));
      return dispatch(toastMessage(res.data.sales_estimation?.message));
    }

    const updatedProduct = {
      ...product,
      weeklySalesEstimation: res.data.sales_estimation.weekly_sales_estimate,
      monthlySalesEstimation: res.data.sales_estimation.monthly_sales_estimate,
    };
    await dispatch(updateProduct(updatedProduct));
    await dispatch(getNodes());

    dispatch(loading(false));

    return dispatch({
      type: ACTIONS.UPDATE_ESTIMATION,
      payload: {
        productId: product.id,
        nodeId: node.id,
        weeklySalesEstimation: updatedProduct.weeklySalesEstimation,
        monthlySalesEstimation: updatedProduct.monthlySalesEstimation,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(loading(false));
    dispatch(
      toastMessage(
        error.request_info?.message ||
          error.sales_estimation.message ||
          ERROR_MESSAGES.serverDown
      )
    );
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const options = {
      asin: product.asin,
      name: product.name,
      parentNodeId: product.parentNodeId,
      monthlySalesEstimation: product.monthlySalesEstimation,
      weeklySalesEstimation: product.weeklySalesEstimation,
    };

    await axios.put(ADMIN_MAIN_PATH + "NodeProducts/" + product.id, options);
    dispatch(loading(false));
  } catch (error) {
    console.log(error);
    dispatch(toastMessage(error.response?.data || ERROR_MESSAGES.serverDown));
  }
};

export const removeProductsFromNode = (nodeId) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const path = "NodeProducts/";
    const updatedNode = await axios.delete(
      ADMIN_MAIN_PATH + path + "remove-products/" + nodeId
    );
    dispatch(loading(false));
    return dispatch({
      type: ACTIONS.UPDATE_CATEGORY,
      payload: updatedNode.data,
    });
  } catch (error) {
    dispatch(loading(false));
    console.log(error);
    dispatch(toastMessage(error.response?.data || ERROR_MESSAGES.serverDown));
  }
};

export const getCategoryProducts = (node) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const link = `https://api.rainforestapi.com/request?api_key=${process.env.REACT_APP_RAIN_FOREST_API}&type=category&category_id=${node.nodeId}&amazon_domain=${node.domain}`;
    const res = await axios.get(link);
    // const res = CATEGORY_PRODUCT;

    const path = "NodeProducts/";
    await axios.delete(ADMIN_MAIN_PATH + path + "remove-products/" + node.id);

    const products = res.data.category_results;
    const productsArr = [];
    for (let i = 0; i < products.length; i++) {
      const objToSend = {
        asin: products[i].asin,
        name: products[i].title,
        parentNodeId: node.nodeId,
      };
      const res = await axios.post(ADMIN_MAIN_PATH + path, objToSend);
      productsArr.push(res.data);
    }
    dispatch(loading(false));
    return dispatch({
      type: ACTIONS.GET_CATEGORY_PRODUCTS,
      payload: { products: productsArr, parentNodeId: node.id },
    });
  } catch (error) {
    console.log(error);
    dispatch(loading(false));
    dispatch(toastMessage(error.response?.data || ERROR_MESSAGES.serverDown));
  }
};

export const updateCategory = (node) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const option = {
      name: node.name,
      nodeId: node.nodeId,
      domain: node.domain,
      amazonNodeId: node.amazonNodeId,
      visible: node.visible,
    };
    await axios.put(ADMIN_PATH + node.id, option);
    dispatch(loading(false));
    dispatch(alertMessage("Node Updated Successfully!", ALERT_MODES.success));
    return dispatch({
      type: ACTIONS.UPDATE_CATEGORY,
      payload: node,
    });
  } catch (error) {
    console.log(error);
    dispatch(loading(false));
    dispatch(toastMessage(error.response?.data || ERROR_MESSAGES.serverDown));
  }
};
