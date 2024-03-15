import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { totalItems } from "../features/product/productSlice";
import { ITEMS_PER_PAGE } from "../constant";
import { useEffect } from "react";

const Pagination = ({ page, setPage, sort }) => {
  const totalProducts = useSelector(totalItems);
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  useEffect(() => {
    setPage(1);
  }, [setPage, totalProducts, sort]);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            if (page === 1) return;
            setPage(page - 1);
          }}
        >
          Previous
        </button>
        <button
          className="relative m l-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            if (page === totalPages) return;
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalProducts
                ? totalProducts
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                if (page === 1) return;
                setPage(page - 1);
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({
              length: totalPages,
            }).map((item, index) => (
              <button
                onClick={() => setPage(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  page === index + 1
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-indigo-500`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                if (page === totalPages) return;
                setPage(page + 1);
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
