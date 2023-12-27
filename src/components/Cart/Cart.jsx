import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import {
  getCartFromLocalStorage,
  modifyCart,
  removeFromCart,
  updateCartInLocalStorage,
} from "../utils/CartUtility";

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(getCartFromLocalStorage());
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = removeFromCart(cart, productId);
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const handleQuantityChange = (product, operator) => {
    const updatedCart = modifyCart(cart, product, operator);
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      {cart.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          handleQuantityChange={handleQuantityChange}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
      <div className="alert alert-info mt-3">Total: £100</div>
      <button className="btn btn-success" onClick={() => onCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
