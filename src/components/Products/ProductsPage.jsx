import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsContext";
import slugify from "slugify";

import "./ProductsPage.css";
import ProductCard from "./ProductCard";
import {
  modifyCart,
  getCartFromLocalStorage,
  updateCartInLocalStorage,
} from "../utils/CartUtility";

import categories from "../config/categories";

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const { data: products } = useProductsContext();
  const [sortBy, setSortBy] = useState("price");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryURL = searchParams.get("category");

  useEffect(() => {
    setCart(getCartFromLocalStorage());
  }, []);

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleAddToCart = (product, operator, quantity) => {
    const updatedCart = modifyCart(cart, product, operator, quantity);
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const filteredProducts = categoryURL
    ? products.filter((product) => product.productCategory === categoryURL)
    : products;

  return (
    <div className="products-container container-fluid">
      <div className="row">
        <div className="col-md-2 filters-sidebar">
          <h2>Filters</h2>
          <div className="filter-line" />
          <div className="filters_category">
            <p className="categories-label">Categories</p>
            <ul className="mx-2">
              <li>
                <Link
                  to="/products"
                  className={`text-decoration-none text-dark ${
                    !categoryURL ? "fw-semibold" : ""
                  }`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/products?category=${slugify(category, {
                      lower: true,
                      replacement: "",
                    })}`}
                    className={`text-decoration-none text-dark ${
                      slugify(category, { lower: true, replacement: "" }) ===
                      categoryURL
                        ? "fw-semibold"
                        : ""
                    }`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-10 products-main">
          <div className="sort-by d-flex justify-content-end">
            <label htmlFor="sortBy">Sort By:</label>
            <select
              id="sortBy"
              onChange={(e) => handleSortByChange(e.target.value)}
              value={sortBy}
            >
              <option value="price">Price</option>
              <option value="alphabet">Alphabet</option>
            </select>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {filteredProducts.length === 0 ? (
              <p className="fw-bold">
                No products found in the selected category.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
