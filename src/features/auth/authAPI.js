import axios from "axios";

const USER_URL = "http://localhost:8080/users";

export const createUser = async (userData) => {
  const response = await axios.post(USER_URL, {
    email: userData.email,
    password: userData.password,
  });
  return response.data;
};

export const checkUser = async (logInData) => {
  let email = logInData.email;
  let password = logInData.password;

  const response = await axios
    .get(`${USER_URL}?email=${email}`)
    .then((res) =>
      res.data.length
        ? res.data[0].password === password
          ? { id: res.data[0].id }
          : "Invalid Credentials"
        : "User Not Found"
    )
    .catch((error) => error);

  return response;
};
