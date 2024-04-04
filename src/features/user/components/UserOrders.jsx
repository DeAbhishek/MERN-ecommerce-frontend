import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsync, loggedInUserOrders, selectUserInfo } from "../userSlice";
import { discountPrice } from "../../../constant";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(loggedInUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch, user]);
  return (
    <>
      {orders.map((order) => (
        <div key={order.id} className="bg-white mb-3">
          <div className="px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <h1
                className={`text-4xl font-bold tracking-tight text-gray-900 mb-4`}
              >
                Order #{order.id}
              </h1>
              <h3 className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 capitalize">
                {order.status}
              </h3>
            </div>
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {order.items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <p>{product.title}</p>
                          </h3>
                          <p className="ml-4">
                          ${discountPrice(product)}{" "}
                            {product.quantity > 1 && <>× {product.quantity}</>}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <p className="text-sm font-medium leading-6 text-gray-900 me-2">
                            Qty : {product.quantity}
                          </p>
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
              <p>${order.totalAmount}</p>
            </div>
            <div className="mt-0.5 text-sm text-gray-500">
              <p>Total Items {order.totalItem}</p>
            </div>
            <p className="text-base font-medium text-gray-900 mt-3">Shipping Info.</p>
            <div className="flex justify-between gap-x-6">
              <div className="flex items-center min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-500">
                    {order.selectedAddress.street}, {order.selectedAddress.city}
                    , {order.selectedAddress.pincode},{" "}
                    {order.selectedAddress.state}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.name}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {order.selectedAddress.phone}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {order.selectedAddress.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserOrders;
