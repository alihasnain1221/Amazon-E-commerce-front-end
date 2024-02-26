import { DEFAULT_SCRAPPED_PAGE } from "../../constants/constant";
import ACTIONS from "../../constants/storeConstants";

const initialState = {
  products: [],
  subCategories: [],
  productDetail: null,
  searchTerm: "",
  categoryId: "",
  productsAvailable: true,
  pageScrapped: DEFAULT_SCRAPPED_PAGE,
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_SUB_CATEGORY:
      const {
        categoryId = "",
        products = [],
        searchTerm = "",
      } = action.payload;
      const objToSave = {
        ...state,
        // subCategories: categories,
        products:
          state.categoryId === categoryId
            ? [...state.products, ...products]
            : products,
        productsAvailable: products.length > 0,
        pageScrapped: state.pageScrapped + 1,
      };

      if (categoryId !== state.categoryId) {
        Object.assign(objToSave, {
          categoryId,
          pageScrapped: DEFAULT_SCRAPPED_PAGE,
        });
      }
      if (action.payload.searchTerm !== state.searchTerm) {
        Object.assign(objToSave, {
          searchTerm,
          pageScrapped: DEFAULT_SCRAPPED_PAGE,
        });
      }
      return objToSave;
    case ACTIONS.GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetail: action.payload || null,
      };
    default:
      return state;
  }
};

export default itemsReducer;
