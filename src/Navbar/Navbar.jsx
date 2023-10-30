import React from "react";

import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="align_center">
        <img src={logo} alt="logo" />
        <form className="align_center navbar_form">
          <input
            type="text"
            placeholder="Search Products"
            className="navbar_search"
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <a href="">Home</a>
        <a href="">Products</a>
        <a href="">Special Offers</a>
        <a href="">About Us</a>
        <a href="">Cart</a>
        <a href="">Sign Up</a>
        <a href="">Sign In</a>
      </div>
    </nav>
  );
};

export default Navbar;
