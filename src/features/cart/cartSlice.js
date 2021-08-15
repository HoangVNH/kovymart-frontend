import { createSlice } from '@reduxjs/toolkit';
import { UNIT} from '../../constants/unit';

const initialCartItems = [
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 1,
        discount: 10,
        unit: 1
    },
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 2,
        discount: 10,
        unit: 1,
    },
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 3,
        discount: 10,
        unit: 1
    },
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 4,
        discount: 10,
        unit: 1
    },
    {
        name: "Bắp bò loại 1 500g",
        price: 50000,
        id: 5,
        discount: 10,
        unit: 1
    },
]

const cartItems = createSlice({
    name: 'Carts',
    initialState: initialCartItems,
    reducers: {
        increaseUnit: (state, action) => {
           const id = action.payload;
           const CartItemIndex = state.findIndex(CartItem => CartItem.id === id);
           if(state[CartItemIndex].unit < UNIT.MAX )            
                state[CartItemIndex].unit += 1;
           
           return state;
        },
        decreaseUnit: (state, action) => {
           const id = action.payload;
           const CartItemIndex = state.findIndex(CartItem => CartItem.id === id);
           if(state[CartItemIndex].unit > UNIT.MIN )
                state[CartItemIndex].unit -= 1;
           
           return state;
        }

    }
  });

  const { reducer, actions } = cartItems;
  export const { increaseUnit, decreaseUnit } = actions;
  export default reducer;