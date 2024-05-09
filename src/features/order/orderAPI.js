import axios from "axios";
import { API_URL } from "../../constant";

const ORDER_URL = `${API_URL}orders`;

export const createOrder = async (order) => {
  const response = await axios.post(ORDER_URL, order);
  return response.data;
};

export const fetchAllOrders = async ({ page, sort }) => {
  const response1 = await axios.get(`${ORDER_URL}?${page}&${sort}`);
  const response2 = await axios.get(ORDER_URL);
  return {
    orders: response1.data,
    totalOrders: response2.data.length,
  };
};

export const updateOrder = async (updatedOrder) => {
  const { data } = await axios.patch(
    `${ORDER_URL}/${updatedOrder.id}`,
    updatedOrder
  );
  return data;
};
