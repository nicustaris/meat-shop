import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./../Home/HomePage";
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Signin";
import Logout from "../Authentication/Logout";
import ProductsPage from "../Products/ProductsPage";
import Cart from "../Cart/Cart";
import ProductDetailsPage from "../Products/ProductDetailsPage";
import CurrentOffersPage from "../CurrentOffers/CurrentOfffersPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/products" element={<ProductsPage />}></Route>
      <Route path="/current-offers" element={<CurrentOffersPage />}></Route>
      <Route
        path="/products/:productId"
        element={<ProductDetailsPage />}
      ></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
    </Routes>
  );
};

export default Routing;
