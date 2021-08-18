import { createSlice } from '@reduxjs/toolkit';
import { quantity } from '../../constants/quantity';
import { NotifyHelper } from 'helper/notify-helper';

var tempState = {
    totalPrice: 39900,
    totalItems: 2,
    items: [
        {
            name: "Táo Royal Gala PG size 100-120 500g",
            discount: 0,
            price: 34950,
            productId: 1,
            totalPrice: 34950,
            quantity: 1,
        },
        {
            name: "Táo Royal Gala PG size 100-120 500g",
            discount: 0,
            price: 34950,
            productId: 2,
            totalPrice: 34950,
            quantity: 1,
        },
    ]
}
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : tempState

//----------REDUCERS----------
const cartItems = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        updateQuantity: (state, action) => {
            const index = state.items.findIndex(item => item.productId === action.payload.productId)
            if (action.payload.doing === "increment" && state.items[index].quantity < quantity.MAX) {
                state.items[index].quantity++
            }
            if (action.payload.doing === "decrement" && state.items[index].quantity > quantity.MIN) {
                state.items[index].quantity--
            }
            state.items[index].totalPrice = state.items[index].price * state.items[index].quantity
            state.totalPrice = state.items.reduce((currentTotal, item) => {
                return item.totalPrice + currentTotal;
            }, 0);
            state.totalItems = state.items.length;

            // set localstorage
            localStorage.setItem('cart', JSON.stringify(state))
        },
        deleteCart: (state) => {
            // do something
            NotifyHelper.success('', 'Xóa giỏ hàng thành công')
            window.location.reload();
            localStorage.removeItem('cart')
        }
    },
});

const { reducer, actions } = cartItems;
export const { updateQuantity, deleteCart } = actions;
export default reducer;