import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../AuthSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync());
  }, [dispatch]);
  return <>{!user && <Navigate to={"/login"} replace={true} />}</>;
};

export default Logout;
