import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
  fetchProductDetailsById,
  fetchProductsByFilter,
  updateProduct,
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

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  (product) => createProduct(product)
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  (updatedProduct) => updateProduct(updatedProduct)
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.status = "success";
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "success";
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "success";
      })
      .addCase(fetchProductDetailsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetailsByIdAsync.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "success";
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.products.push(action.payload);
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.details = action.payload;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const allProducts = (state) => state.product.products;
export const totalItems = (state) => state.product.totalItems;
export const allCategories = (state) => state.product.categories;
export const allBrands = (state) => state.product.brands;
export const selectedProductDetails = (state) => state.product.details;
export const selectedProductStatus = (state) => state.product.status;

export default productSlice.reducer;
