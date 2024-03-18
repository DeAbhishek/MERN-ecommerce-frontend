import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loggedInUser: null,
  error: null,
  status: "idle",
};

const USER_URL = "http://localhost:8080/users";

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await axios.post(USER_URL, {
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (logInData) => {
    let email = logInData.email;
    let password = logInData.password;

    const response = await axios
      .get(`${USER_URL}?email=${email}`)
      .then((res) =>
        res.data.length
          ? res.data[0].password === password
            ? { email: res.data[0].email }
            : "Invalid Credentials"
          : "User Not Found"
      )
      .catch((error) => error);

    return response;
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
      })
      .addCase(checkUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
