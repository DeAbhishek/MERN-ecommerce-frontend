import { useEffect, useState } from "react";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountPrice } from "../../../constant";

import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../../components/Pagination";

const orderStatus = [
  {
    value: "pandings",
    label: "Pandings",
  },
  {
    value: "shipped",
    label: "Shipped",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [OrderIdAlternating, setOrderIdAlternating] = useState(true);
  const [totalAmountAlternating, setTotalAmountAlternating] = useState(true);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {
    console.log("handleShow");
  };

  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };

  const handleSort = (sortOption) => {
    const newSort = `_sort=${sortOption.sort}&_order=${sortOption.order}`;
    setSort(newSort);
  };

  useEffect(() => {
    let pageLimit = `_page=${page}&_limit=${ITEMS_PER_PAGE}`;
    dispatch(fetchAllOrdersAsync({ page: pageLimit, sort }));
  }, [dispatch, page, sort]);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-400 ring-orange-700/10";
      case "shipped":
        return "bg-green-600 ring-green-700/10";
      case "delivered":
        return "bg-indigo-400 ring-indigo-700/10";
      case "cancelled":
        return "bg-red-600 ring-red-700/10";
      default:
        return "bg-orange-400 ring-orange-700/10";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer flex items-center gap-1"
                    onClick={() => {
                      setOrderIdAlternating(!OrderIdAlternating);
                      handleSort({
                        sort: "id",
                        order: OrderIdAlternating ? "desc" : "asc",
                      });
                    }}
                  >
                    Order#{" "}
                    {OrderIdAlternating ? (
                      <ArrowDownIcon className="size-4" />
                    ) : (
                      <ArrowUpIcon className="size-4" />
                    )}
                  </th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th
                    className="py-3 px-6 text-center cursor-pointer flex items-center gap-1"
                    onClick={() => {
                      setTotalAmountAlternating(!totalAmountAlternating);
                      handleSort({
                        sort: "totalAmount",
                        order: totalAmountAlternating ? "desc" : "asc",
                      });
                    }}
                  >
                    Total Amount{" "}
                    {totalAmountAlternating ? (
                      <ArrowDownIcon className="size-4" />
                    ) : (
                      <ArrowUpIcon className="size-4" />
                    )}
                  </th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        {/* <div className="mr-2"></div> */}
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              alt=""
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                            />
                          </div>
                          <span>
                            <strong>{item.product.title}</strong> - #{item.quantity} - $
                            {discountPrice(item.product)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        {order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="">
                        <div>{order.selectedAddress.name}</div>
                        <div>{order.selectedAddress.street}</div>
                        <div>{order.selectedAddress.city}</div>
                        <div>{order.selectedAddress.pincode}</div>
                        <div>{order.selectedAddress.state}</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleUpdate(e, order)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value={""}>--- choose status ---</option>
                          {orderStatus.map((status) => (
                            <option value={status.value} key={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} inline-flex text-white items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="mr-2 transform hover:text-indigo-500 hover:scale-110">
                          <EyeIcon
                            className="size-6"
                            onClick={() => handleShow()}
                          />
                        </div>
                        <div className=" transform hover:text-indigo-500 hover:scale-110">
                          <PencilIcon
                            className="size-6"
                            onClick={() => handleEdit(order)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={page}
              setPage={setPage}
              totalItems={totalOrders}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
