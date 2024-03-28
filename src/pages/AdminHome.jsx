import Navbar from "../components/Navbar";
import AdminProductList from "../features/admin/components/AdminProductList";

const AdminHome = () => {
  return (
    <Navbar pageName="Admin">
      <AdminProductList />
    </Navbar>
  );
};

export default AdminHome;
