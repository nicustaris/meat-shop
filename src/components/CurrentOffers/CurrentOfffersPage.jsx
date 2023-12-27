import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Card } from "react-bootstrap";
import categories from "../config/categories";
import { useProductsContext } from "../../context/ProductsContext";
import ProductCard from "../Products/ProductCard";
import { useLocation } from "react-router-dom";
import slugify from "slugify";

const CurrentOffersPage = () => {
  const { data: products } = useProductsContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filterBy = searchParams.get("filterBy");

  const filteredProducts = filterBy
    ? products.filter(
        (product) =>
          product.productDiscountPercentage > 0 &&
          product.productCategory === filterBy
      )
    : products.filter((product) => product.productDiscountPercentage > 0);
  console.log(filteredProducts.length);
  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="2" className="text-center bg-light fw-bold fs-2">
              Current Offers and Discounts
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" className="text-center">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Link to="/current-offers">
                    <Button variant="secondary" className="m-2">
                      All
                    </Button>
                  </Link>
                </li>
                {categories.map((category, index) => (
                  <li key={index} className="list-inline-item">
                    <Link
                      to={`?filterBy=${slugify(category, {
                        lower: true,
                        replacement: "",
                      })}`}
                    >
                      <Button variant="secondary" className="m-2">
                        {category}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="row mt-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center mt-4">
            <p>
              Sorry, there are currently no products on promotion for the{" "}
              <strong>{filterBy}</strong> category.
            </p>
            <p>
              Check back later for exciting offers and discounts on your
              favorite products!
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      {/* <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th colSpan="2" className="text-center bg-light fw-bold fs-2">
              Offers you may like
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table> */}
    </div>
  );
};

export default CurrentOffersPage;
