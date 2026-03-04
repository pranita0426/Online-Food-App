import { api } from '../../config/apiConfig';
import {
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILED,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAILED,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAILED,
  CLEAR_WISHLIST,
} from './Types';

export const addToWishlist = (productId, skuCode = '') => async (dispatch) => {
  dispatch({ type: ADD_TO_WISHLIST_REQUEST });
  try {
    const { data } = await api.post('/api/v1/wishlist/add', {
      productId,
      skuCode,
    });
    // backend returns array of { product: {...} }
    const list = (data.wishlist || []).map((w) => w.product || w);
    dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: list });
    return { ...data, wishlist: list };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: ADD_TO_WISHLIST_FAILED, payload: message });
    throw error;
  }
};

export const removeFromWishlist = (productId, skuCode = '') => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });
  try {
    const { data } = await api.post(`/api/v1/wishlist/remove/${productId}`, {
      skuCode,
    });
    const list = (data.wishlist || []).map((w) => w.product || w);
    dispatch({ type: REMOVE_FROM_WISHLIST_SUCCESS, payload: list });
    return { ...data, wishlist: list };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: REMOVE_FROM_WISHLIST_FAILED, payload: message });
    throw error;
  }
};

export const getWishlist = () => async (dispatch) => {
  dispatch({ type: GET_WISHLIST_REQUEST });
  try {
    const { data } = await api.get('/api/v1/wishlist');
    const list = (data.wishlist || []).map((w) => w.product || w);
    dispatch({ type: GET_WISHLIST_SUCCESS, payload: list });
    return list;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: GET_WISHLIST_FAILED, payload: message });
  }
};

export const clearWishlist = () => (dispatch) => {
  dispatch({ type: CLEAR_WISHLIST });
};
