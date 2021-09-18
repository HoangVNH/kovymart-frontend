/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotifyHelper } from "helper/notify-helper";
import { fee } from "../../constants/fee";
import cartApi from "api/cartApi";

const initialState = {
  finalPrices: fee.shipping,
  totalPrice: 0,
  items: [],
  totalItems: 0,
  isFetching: false,
};

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await cartApi.getCart();
  return response.data;
});

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (product) => {
    const response = await cartApi.addProductToCart(product);

    if (Array.isArray(response?.items) && response?.items.length > 0) {
      NotifyHelper.success("", "Sản phẩm đã được thêm vào Giỏ hàng");
    }
  }
);

export const changeQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async (data) => {
    const response = await cartApi.changeQuantity(data);
    return response.data;
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProduct",
  async (itemId) => {
    const { data, status } = await cartApi.removeProductFromCart(itemId);

    if (status === 200) {
      NotifyHelper.success("", "Xóa sản phẩm thành công!");
    } else {
      NotifyHelper.error("", "Xóa sản phẩm thất bại!");
    }

    return data;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const { data, status } = await cartApi.clearCart();
  if (status === 200) {
    NotifyHelper.success("", "Xoá giỏ hàng thành công!");
  } else {
    NotifyHelper.error("", "Xóa giỏ hàng thất bại!");
  }

  return data;
});

//----------REDUCERS----------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [getCart.pending]: (state) => {
      if (state.isFetching === false) {
        state.isFetching = true;
      }
    },
    [getCart.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.items = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
    [changeQuantity.pending]: (state) => {
      state.isFetching = true;
    },
    [changeQuantity.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.items = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
    [removeProductFromCart.pending]: (state) => {
      state.isFetching = true;
    },
    [removeProductFromCart.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.items = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
    [clearCart.pending]: (state) => {
      state.isFetching = true;
    },
    [clearCart.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.items = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectIsCartFetching = (state) => state.cart.isFetching;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
