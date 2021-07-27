import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { ISignUpForm, ILoginForm } from "../../interfaces";

// export const getUserData = createAsyncThunk(
//   "user/fetchUser",
//   async () => {
//     const response: IUser = await api.post("/user");
//     console.log(response);
//     return response;
//   }
// )

export const fetchSignUp = createAsyncThunk(
  'signUp/fetchSignUp',
  async (userData: ISignUpForm) => {
    const response = await api.post("/user", { data: userData });
    console.log(response);
  }
);

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (userData: ILoginForm) => {
    const response = await api.post("/user/login", { data: userData });
    return response.data.token;
  }
);