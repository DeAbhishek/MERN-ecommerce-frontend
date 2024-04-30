import axios from "axios";

const CART_URL = "http://localhost:8080/cart";

export const addToCart = async (item) => {
  const response = await axios.post(CART_URL, item);
  return response.data;
};

export const fetchItemsByUserId = async (userId) => {
  const response = await axios.get(`${CART_URL}?user=${userId}`);
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

export const resetCart = async (userId) => {
  const { data } = await axios.get(`${CART_URL}?user=${userId}`);
  for (let item of data) {
    await axios.delete(`${CART_URL}/${item.id}`);
  }
  return "success";
};
