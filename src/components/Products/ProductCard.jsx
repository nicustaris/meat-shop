import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { productName, productPrice, productDiscountPercentage } = product;
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const discountedPrice = productDiscountPercentage
    ? (productPrice - (productPrice / 100) * productDiscountPercentage).toFixed(
        2
      )
    : null;

  const handleAddToCartClick = () => {
    handleAddToCart(
      {
        ...product,
        productPrice: parseFloat(discountedPrice) || productPrice,
      },
      true,
      quantity
    );
    toast.success("Product successfully added to cart");
  };

  return (
    <div className="col mb-4">
      {product.productDiscountPercentage > 0 && (
        <div className="product-card position-relative">
          <div className="position-absolute top-0 end-0 p-2 bg-warning text-dark rounded-circle">
            <small>Promotion</small>
            <small> - {product.productDiscountPercentage}%</small>
          </div>
        </div>
      )}

      <div className="product-card">
        <img
          src={product.productImage}
          alt={productName}
          className="card-img-top"
          onClick={handleProductClick}
        />
        <div className="card-body">
          <h5 className="card-title">{productName}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <p
              className={`card-text mb-1 ${
                productDiscountPercentage > 0
                  ? "text-decoration-line-through"
                  : ""
              }`}
            >
              Price: £{productPrice.toFixed(2)}
            </p>
            <div className="quantity-control">
              <button
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1 ? true : false}
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>{" "}
          {productDiscountPercentage > 0 && (
            <p className="card-text mb-1 fw-bold">Price: £{discountedPrice}</p>
          )}
          <button
            className="btn btn-primary col mt-2 w-100"
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
