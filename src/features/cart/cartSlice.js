/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";
import { quantity } from "../../constants/quantity";
import { NotifyHelper } from "helper/notify-helper";

const tempState = {
  totalPrice: 0,
  items: [],
  totalItems: 0,
};

const initialState = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : tempState;

//----------REDUCERS----------
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action) => {
      console.log("action: ", action);
      const existedProductIndex = state.items.findIndex(
        (product) => product.id === action.payload.product.id
      );

      if (existedProductIndex !== -1) {
        state.items.map((item) => {
          if (item.id === action.payload.product.id) {
            state.items[existedProductIndex]["quantity"] +=
              action.payload.quantity;
            state.items[existedProductIndex]["totalPrices"] =
              state.items[existedProductIndex].price *
              state.items[existedProductIndex]["quantity"];
          }
        });
      } else {
        state.items.push({
          ...action.payload.product,
          quantity: 1,
          totalPrices: action.payload.product.price,
        });
        state.totalItems = state.items.length;
      }

      state.totalPrice = state.items.reduce(
        (total, currentValue) => total + currentValue.totalPrices,
        0
      );
    },
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload.productId
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
      state.items[index].totalPrice =
        state.items[index].price * state.items[index].quantity;
      state.totalPrice = state.items.reduce((currentTotal, item) => {
        return item.totalPrice + currentTotal;
      }, 0);
      state.totalItems = state.items.length;

      // set localstorage
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
        (item) => item.productId === action.payload.productId
      );
      state.items.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state));
      NotifyHelper.success("", "Xóa sản phẩm thành công !");
    },
  },
});

export const selectProducts = (state) => state.cart.items;
export const { addProductToCart, updateQuantity, deleteCart, deleteProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
