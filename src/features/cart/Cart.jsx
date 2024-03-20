import Cart from "../../components/Cart";


export default function Counter() {
  return (
    <div className="mx-auto my-5 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
      <Cart headerMargin={"my-5"} btnName="Checkout" link="/checkout" />
    </div>
  );
}
