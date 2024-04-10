import React from "react";
import ProductDetails from "../features/product/components/ProductDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetailsPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetails />
      </Navbar>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
