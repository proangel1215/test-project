import { combineReducers } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';

const rootReducer = combineReducers({
  products: productSlice,
});

export default rootReducer;
