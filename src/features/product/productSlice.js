import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { NotifyHelper } from "helper/notify-helper";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  object: null,
  productList1: [],
  productList2: [],
  productList3: [],
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

export const getProductsByCategoryId = createAsyncThunk(
  'product/getProductsByCategoryId',
  async (id) => {
    const res = await productApi.getProductsByCategoryId(id);
    return { res, id };
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
      })
      // Get Products By Category Id
      .addCase(getProductsByCategoryId.pending, (state) => {
        state.requesting = true;
      })
      .addCase(getProductsByCategoryId.rejected, (state) => {
        state.requesting = false;
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.requesting = false;

        if (action.payload.id === 1) {
          state.productList1 = action.payload.res.data;
        } else if (action.payload.id === 2) {
          state.productList2 = action.payload.res.data;
        } else {
          state.productList3 = action.payload.res.data;
        }
      });
  },
});

export const selectProduct = (state) => state.product;

export default productSlice.reducer;
