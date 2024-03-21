import axios from "axios";

const ORDER_URL = "http://localhost:8080/orders";

export const createOrder = async (order) => {
  const response = await axios.post(ORDER_URL, order);
  return response.data;
};
