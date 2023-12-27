import React from "react";
import { BsArrowUp, BsArrowDown, BsTrash } from "react-icons/bs";

const CartItem = ({ product, handleQuantityChange, handleRemoveFromCart }) => {
  console.log("Type of productPrice:", typeof product.productPrice);

  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center">
        <img
          src={product.productImage}
          alt={product.productName}
          className="img-thumbnail mr-3"
          style={{ width: "100px" }}
        />
        <div className="flex-grow-1" style={{ marginLeft: "10px" }}>
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">Price: £{product.productPrice.toFixed(2)}</p>
        </div>
        <div className="d-flex align-items-center">
          <button
            onClick={() => handleQuantityChange(product, true)}
            className="btn btn-link text-primary"
          >
            <BsArrowUp />
          </button>
          <span className="font-weight-bold mx-2">{product.quantity}</span>
          <button
            onClick={() => handleQuantityChange(product, false)}
            className="btn btn-link text-warning"
          >
            <BsArrowDown />
          </button>
          <button
            onClick={() => handleRemoveFromCart(product.id)}
            className="btn btn-link text-danger ml-auto"
          >
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
