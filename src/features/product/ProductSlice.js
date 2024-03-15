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
  async (nwArr) => {
    let filterString = "";
    for (let obj of nwArr[0]) {
      filterString += `${Object.keys(obj)[0]}=${obj[Object.keys(obj)[0]]}&`;
    }
    let sort = nwArr[1];
    let url = "http://localhost:8080/products?" + sort + filterString;
    const response = await axios.get("http://localhost:8080/products?" + filterString+ sort);
    console.log(url);
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
