import React from "react";
import Navbar from "../components/Navbar";
import UserOrders from "../features/user/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <Navbar pageName="MY ORDERS">
      <UserOrders />
    </Navbar>
  );
};

export default UserOrdersPage;
