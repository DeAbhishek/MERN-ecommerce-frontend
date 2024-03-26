import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { fetchItemsByUserIdAsync, resetCartAsync } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { resetCurrentOrder } from "./orderSlice";

const OrderSuccessPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(resetCartAsync(user.id));
    dispatch(resetCurrentOrder());
    if (!user) return;
    dispatch(fetchItemsByUserIdAsync(user.id));
  }, [dispatch, user]);

  return !params.id ? (
    <Navigate to="/" replace={true} />
  ) : (
    <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">
          Order Number #{params.id}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Order Successfully Placed.
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          You can check your order in My Account {">"} My order
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>

          <a
            href="mailto:deabhishek06@gmail.com"
            className="text-sm font-semibold text-blue-600 hover:text-xl hover:underline flex items-center gap-1 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 group-hover:w-6 group-hover:h-6"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            deabhishek06@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
