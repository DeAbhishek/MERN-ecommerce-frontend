import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loggedInUser: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await axios.post("http://localhost:8080/users", {
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;

export default authSlice.reducer;
