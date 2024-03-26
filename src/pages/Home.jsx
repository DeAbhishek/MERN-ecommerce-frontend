import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ProductList from "../features/product/components/ProductList";
import { useEffect } from "react";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "../features/cart/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (!user) return;
    dispatch(fetchItemsByUserIdAsync(user.id));
  }, [dispatch, user]);
  return (
    <>
      <Navbar>
        <ProductList />
      </Navbar>
    </>
  );
};

export default Home;
