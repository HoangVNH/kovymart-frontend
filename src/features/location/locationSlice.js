import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import locationApi from "api/locationApi";
// import { NotifyHelper } from "helper/notify-helper";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  provinces: [
    { id: 1, name: "Lâm Đồng" },
    { id: 2, name: "Đà Lạt" },
    { id: 3, name: "Bình Thuận" },
  ],
  districts: [
    { id: 1, name: "Đơn Dương", provinces_id: 1 },
    { id: 2, name: "Bắc Hội", provinces_id: 1 },
    { id: 3, name: "Đơn ", provinces_id: 2 },
  ],
  wards: [
    { id: 1, name: "Giải phóng", district_id: 1 },
    { id: 2, name: "Ka Đô", district_id: 2 },
  ],
};

//----------ACTIONS----------
export const getProvinces = createAsyncThunk(
  "location/getProvinces",
  async () => {
    const res = await locationApi.getprovices();
    return res;
  }
);
export const getDistricts = createAsyncThunk(
  "location/getDistricts",
  async (provinces_id) => {
    const res = await locationApi.getdistricts(provinces_id);
    return res;
  }
);
export const getWards = createAsyncThunk(
  "location/getwards",
  async (district_id) => {
    const res = await locationApi.getwards({ district_id });
    return res;
  }
);

//----------REDUCERS----------
const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //------------------PROVINCE------------------
      .addCase(getProvinces.pending, (state) => {
        void (state.requesting = true);
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.provinces = action.payload.data;
      })
      .addCase(getProvinces.rejected, (state, action) => {
        state.requesting = false;
        state.success = false;
        state.message = action.error.message;
      })
      //------------------DISTRICT------------------
      .addCase(getDistricts.pending, (state) => {
        void (state.requesting = true);
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.districts = action.payload.data;
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.requesting = false;
        state.success = false;
        state.message = action.error.message;
      })
      //------------------WARD------------------
      .addCase(getWards.pending, (state) => {
        void (state.requesting = true);
      })
      .addCase(getWards.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.wards = action.payload.data;
      })
      .addCase(getWards.rejected, (state, action) => {
        state.requesting = false;
        state.success = false;
        state.message = action.error.message;
      });
  },
});

// useSelector

export default locationSlice.reducer;
