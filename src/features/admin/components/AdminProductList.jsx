import { useDispatch, useSelector } from "react-redux";
import {
  allProducts,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFilterAsync,
  selectedProductStatus,
} from "../../product/productSlice";
import { useEffect } from "react";
import SidebarFilters from "../../../components/SidebarFilters";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { discountPrice } from "../../../constant";
import { Grid } from "react-loader-spinner";

const AdminProductList = () => {
  const products = useSelector(allProducts);
  const dispatch = useDispatch();
  const status = useSelector(selectedProductStatus);

  useEffect(() => {
    let nwArr = ["", "", "_page=1&_limit=9"];
    dispatch(fetchProductsByFilterAsync(nwArr));
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);
  return (
    <SidebarFilters>
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


      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-3 lg:max-w-7xl lg:px-8">
          <Link
            to="/admin/product-form"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add New Product
          </Link>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Link
                to={`/amdin/product-details/${product.id}`}
                key={product.id}
              >
                <div className="group relative border border-gray-200 p-2">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <div>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </div>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 flex items-center gap-x-1">
                        <StarIcon className="h-6 w-6 inline-block text-yellow-500" />{" "}
                        <span>{product.rating}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 line-through">
                        ${product.price}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        ${discountPrice(product)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 justify-center">
                  {product.deleted && (
                    <span className="uppercase tracking-widest inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-sm font-medium text-white ring-1 ring-inset ring-red-700/10">
                      DELETED
                    </span>
                  )}
                  {product.stock < 1 && (
                    <span className="uppercase tracking-widest inline-flex items-center rounded-md bg-orange-600 px-2 py-1 text-sm font-medium text-white ring-1 ring-inset ring-orange-700/10">
                      Out f Stock
                    </span>
                  )}
                </div>
                <div className="flex justify-center mt-3">
                  <Link
                    to={`/amdin/product-form/edit/${product.id}`}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit Product
                  </Link>
                  {/* <button
                    type="button"
                    // onClick={() => handleRemove(index)}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SidebarFilters>
  );
};

export default AdminProductList;
