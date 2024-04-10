import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductList from "../features/product/components/ProductList";

const Home = () => {
  return (
    <>
      <Navbar>
        <ProductList />
      </Navbar>
      <Footer />
    </>
  );
};

export default Home;
