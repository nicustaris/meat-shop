import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import logo from "../../assets/logo.png";
import { useUserAuth } from "../../context/UserAuthContext";
import Navlinks from "./Navlinks";
import { Link, NavLink } from "react-router-dom";
import shopping_cart from "./shopping-cart.svg";
import { getCartFromLocalStorage } from "../utils/CartUtility";
import navigation from "./../config/navigation";
import slugify from "slugify";
import { useProductsContext } from "./../../context/ProductsContext";

const CustomNavbar = () => {
  const { data: products } = useProductsContext();
  const { user } = useUserAuth();
  const [cartItems, setCartItems] = useState(getCartFromLocalStorage());

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setCartItems(getCartFromLocalStorage());
    if (search.trim() !== "") {
      const filteredResults = products
        .filter((product) =>
          product.productName.toLowerCase().includes(search.toLowerCase())
        )
        .map((product) => ({ id: product.id, name: product.productName }));
      setSuggestions(filteredResults);
    } else {
      setSuggestions([]);
    }
  }, [search]);

  console.log(search);
  return (
    <>
      <Navbar bg="white" variant="black" expand="lg">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center ps-5 pe-5"
        >
          <div className="d-flex align-items-center">
            <Navbar.Brand as={Link} to="/">
              <img
                src={logo}
                alt="logo"
                className="d-inline-block align-top logo"
                style={{ width: "80px" }}
              />
            </Navbar.Brand>
            <Form className="d-flex position-relative">
              <div style={{ flex: "1", width: "300px" }}>
                <FormControl
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type="text"
                  placeholder="Search Products"
                  className="mr-2 w-100"
                />
              </div>
              <Button variant="outline-success">Search</Button>
              {suggestions.length > 0 && (
                <ul
                  className="position-absolute d-flex flex-column p-0"
                  style={{
                    width: "300px",
                    listStyleType: "none",
                    top: "100%",
                    left: "0",
                    zIndex: 1,
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="mx-3 my-2">
                      <Link
                        to={`/products/${suggestion.id}`}
                        onClick={() => {
                          setSuggestions([]);
                          setSearch("");
                        }}
                        className="text-decoration-none text-dark"
                      >
                        {suggestion.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Form>
          </div>

          <Nav className="d-flex align-items-center">
            {user && <Navlinks title="My Profile" link="/" />}
            {!user && (
              <>
                <Navlinks title="Sign Up" link="/signup" />
                <Navlinks title="Sign In" link="/signin" />
              </>
            )}
            {user && (
              <>
                <Navlinks title="Sign Out" link="/logout" />
              </>
            )}
            <NavLink
              to="/cart"
              className="text-decoration-none text-dark mx-2 position-relative"
            >
              <img
                src={shopping_cart}
                style={{ width: "24px" }}
                alt="Shopping Cart"
              />
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary">
                {cartItems.length}
              </span>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-1">
        <Container fluid>
          <Nav className="ml-3">
            <Nav.Link as={Link} to="/" className="nav-link-category text-white">
              Home
            </Nav.Link>
            {navigation.map((category, i) => (
              <Nav.Link
                key={i}
                as={Link}
                to={`/${slugify(category, { lower: true })}`}
                className="nav-link-category text-white"
              >
                {category}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
