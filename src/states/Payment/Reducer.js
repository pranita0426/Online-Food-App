import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILED,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILED,
  CLEAR_PAYMENT,
} from './Types';

const initialState = {
  paymentLink: null,
  paymentData: null,
  loading: false,
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PAYMENT_SUCCESS:
      return { ...state, loading: false, paymentLink: action.payload, error: null };
    case CREATE_PAYMENT_FAILED:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PAYMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PAYMENT_SUCCESS:
      return { ...state, loading: false, paymentData: action.payload, error: null };
    case UPDATE_PAYMENT_FAILED:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_PAYMENT:
      return { ...state, paymentLink: null, paymentData: null };

    default:
      return state;
  }
};

export default paymentReducer;
