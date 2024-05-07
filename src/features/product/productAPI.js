import axios from "axios";
import { API_URL } from "../../constant";

const PRODUCT_URL = `${API_URL}products`;
const CATEGORIES_URL = `${API_URL}categories`;
const BRANDS_URL = `${API_URL}brands`;

export const fetchProductsByFilter = async (nwArr) => {
  let filterString = "";
  for (let obj of nwArr[0]) {
    filterString += `${Object.keys(obj)[0]}=${obj[Object.keys(obj)[0]]}&`;
  }
  let sortString = nwArr[1];
  let pageString = nwArr[2];
  const response = await axios.get(
    `${PRODUCT_URL}?${pageString}&${sortString}&${filterString}`
  );
  const totalItems = await response.headers.get("X-Total-Count");
  return {
    products: response.data,
    totalItems,
  };
};

export const fetchCategories = async () => {
  const response = await axios.get(CATEGORIES_URL);
  return response.data;
};

export const fetchBrands = async () => {
  const response = await axios.get(BRANDS_URL);
  return response.data;
};

export const fetchProductDetailsById = async (id) => {
  const response = await axios.get(`${PRODUCT_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const { data } = await axios.post(PRODUCT_URL, product);
  return data;
};

export const updateProduct = async (updatedProduct) => {
  const { data } = await axios.patch(
    `${PRODUCT_URL}/${updatedProduct.id}`,
    updatedProduct
  );
  return data;
};
