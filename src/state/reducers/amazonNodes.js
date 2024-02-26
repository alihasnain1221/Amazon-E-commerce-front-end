import ACTIONS from "../../constants/storeConstants";

const initialState = {
  baseNodes: [],
};

const nodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_NODES:
      return { ...state, baseNodes: action.payload };
    case ACTIONS.GET_CATEGORY_PRODUCTS:
      return {
        ...state,
        baseNodes: state.baseNodes.map((node) =>
          node.id === action.payload.parentNodeId
            ? { ...node, products: action.payload.products }
            : node
        ),
      };
    case ACTIONS.UPDATE_CATEGORY:
      return {
        ...state,
        baseNodes: state.baseNodes.map((node) =>
          node.id === action.payload.id ? action.payload : node
        ),
      };

    case ACTIONS.UPDATE_ESTIMATION:
      const {
        nodeId,
        productId,
        weeklySalesEstimation,
        monthlySalesEstimation,
      } = action.payload;
      return {
        ...state,
        baseNodes: state.baseNodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                products: node.products.map((product) =>
                  product.id === productId
                    ? {
                        ...product,
                        weeklySalesEstimation,
                        monthlySalesEstimation,
                      }
                    : product
                ),
              }
            : node
        ),
      };
    default:
      return state;
  }
};

export default nodesReducer;
