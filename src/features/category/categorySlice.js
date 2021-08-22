import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productApi from "api/productApi"
import categoryApi from "api/categoryApi"
import { NotifyHelper } from "helper/notify-helper"

const initialState = {
    requesting: false,
    success: false,
    message: null,
    list_products: [],
    category_detail: null,
    pagination: {
        page: 0,
        finished: false
    }
}

//----------ACTIONS----------
export const getProductsPagination = createAsyncThunk(
    "category/getProductsPagination",
    async (data) => {
        return await productApi.getProductsPagination(data)
    }
)

export const getCategoryList = createAsyncThunk(
    "category/getCategoryList",
    async () => {
        return await categoryApi.getCategoryList()
    }
)

export const getCategoryById = createAsyncThunk(
    "category/getCategoryById",
    async (id) => {
        return await categoryApi.getCategoryById(id)
    }
)

//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
    action.type.endsWith("/pending") && action.type.includes("category")
const isRejectedAction = (action) =>
    action.type.endsWith("/rejected") && action.type.includes("category")

//----------REDUCERS----------
const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsPagination.fulfilled, (state, action) => {
                if (action.payload.data.length === 0) { //check if loadmore is done
                    state.success = state.requesting = false
                    state.pagination.finished = true
                }
                else {
                    if (action.payload.data.page > 1) {
                        state.list_products = state.list_products.concat(action.payload.data)
                    }
                    else {
                        state.list_products = action.payload.data
                    }
                    state.requesting = false
                    state.success = true
                }
                state.pagination.page++
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.requesting = false
                state.success = true
                state.category_detail = action.payload
            })
            //---------------PENDING & REJECTION---------------
            .addMatcher(isPendingAction, (state) => {
                state.requesting = true
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.requesting = state.success = false
                state.message = action.error.message
                NotifyHelper.error(action.error.message, "Yêu cầu thất bại!")
            })
    },
})

export const selectCategory = (state) => state.category.category_detail
export const selectProducts = (state) => state.category.list_products
export const selectPagination = (state) => state.category.pagination.page
export default categorySlice.reducer
