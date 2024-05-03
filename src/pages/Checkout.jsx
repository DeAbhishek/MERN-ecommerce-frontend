import { useDispatch, useSelector } from "react-redux";
import Cart from "../components/Cart";
import { selectCart } from "../features/cart/cartSlice";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { discountPrice } from "../constant";

const Checkout = () => {
  const cartItems = useSelector(selectCart);
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const totalAmount = cartItems.reduce(
    (amount, item) => amount + discountPrice(item.product) * item.quantity,
    0
  );
  const totalItem = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleOrder = () => {
    if (!selectedAddress) return;
    dispatch(
      createOrderAsync({
        items: cartItems,
        totalItem,
        totalAmount,
        user: user.id,
        selectedAddress,
        paymentMethod,
        status: "pending",
      })
    );
  };

  return !cartItems.length ? (
    <Navigate to={"/cart"} replace={true} />
  ) : currentOrder ? (
    <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
  ) : (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 mx-auto py-5 my-5 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white lg:divide-x divide-gray-200">
      <form
        className="lg:col-span-3"
        noValidate
        onSubmit={handleSubmit((data) => {
          dispatch(
            updateUserAsync({ ...user, addresses: [...user.addresses, data] })
          );
          reset();
        })}
      >
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-3xl font-bold tracking-tight leading-10 text-gray-900">
            Personal Information
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required.",
                  })}
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value:
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                      message: "Invalid email address.",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone is required.",
                  })}
                  id="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street", {
                    required: "Street address is required.",
                  })}
                  id="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.streetAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city", {
                    required: "City is required.",
                  })}
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("state", {
                    required: "State / Province is required.",
                  })}
                  id="state"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.region && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.region.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("pincode", {
                    required: "ZIP / Postal code is required.",
                  })}
                  id="pincode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.pinCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Address
          </button>
        </div>
        <div className="my-5">
          {user.addresses.length > 0 && (
            <>
              <h1 className="text-3xl font-bold tracking-tight leading-10 text-gray-900">
                Addresses
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing addresses
              </p>

              <ul className="divide-y divide-gray-100">
                {user.addresses.map((address, index) => (
                  <li key={index} className="flex justify-between gap-x-6 py-5">
                    <label className="flex items-center min-w-0 gap-x-4">
                      <input
                        name="address"
                        type="radio"
                        onChange={(e) => handleAddress(e)}
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />

                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.street}, {address.city}, {address.pincode},{" "}
                          {address.state}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.name}
                        </p>
                      </div>
                    </label>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {address.phone}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {address.email}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10">
            <fieldset>
              <legend className="text-3xl font-bold tracking-tight leading-10 text-gray-900">
                Payment Methods
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-cash"
                    name="payments"
                    type="radio"
                    onChange={(e) => handlePayment(e)}
                    value={"cash"}
                    checked={paymentMethod === "cash"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-cash"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    name="payments"
                    type="radio"
                    onChange={(e) => handlePayment(e)}
                    value={"card"}
                    checked={paymentMethod === "card"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="card"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Card Payment
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
      <div className="lg:col-span-2">
        <Cart headerMargin={"mb-5"}>
          {!selectedAddress ? (
            <button
              type="button"
              onClick={handleOrder}
              className="w-full flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600/90 cursor-not-allowed"
            >
              Please select a address
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOrder}
              className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Pay & Order
            </button>
          )}
        </Cart>
      </div>
    </div>
  );
};

export default Checkout;
