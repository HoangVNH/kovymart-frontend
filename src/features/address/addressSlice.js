import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import addressApi from "api/addressApi"
import { NotifyHelper } from "helper/notify-helper"

const initialState = {
  requesting: false,
  success: false,
  message: null,
  address_details: null,
  list_address: [],
  default_address: {}
}

//----------ACTIONS----------
export const getAddressList = createAsyncThunk(
  "address/getAddressList",
  async () => {
    const data = await addressApi.getAddressList()
    return data
  }
)

export const getAddressById = createAsyncThunk(
  "address/getAddressById",
  async (id) => {
    const data = await addressApi.getAddressById(id)
    return data
  }
)
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (id, address) => {
    return await addressApi.updateAddress(id, address)
  }
)

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id) => {
    return await addressApi.deleteAddress(id)
  }
)
export const insertAddress = createAsyncThunk(
  "address/insertAddress",
  async (address) => {
    return await addressApi.insertAddress(address)
  }
)

//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("address")
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("address")

//----------SLICERS----------
const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    setDefaultAddress: (state, action) => {
      console.log(action.payload)
      state.default_address = action.payload
      NotifyHelper.success("", "Đặt địa chỉ mặc định thành công !")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.requesting = false
        state.success = true
        state.address_details = action.payload
      })
      .addCase(getAddressList.fulfilled, (state, action) => {
        state.requesting = false
        state.list_address = action.payload.data
        console.log(action.payload)
        state.default_address = action.payload.data[0]
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.requesting = false
        state.success = true
        NotifyHelper.success("", "Cập nhật thành công !")
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.requesting = false
        state.success = true
        NotifyHelper.success("", "Xóa thành công !")
      })
      .addCase(insertAddress.fulfilled, (state) => {
        state.requesting = false
        state.success = true
        NotifyHelper.success("", "Thêm thành công !")
      })

      //---------------PENDING & REJECTION---------------
      .addMatcher(isPendingAction, (state) => {
        state.requesting = true
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = state.success = false
        state.message = action.error.message
        console.log(action)
        NotifyHelper.error(action.error.message, "Yêu cầu thất bại!")
      })
  },
})

//  --------SECLECTORS --------
export const selectAddressList = (state) => state.address.list_address
export const selectAddressById = (state) => state.address.address_details
export const selectDefaultAddress = (state) => state.address.default_address
export const selectRequesting = (state) => state.address.requesting
export const { setDefaultAddress } =
  addressSlice.actions

export default addressSlice.reducer
