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

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_TO_WISHLIST_SUCCESS:
      return { ...state, loading: false, wishlist: action.payload, error: null };
    case ADD_TO_WISHLIST_FAILED:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_FROM_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case REMOVE_FROM_WISHLIST_SUCCESS:
      return { ...state, loading: false, wishlist: action.payload, error: null };
    case REMOVE_FROM_WISHLIST_FAILED:
      return { ...state, loading: false, error: action.payload };

    case GET_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_WISHLIST_SUCCESS:
      return { ...state, loading: false, wishlist: action.payload, error: null };
    case GET_WISHLIST_FAILED:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_WISHLIST:
      return { ...state, wishlist: [] };

    default:
      return state;
  }
};

export default wishlistReducer;
