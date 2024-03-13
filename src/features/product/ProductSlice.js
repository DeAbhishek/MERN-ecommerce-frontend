import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await axios.get("http://localhost:8080/products");
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async (filter) => {
    let queryString = "";
    for (let obj of filter) {
      queryString += `${Object.keys(obj)[0]}=${obj[Object.keys(obj)[0]]}&`;
    }
    const response = await axios.get(
      "http://localhost:8080/products?" + queryString
    );
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = "idle";
    });

    builder.addCase(fetchProductsByFilterAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = "idle";
    });
  },
});

export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;
