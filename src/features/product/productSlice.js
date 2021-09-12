import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { NotifyHelper } from "helper/notify-helper";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  productList1: [],
  productList2: [],
  productList3: [],
  list: [],
  pagination: {},
  detail: {
    id: 0,
    name: "",
    sku: "",
    description: "",
    price: 0,
    discount: 0,
  },
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
  "product/getProductsByCategoryId",
  async (id) => {
    const res = await productApi.getProductsByCategoryId(id);
    return { res, id };
  }
);

//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("product");
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("product");

//----------REDUCERS----------
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setDataToEmpty: (state) => {
      state.detail = initialState.detail;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.detail = action.payload;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.requesting = false;
        state.list = action.payload;
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
      })

      //---------------PENDING & REJECTION---------------
      .addMatcher(isPendingAction, (state) => {
        state.requesting = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = state.success = false;
        state.message = action.error.message;
        NotifyHelper.error(action.error.message, "Yêu cầu thất bại!");
      });
  },
});

export const { setDataToEmpty } = productSlice.actions;

export const selectProduct = (state) => state.product;
export const selectProductDetail = (state) => state.product.detail;

export default productSlice.reducer;
