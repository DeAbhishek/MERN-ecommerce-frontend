import { Link } from "react-router-dom";
import Cart from "../../components/Cart";

export default function Counter() {
  return (
    <div className="mx-auto my-5 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
      <Cart headerMargin={"my-5"}>
        <Link
          to={"/checkout"}
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </Link>
      </Cart>
    </div>
  );
}
