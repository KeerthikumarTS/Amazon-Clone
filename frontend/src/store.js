import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; 
import productsReducer from './slices/productsSlice.js';
import productReducer from './slices/productSlice.js'

const store = configureStore({
  reducer: {
    productsState: productsReducer, 
    productState: productReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), 
});

export default store;

