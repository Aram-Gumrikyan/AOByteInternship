import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ILoginState, ILoginForm } from "../../interfaces";
import api from "../../api";

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (userData: ILoginForm) => {
    const response = await api.post("/login", { data: userData });
    return response.data.token;
  }
);

const loginSlice = createSlice({
  name: 'login',

  initialState: {
    loading: false,
    data: {},
    error: false,
  } as ILoginState,

  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.data.token = payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export default loginSlice;