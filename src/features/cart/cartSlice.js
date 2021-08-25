/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit"
import { quantity } from "../../constants/quantity"
import { NotifyHelper } from "helper/notify-helper"
import { fee } from "../../constants/fee"
const tempState = {
  finalPrices: fee.shipping,
  totalPrices: 0,
  items: [],
  totalItems: 0,
}
const initialState = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : tempState

function refreshState(state) {
  state.totalPrices = state.items.reduce(
    (total, currentValue) => total + currentValue.totalPrices,
    0
  )
  state.finalPrices = state.totalPrices + fee.shipping
  state.totalItems = state.items.length

  return state
}
//----------REDUCERS----------
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action) => {
      // console.log('Action: ' + action)
      const existedProductIndex = state.items.findIndex(
        (product) => product.id === action.payload.product.id
      )

      if (existedProductIndex !== -1) {
        state.items.map((item) => {
          if (item.id === action.payload.product.id) {
            state.items[existedProductIndex]["quantity"] +=
              action.payload.quantity
            state.items[existedProductIndex]["totalPrices"] =
              state.items[existedProductIndex].price *
              state.items[existedProductIndex]["quantity"]
          }
        })
      } else {
        state.items.push({
          ...action.payload.product,
          quantity: 1,
          totalPrices: action.payload.product.price,
        })
        state.totalItems = state.items.length
      }

      state = refreshState(state)
    },
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      if (
        action.payload.doing === "increment" &&
        state.items[index].quantity < quantity.MAX
      ) {
        state.items[index].quantity++
      }
      if (
        action.payload.doing === "decrement" &&
        state.items[index].quantity > quantity.MIN
      ) {
        state.items[index].quantity--
      }
      state.items[index].totalPrices =
        state.items[index].price * state.items[index].quantity

      state = refreshState(state)
      localStorage.setItem("cart", JSON.stringify(state))
    },
    deleteCart: (state) => {
      localStorage.removeItem("cart")
      state = tempState
      NotifyHelper.success("", "Xóa giỏ hàng thành công !")
      return state
    },
    deleteProduct: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      state.items.splice(index, 1)
      state = refreshState(state)
      localStorage.setItem("cart", JSON.stringify(state))
      NotifyHelper.success("", "Xóa sản phẩm thành công !")
    },
  },
})


export const selectProducts = (state) => state.cart.items
export const { addProductToCart, updateQuantity, deleteCart, deleteProduct } =
  cartSlice.actions
export default cartSlice.reducer
