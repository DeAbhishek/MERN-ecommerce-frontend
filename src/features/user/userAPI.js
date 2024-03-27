import axios from "axios";

const USER_URL = "http://localhost:8080/users";

const ORDER_URL = "http://localhost:8080/orders";

export const fetchLoggedInUserOrder = async (userID) => {
  const { data } = await axios.get(`${ORDER_URL}?users.id=${userID}`);
  return data;
};

export const updateUser = async (updatedUserData) => {
  const { data } = await axios.put(`${USER_URL}/${updatedUserData.id}`, updatedUserData);
  return data;
};

export const fetchLoggedInUser = async (userID) => {
  const { data } = await axios.get(`${USER_URL}/${userID}`);
  return data;
};
