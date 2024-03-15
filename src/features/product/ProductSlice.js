import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  totalItems: 0,
  status: "idle",
};

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async (nwArr) => {
    let filterString = "";
    let totalItemsQueryString = "";
    for (let obj of nwArr[0]) {
      filterString += `${Object.keys(obj)[0]}=${obj[Object.keys(obj)[0]]}&`;
      totalItemsQueryString += `${Object.keys(obj)[0]}=${
        obj[Object.keys(obj)[0]]
      }&`;
    }
    let sortString = nwArr[1];
    let pageString = nwArr[2];
    const response1 = await axios.get(
      `http://localhost:8080/products?${pageString}&${sortString}&${filterString}`
    );
    const response2 = await axios.get(
      "http://localhost:8080/products?" + totalItemsQueryString
    );
    return {
      products: response1.data,
      totalItems: response2.data.length,
    };
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByFilterAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.totalItems = action.payload.totalItems;
      state.status = "idle";
    });
  },
});

export const allProducts = (state) => state.product.products;
export const totalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
