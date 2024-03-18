import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchBrands,
  fetchCategories,
  fetchProductDetailsById,
  fetchProductsByFilter,
} from "./productAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  details: {},
  totalItems: 0,
  status: "idle",
};

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  (nwArr) => fetchProductsByFilter(nwArr)
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  () => fetchCategories()
);

export const fetchBrandsAsync = createAsyncThunk("product/fetchBrands", () =>
  fetchBrands()
);

export const fetchProductDetailsByIdAsync = createAsyncThunk(
  "product/fetchProductDetailsById",
  (id) => fetchProductDetailsById(id)
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.status = "idle";
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "idle";
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProductDetailsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetailsByIdAsync.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "idle";
      });
  },
});

export const allProducts = (state) => state.product.products;
export const totalItems = (state) => state.product.totalItems;
export const allCategories = (state) => state.product.categories;
export const allBrands = (state) => state.product.brands;
export const selectedProductDetails = (state) => state.product.details;

export default productSlice.reducer;
