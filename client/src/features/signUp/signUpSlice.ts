import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ISignUpState, ISignUpForm } from "../../interfaces";
import api from "../../api";

export const fetchSignUp = createAsyncThunk(
  'signUp/fetchSignUp',
  async (userData: ISignUpForm) => {
    const response = await api.post("/signup", { data: userData });
    return response.status;
  }
);

const signUpSlice = createSlice({
  name: 'signUp',

  initialState: {
    loading: false,
    data: "",
    error: false,
  } as ISignUpState,

  reducers: {
    clearData: (state) => {
      state.data = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = "created";
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const { clearData } = signUpSlice.actions;
export default signUpSlice;