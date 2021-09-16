import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";

import rootSaga from "./rootSaga";
import locationReducer from "../features/location/locationSlice";
import categoryReducer from "../features/category/categorySlice";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    location: locationReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
