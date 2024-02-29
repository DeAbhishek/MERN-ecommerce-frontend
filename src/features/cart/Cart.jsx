// import { useSelector, useDispatch } from "react-redux";
// import { increment, incrementAsync, selectCount } from "./CartSlice";

import Cart from "../../components/Cart";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function Counter() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();

  return (
    <div className="mx-auto my-5 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
      <Cart
        products={products}
        headerMargin={"my-5"}
        btnName="Checkout"
        link="/checkout"
      />
    </div>
  );
}
