/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quantity } from "../../constants/quantity";
import { NotifyHelper } from "helper/notify-helper";
import { fee } from "../../constants/fee";
import cartApi from "api/cartApi";

const tempState = {
  finalPrices: fee.shipping,
  totalPrices: 0,
  items: [],
  totalItems: 0,
};

const initialState = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : tempState;

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await cartApi.getCart();
  console.log("getCart response: ", response);
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
  initialState: initialState,
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
      localStorage.removeItem("cart");
      state = tempState;
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
});

export const selectProducts = (state) => state.cart.items;
export const { updateQuantity, deleteCart, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
