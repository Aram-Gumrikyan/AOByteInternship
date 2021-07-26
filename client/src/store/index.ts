import { configureStore } from "@reduxjs/toolkit";

import signUpSlice from "../features/signUp/signUpSlice"

const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
  },
})

export default store;