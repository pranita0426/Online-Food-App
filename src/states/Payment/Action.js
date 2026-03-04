import { api } from '../../config/apiConfig';
import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILED,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILED,
  CLEAR_PAYMENT,
} from './Types';

export const createPaymentLink = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/v1/payments/${orderId}`);
    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data.data });
    return data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: CREATE_PAYMENT_FAILED, payload: message });
    throw error;
  }
};

export const updatePaymentStatus = (query) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post('/api/v1/payments/status', null, {
      params: query,
    });
    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: UPDATE_PAYMENT_FAILED, payload: message });
    throw error;
  }
};

export const clearPayment = () => (dispatch) => {
  dispatch({ type: CLEAR_PAYMENT });
};
