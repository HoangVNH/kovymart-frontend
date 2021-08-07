import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NotifyHelper } from 'helper/notify-helper'
import ProductAPI from './productAPI'
const initialState = {
    requesting: false,
    success: false,
    message: null,
    object: null,
    list: [],
    pagination: {},
}

//----------ACTIONS----------
export const getProductById = createAsyncThunk(
    "GET_PRODUCT_BY_ID",
    async (id) => {
        const res = await ProductAPI.getbyid(id)
        return res
    }
)

//----------REDUCERS----------
const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get by id
            .addCase(getProductById.pending, (state) => {
                state.requesting = false
                NotifyHelper.info("", "Đang xử lý")
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.requesting = false
                state.message = action.payload.Message
                state.success = true
                state.object = action.payload.data
                NotifyHelper.success(state.message, "Thành công")
                console.log(action)
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.success = false
                console.log(action)
                NotifyHelper.error(action.error.message, ` thất bại`)
            })

    },
})

export default productSlice.reducer
