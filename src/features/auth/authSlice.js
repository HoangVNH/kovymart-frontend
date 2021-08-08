import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import { setAccessTokenToLocalStorage } from "helper/auth";
import { ASYNC_STATUS } from "../../constants";

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (values) => {
    const { data } = await authApi.signUp(values);
    return data;
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (values) => {
    const { data: { accessToken } } = await authApi.signIn(values);
    setAccessTokenToLocalStorage(accessToken);
    return accessToken;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isFetching: false,
    accessToken: '',
    signUp: {
      msg: ASYNC_STATUS.IDLE,
    },
    signIn: {
      msg: ASYNC_STATUS.IDLE
    },
  },
  reducers: {
    setSignUpMsgToDefault: (state) => {
      state.signUp.msg = ASYNC_STATUS.IDLE;
    },
    setSignInMsgToDefault: (state) => {
      state.signIn.msg = ASYNC_STATUS.IDLE;
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.isFetching = true;
      state.signUp.msg = ASYNC_STATUS.PENDING;
    },
    [signUp.rejected]: (state) => {
      state.isFetching = false;
      state.signUp.msg = ASYNC_STATUS.ERROR;
    },
    [signUp.fulfilled]: (state) => {
      state.isFetching = false;
      state.signUp.msg = ASYNC_STATUS.SUCCESS
    },
    [signIn.pending]: (state) => {
      state.isFetching = true;
      state.signIn.msg = ASYNC_STATUS.PENDING;
    },
    [signIn.rejected]: (state) => {
      state.isFetching = false;
      state.signIn.msg = ASYNC_STATUS.ERROR;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.signIn.msg = ASYNC_STATUS.SUCCESS
      state.accessToken = action.payload;

    },
  }
});

export const { setSignUpMsgToDefault, setSignInMsgToDefault } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
