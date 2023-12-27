import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import {
  getCartFromLocalStorage,
  modifyCart,
  updateCartInLocalStorage,
} from "../utils/CartUtility";

const ProductDetailsPage = () => {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  useEffect(() => {
    setCart(getCartFromLocalStorage);
    const fetchProductData = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", productId));
        if (productDoc.exists()) {
          setProduct(productDoc.data());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const updatedCart = modifyCart(cart, product, true, quantity);
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart);
    }
  };

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={product.productImage}
            alt="name"
            className="img-thumbnail w-75"
          />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-start">
          <h2>{product?.productName}</h2>
          <p className="text-muted mb-4">{product?.productDescription}</p>
          <p className="text-info mb-2">Weight: {product?.productWeight} gr</p>
          <p className="text-success mb-2">
            Price: £{product?.productPrice.toFixed(2)}
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
          <button onClick={handleAddToCart} className="btn btn-primary mt-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
