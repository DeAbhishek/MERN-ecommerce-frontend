import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  return user ? (
    userInfo.role === "admin" ? (
      children
    ) : (
      <Navigate to="/" replace={true} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedAdmin;
