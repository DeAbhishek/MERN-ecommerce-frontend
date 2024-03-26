import axios from "axios";

// const USER_URL = "http://localhost:8080/users";

const ORDER_URL = "http://localhost:8080/orders";

export const fetchLoggedInUserOrder = async (userID) => {
  const { data } = await axios.get(`${ORDER_URL}?users.id=${userID}`);
  
  return data;
};
