import { createSlice } from '@reduxjs/toolkit';
import { UNIT } from '../../constants/unit';
import { fee } from '../../constants/fee';

const initialState = {
    totalPrice: 34950,
    totalItems: 1,
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

const cartItems = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        updateQuantity: (state, action) => {
            const index = state.items.findIndex(item => item.productId === action.payload.productId)
            if (action.payload.doing === "increment" && state.items[index].quantity < 99) {
                state.items[index].quantity++
            }
            if (action.payload.doing === "decrement" && state.items[index].quantity > 1) {
                state.items[index].quantity--
            }
            state.items[index].totalPrice = state.items[index].price * state.items[index].quantity
            state.totalPrice = state.items.reduce((currentTotal, item) => {
                return item.totalPrice + currentTotal;
            }, 0);
            state.totalItems = state.items.length;
        },
    }
});

const { reducer, actions } = cartItems;
export const { updateQuantity } = actions;
export default reducer;