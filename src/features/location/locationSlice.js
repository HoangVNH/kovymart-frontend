import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import locationApi from "api/locationApi"
import { NotifyHelper } from "helper/notify-helper"

const initialState = {
  requesting: false,
  success: false,
  message: null,
  provinces: [],
  districts: [],
  wards: [],
}

//----------ACTIONS----------
export const getProvinces = createAsyncThunk(
  "location/getProvinces",
  async () => {
    return await locationApi.getProvinces()
  }
)
export const getDistricts = createAsyncThunk(
  "location/getDistricts",
  async (provinces_id) => {
    return await locationApi.getDistricts(provinces_id)
  }
)
export const getWards = createAsyncThunk(
  "location/getWards",
  async (district_id) => {
    return await locationApi.getWards({ district_id })
  }
)


//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("location")
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("location")

//----------REDUCERS----------
const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //------------------PROVINCE------------------
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        // state.provinces = provinces
        state.provinces = action.payload.data

      })
      //------------------DISTRICT------------------
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.districts = action.payload.data
        // state.districts = districts
      })
      //------------------WARD------------------
      .addCase(getWards.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.wards = action.payload.data
        // state.wards = wards
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

// useSelector
export const selectProvinces = state => state.location.provinces
export const selectDistricts = state => state.location.districts
export const selectWards = state => state.location.wards


export default locationSlice.reducer
