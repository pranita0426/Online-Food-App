import { api } from '../../config/apiConfig';
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

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
  try {
    const { data } = await api.get('/api/v1/products');
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: GET_ALL_PRODUCTS_FAILED, payload: message });
  }
};

export const getProductById = (productId) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/v1/product/${productId}`);
    dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: GET_PRODUCT_BY_ID_FAILED, payload: message });
  }
};

export const getProductsByCategory = (category) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BY_CATEGORY_REQUEST });
  try {
    const { data } = await api.get(`/api/v1/products/category/${category}`);
    dispatch({ type: GET_PRODUCTS_BY_CATEGORY_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: GET_PRODUCTS_BY_CATEGORY_FAILED, payload: message });
  }
};

export const getRelatedProducts = (productId) => async (dispatch) => {
  dispatch({ type: GET_RELATED_PRODUCTS_REQUEST });
  try {
    const { data } = await api.get(`/api/v1/products/related/${productId}`);
    dispatch({ type: GET_RELATED_PRODUCTS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: GET_RELATED_PRODUCTS_FAILED, payload: message });
  }
};

export const getHotDeals = (limit = 10) => async (dispatch) => {
  dispatch({ type: GET_HOT_DEALS_REQUEST });
  try {
    const { data } = await api.get(`/api/v1/products/deals?limit=${limit}`);
    dispatch({ type: GET_HOT_DEALS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: GET_HOT_DEALS_FAILED, payload: message });
  }
};

// Admin product creation
export const createProduct = (formData) => async (dispatch) => {
  try {
    const { data } = await api.post('/api/v1/product/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
