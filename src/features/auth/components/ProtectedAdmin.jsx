import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);


  return user ? (
    user.role === "admin" ? (
      children
    ) : (
      <Navigate to="/" replace={true} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );

};

export default ProtectedAdmin;
