import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  allBrands,
  allCategories,
  clearSelectedProduct,
  createProductAsync,
  fetchProductDetailsByIdAsync,
  selectedProductDetails,
  selectedProductStatus,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modals from "../../../components/Modals";
import { Grid } from "react-loader-spinner";

const ProductForm = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const brands = useSelector(allBrands);
  const categories = useSelector(allCategories);
  const productDeatils = useSelector(selectedProductDetails);

  const status = useSelector(selectedProductStatus);
  const [openModal, setOpenModal] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    params.id
      ? dispatch(fetchProductDetailsByIdAsync(params.id))
      : dispatch(clearSelectedProduct());
  }, [params.id, dispatch]);

  useEffect(() => {
    if (productDeatils && params.id) {
      setValue("title", productDeatils.title);
      setValue("description", productDeatils.description);
      setValue("price", productDeatils.price);
      setValue("discountPercentage", productDeatils.discountPercentage);
      setValue("stock", productDeatils.stock);
      setValue("brand", productDeatils.brand);
      setValue("category", productDeatils.category);
      setValue("thumbnail", productDeatils.thumbnail);
      setValue("image1", productDeatils.images[0]);
      setValue("image2", productDeatils.images[1]);
      setValue("image3", productDeatils.images[2]);
    }
  }, [productDeatils, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...productDeatils };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    alert.info("This product is deleted!");
  };

  return (
    <>
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


      <form
        className="bg-white p-5"
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.rating = +productDeatils.rating || 0;
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          delete product.image1;
          delete product.image2;
          delete product.image3;
          product.price = +product.price;
          product.discountPercentage = +product.discountPercentage;
          product.stock = +product.stock;
          if (params.id) {
            product.id = params.id;
            dispatch(updateProductAsync(product));
          } else {
            dispatch(createProductAsync(product));
          }
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("title", { required: "Title is required." })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required.",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                {errors.description ? (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about this product.
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", {
                        required: "Price is required.",
                        min: 1,
                        max: 999999999999999,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.price?.type === "required" && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                  {errors.price?.type === "min" && (
                    <p className="mt-1 text-sm text-red-600">
                      Enter amount higher than 0
                    </p>
                  )}
                  {errors.price?.type === "max" && (
                    <p className="mt-1 text-sm text-red-600">
                      Enter amount lower than 999999999999999
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      step="0.01"
                      {...register("discountPercentage", {
                        min: 0,
                        max: 100,
                        required: "Discount is required.",
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.discountPercentage?.type === "required" && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.discountPercentage.message}
                    </p>
                  )}
                  {errors.discountPercentage?.type === "min" && (
                    <p className="mt-1 text-sm text-red-600">
                      Enter amount higher than 0
                    </p>
                  )}
                  {errors.discountPercentage?.type === "max" && (
                    <p className="mt-1 text-sm text-red-600">
                      Enter amount lower than 100
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "Stock is required.",
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    id="brand"
                    {...register("brand", {
                      required: "Brand is required.",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={""}>--- choose brand ---</option>
                    {brands.map((brand) => (
                      <option value={brand.value} key={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.brand && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.brand.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    {...register("category", {
                      required: "Category is required.",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={""}>--- choose category ---</option>
                    {categories.map((category) => (
                      <option value={category.value} key={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "Thumbnail is required.",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.thumbnail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.thumbnail.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image1")}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image2")}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image3")}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra
            </h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          {productDeatils && !productDeatils?.deleted && (
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          )}
          {productDeatils?.deleted && (
            <button
              type="button"
              // onClick={() => setOpenModal(true)}
              className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 cursor-not-allowed"
              disabled
            >
              Deleted
            </button>
          )}
          <button
            type="submit"
            disabled={Object.keys(errors).length}
            className="disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <Modals
        title={`Delete ${productDeatils?.title}`}
        message={`Would you want to remove ${productDeatils?.title} from your cart?`}
        btnName="Delete"
        deleteAction={handleDelete}
        cancelAction={() => setOpenModal(null)}
        showModal={openModal}
      />
    </>
  );
};

export default ProductForm;
