import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectCart,
  selectCartStatus,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { discountPrice } from "../constant";
import { Grid } from "react-loader-spinner";
import Modals from "./Modals";

const Cart = ({ headerMargin, children }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const status = useSelector(selectCartStatus);

  const [openModal, setOpenModal] = useState(null);

  const totalAmount = cart.reduce(
    (amount, item) => amount + discountPrice(item.product) * item.quantity,
    0
  );
  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);

  const handleQty = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleDelete = (productId) => {
    dispatch(deleteItemFromCartAsync(productId));
  };

  return !cart.length ? (
    <div className="px-4 py-6 sm:px-6">
      <div className="h-[70dvh] flex flex-col justify-center">
        <div className="flex justify-center text-base font-medium text-gray-900">
          Your cart is empty
        </div>
        <p className="flex justify-center mt-0.5 text-sm text-gray-500">
          Let's go but something!
        </p>
      </div>
      <div className="mt-6">
        <Link
          to={"/"}
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500"></div>
    </div>
  ) : (
    <>
      <div className="px-4 pb-6 sm:px-6 relative">
        <h1
          className={`text-4xl font-bold tracking-tight text-gray-900 ${headerMargin}`}
        >
          Cart
        </h1>
        <Grid
          visible={status === "loading"}
          height="80"
          width="80"
          color="#4f46e5"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <p>{item.product.title}</p>
                      </h3>
                      <p className="ml-4">
                        ${discountPrice(item.product)}{" "}
                        {item.quantity > 1 && <>× {item.quantity}</>}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.product.brand}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label
                        htmlFor="qty"
                        className="text-sm font-medium leading-6 text-gray-900 me-2"
                      >
                        Qty
                      </label>
                      <select
                        id="qty"
                        onChange={(e) => handleQty(e, item)}
                        value={item.quantity}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="flex">
                      <Modals
                        title={`Delete ${item.product.title}`}
                        message={`Would you want to remove ${item.product.title} from your cart?`}
                        btnName="Delete"
                        deleteAction={() => handleDelete(item.id)}
                        cancelAction={() => setOpenModal(null)}
                        showModal={openModal === item.product.id}
                      />
                      <button
                        type="button"
                        onClick={() => setOpenModal(item.id)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 px-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalAmount}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Total Items {totalItem}</p>
        <div className="mt-6">
          {children}
          {/* <Link
            to={link}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {btnName}
          </Link> */}
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to={"/"}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Cart;
