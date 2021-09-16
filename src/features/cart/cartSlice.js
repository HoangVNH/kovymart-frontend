/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quantity } from "../../constants/quantity";
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
  async (productId, quantity) => {
    const response = await cartApi.changeQuantity({ productId, quantity });
    return response;
  }
);

function refreshState(state) {
  state.totalPrices = state.items.reduce(
    (total, currentValue) => total + currentValue.totalPrices,
    0
  );
  state.finalPrices = state.totalPrices + fee.shipping;
  state.totalItems = state.items.length;

  return state;
}
//----------REDUCERS----------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (
        action.payload.doing === "increment" &&
        state.items[index].quantity < quantity.MAX
      ) {
        state.items[index].quantity++;
      }
      if (
        action.payload.doing === "decrement" &&
        state.items[index].quantity > quantity.MIN
      ) {
        state.items[index].quantity--;
      }
      state.items[index].totalPrices =
        state.items[index].price * state.items[index].quantity;

      state = refreshState(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteCart: (state) => {
      NotifyHelper.success("", "Xóa giỏ hàng thành công !");
      return state;
    },
    deleteProduct: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items.splice(index, 1);
      state = refreshState(state);
      localStorage.setItem("cart", JSON.stringify(state));
      NotifyHelper.success("", "Xóa sản phẩm thành công !");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.items = payload.items;
        state.totalItems = payload.items?.length;
        state.totalPrice = payload.totalPrice;
      });
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectIsCartFetching = (state) => state.cart.isFetching;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const { updateQuantity, deleteCart, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
