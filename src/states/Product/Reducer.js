import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILED,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILED,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_FAILED,
  GET_RELATED_PRODUCTS_REQUEST,
  GET_RELATED_PRODUCTS_SUCCESS,
  GET_RELATED_PRODUCTS_FAILED,
  GET_HOT_DEALS_REQUEST,
  GET_HOT_DEALS_SUCCESS,
  GET_HOT_DEALS_FAILED,
} from './Types';

const initialState = {
  products: [],
  product: null,
  categoryProducts: [],
  relatedProducts: [],
  hotDeals: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload, error: null };
    case GET_ALL_PRODUCTS_FAILED:
      return { ...state, loading: false, error: action.payload };

    case GET_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, product: action.payload, error: null };
    case GET_PRODUCT_BY_ID_FAILED:
      return { ...state, loading: false, error: action.payload };

    case GET_PRODUCTS_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return { ...state, loading: false, categoryProducts: action.payload, error: null };
    case GET_PRODUCTS_BY_CATEGORY_FAILED:
      return { ...state, loading: false, error: action.payload };

    case GET_RELATED_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_RELATED_PRODUCTS_SUCCESS:
      return { ...state, loading: false, relatedProducts: action.payload, error: null };
    case GET_RELATED_PRODUCTS_FAILED:
      return { ...state, loading: false, error: action.payload };

    case GET_HOT_DEALS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_HOT_DEALS_SUCCESS:
      return { ...state, loading: false, hotDeals: action.payload, error: null };
    case GET_HOT_DEALS_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;
