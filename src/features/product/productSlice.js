import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from 'api/productApi';
import { NotifyHelper } from 'helper/notify-helper';

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
  'product/getProductList',
  async () => {
    const { data } = await productApi.getProductList();
    return data;
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const res = await productApi.getProductById(id)
    return res
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
  },
})

export const selectProduct = (state) => state.productApi;

export default productSlice.reducer;
