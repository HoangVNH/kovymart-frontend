import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import counterReducer from '../features/counter/counterSlice'
import productReducer from '../features/product/productSlice'
import cartItemsReducer from '../features/cart/cartSlice';

import rootSaga from './rootSaga'
import locationReducer from '../features/location/locationSlice'
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,

    cartItems: cartItemsReducer,
    auth: authReducer

 
    location: locationReducer,

  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

