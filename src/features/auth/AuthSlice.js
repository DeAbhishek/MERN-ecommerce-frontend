import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut } from "./authAPI";
// import { updateUser } from "../user/userAPI";

const initialState = {
  loggedInUserToken: null,
  error: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk("user/createUser", (userData) =>
  createUser(userData)
);

export const checkUserAsync = createAsyncThunk("user/checkUser", (logInData) =>
  checkUser(logInData)
);

export const signOutAsync = createAsyncThunk("user/signOut", () => signOut());

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
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = action.payload;
        state.loggedInUserToken = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectLoggedInUserStatus = (state) => state.auth.status;

export default authSlice.reducer;
