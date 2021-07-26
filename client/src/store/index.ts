import { configureStore } from "@reduxjs/toolkit";

import signUpSlice from "../features/signUp/signUpSlice";
import loginSlice from "../features/login/loginSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer,
    user: userSlice.reducer,
  },
})

export default store;