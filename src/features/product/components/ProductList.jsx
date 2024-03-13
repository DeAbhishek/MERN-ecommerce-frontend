import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import SidebarFilters from "../../../components/SidebarFilters";
import { useEffect } from "react";
import { fetchAllProductsAsync, selectProducts } from "../productSlice"


export default function ProductList() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync())
  }, [dispatch]);
  return (
    <SidebarFilters>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-3 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Link to={"/product-details"}>
                <div
                  key={product.id}
                  className="group relative border border-gray-200 p-2"
                >
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
                        <a href={product.thumbnail}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </a>
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
                        $
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SidebarFilters>
  );
}
