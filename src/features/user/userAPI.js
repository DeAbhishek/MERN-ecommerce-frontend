import axios from "axios";
import { API_URL } from "../../constant";

const USER_URL = `${API_URL}users`;

const ORDER_URL = `${API_URL}orders`;

export const fetchLoggedInUserOrder = async (userID) => {
  const { data } = await axios.get(`${ORDER_URL}/user/${userID}`);
  return data;
};

export const updateUser = async (updatedUserData) => {
  const { data } = await axios.patch(`${USER_URL}/${updatedUserData.id}`, updatedUserData);
  return data;
};

export const fetchLoggedInUser = async (userID) => {
  const { data } = await axios.get(`${USER_URL}/${userID}`);
  return data;
};
