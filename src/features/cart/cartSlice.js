import { createSlice } from "@reduxjs/toolkit";
import { quantity } from "../../constants/quantity";
import { NotifyHelper } from "helper/notify-helper";

const tempState = {
  totalPrice: 69900,
  totalItems: 2,
  items: [
    {
      name: "Tương ớt CHIN-SU chai 250g",
      discount: 0,
      price: 12100,
      productId: 14,
      totalPrice: 12100,
      quantity: 1,
    },
    {
      name: "Mì gói ăn liền khoai tây vị xốt bò hầm Omachi gói 80g",
      discount: 0,
      price: 7100,
      productId: 16,
      totalPrice: 7100,
      quantity: 1,
    },
  ],
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
      const isProductAlreadyOnCart = state.items.find(
        (product) => product.productId === action.payload.productId
      );

      if (isProductAlreadyOnCart) {
      }
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
export const { updateQuantity, deleteCart, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
