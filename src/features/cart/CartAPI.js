import axios from "axios";
import { API_URL } from "../../constant";

const CART_URL = `${API_URL}cart`;

export const addToCart = async (item) => {
  const response = await axios.post(CART_URL, item);
  return response.data;
};

export const fetchItemsByUserId = async () => {
  const response = await axios.get(CART_URL);
  return response.data;
};

export const updateCart = async (updatedItem) => {
  const response = await axios.patch(
    `${CART_URL}/${updatedItem.id}`,
    updatedItem
  );
  return response.data;
};

export const deleteItemFromCart = async (itemId) => {
  await axios.delete(`${CART_URL}/${itemId}`);
  return itemId;
};

export const resetCart = async () => {
  const { data } = await axios.get(CART_URL);
  for (let item of data) {
    await axios.delete(`${CART_URL}/${item.id}`);
  }
  return "success";
};
