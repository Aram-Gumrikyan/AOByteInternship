import { createSlice } from "@reduxjs/toolkit";
import { fetchSignUp } from "./api";
import initialState from "./initialState";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetSignUpData: (state) => {
      state.signUp = {};
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.pending, ({ signUp }) => {
      signUp.loading = true;
      signUp.error = undefined;
    })
      .addCase(fetchSignUp.fulfilled, ({ signUp }) => {
        signUp.loading = false;
        signUp.created = true;
      })
      .addCase(fetchSignUp.rejected, ({ signUp }, { error: { message } }) => {
        signUp.loading = false;
        signUp.error = message;
      })
    // builder.addCase(getUserData.pending, (state) => {
    //   state.loading = true;
    // })
    //   .addCase(getUserData.fulfilled, (state, { payload }) => {
    //     state.loading = false;
    //     state.error = false;
    //     state.data = payload;
    //   })
    //   .addCase(getUserData.rejected, (state) => {
    //     state.error = true;
    //   })
  },
})

export const { resetSignUpData } = userSlice.actions;
export default userSlice;