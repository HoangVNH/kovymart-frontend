import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import locationApi from "api/locationApi";
import { NotifyHelper } from "helper/notify-helper";

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
    return await locationApi.getprovices();
  }
);
export const getDistricts = createAsyncThunk(
  "location/getDistricts",
  async (provinces_id) => {
    return await locationApi.getdistricts(provinces_id);
  }
);
export const getWards = createAsyncThunk(
  "location/getwards",
  async (district_id) => {
    return await locationApi.getwards({ district_id });
  }
);
//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("location");
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("location");

//----------REDUCERS----------
const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //------------------PROVINCE------------------
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.provinces = action.payload.data;
      })
      //------------------DISTRICT------------------
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.districts = action.payload.data;
      })
      //------------------WARD------------------
      .addCase(getWards.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        state.wards = action.payload.data;
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

// useSelector



export default locationSlice.reducer;
