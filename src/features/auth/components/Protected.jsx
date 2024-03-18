import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);

  return user ? children : <Navigate to="/login" replace={true} />;
};

export default Protected;
