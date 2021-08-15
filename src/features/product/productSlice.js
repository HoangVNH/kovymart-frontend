import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { NotifyHelper } from "helper/notify-helper";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  object: null,
  list: [],
  pagination: {},
};

//----------ACTIONS----------
export const getProductList = createAsyncThunk(
  "product/getProductList",
  async () => {
    const { data } = await productApi.getProductList();
    return data;
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const res = await productApi.getProductById(id);
    return res;
  }
);

//----------REDUCERS----------
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get by id
      .addCase(getProductById.pending, (state) => {
        state.requesting = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.object = action.payload.data;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.success = false;
      })
      // Get list
      .addCase(getProductList.pending, (state) => {
        state.requesting = true;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.requesting = false;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.requesting = false;
        state.list = action.payload;
      });
  },
});

export const selectProduct = (state) => state.product;

export default productSlice.reducer;
