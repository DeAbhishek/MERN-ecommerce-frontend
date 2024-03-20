import Cart from "../components/Cart";

const addresses = [
  {
    name: "Leslie Alexander",
    // email: "leslie.alexander@example.com",
    street: "11th Main",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700094",
    phone: 7980804436,
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    street: "11th Main",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700094",
    phone: 7980804436,
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    street: "11th Main",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700094",
    phone: 7980804436,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    street: "11th Main",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700094",
    phone: 7980804436,
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    street: "11th Main",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700094",
    phone: 7980804436,
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    street: "11th Main",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700094",
    phone: 7980804436,
  },
];

const Checkout = () => {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 mx-auto py-5 my-5 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white divide-x divide-gray-200">
      <form className="lg:col-span-3">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-3xl font-bold tracking-tight leading-10 text-gray-900">
            Personal Information
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
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
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
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
          <h1 className="text-3xl font-bold tracking-tight leading-10 text-gray-900">
            Addresses
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose from Existing addresses
          </p>

          <ul className="divide-y divide-gray-100">
            {addresses.map((address) => (
              <li
                key={address.email}
                className="flex justify-between gap-x-6 py-5"
              >
                <label className="flex items-center min-w-0 gap-x-4">
                  <input
                    name="address"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />

                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.street} {address.city} {address.pinCode}{" "}
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
        <Cart headerMargin={"mb-5"} btnName="Pay & Order" link="/" />
      </div>
    </div>
  );
};

export default Checkout;
