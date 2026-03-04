import {applyMiddleware,legacy_createStore,combineReducers} from 'redux'
import { thunk } from 'redux-thunk'
import authReducer from './States/AUTH/Reducer'
import productReducer from './states/Product/Reducer'
import wishlistReducer from './states/Wishlist/Reducer'
import paymentReducer from './states/Payment/Reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  wishlist: wishlistReducer,
  payment: paymentReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))