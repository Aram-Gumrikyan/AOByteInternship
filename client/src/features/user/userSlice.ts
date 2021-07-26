import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IUser, IUserState } from "../../interfaces";
import api from "../../api";

export const getUserData = createAsyncThunk(
    "user/fetchUser",
    async () => {
        const response: IUser = await api.post("/user");
        console.log(response);
        return response;
    }
)

const userSlice = createSlice({
    name: "user",

    initialState: {
        loading: false,
        data: {
            fname: "",
            lname: "",
            email: "",
        },
        error: false,
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state) => {
            state.loading = true;
        })
            .addCase(getUserData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = false;
                state.data = payload;
            })
            .addCase(getUserData.rejected, (state) => {
                state.error = true;
            })
    },
})

export default userSlice;