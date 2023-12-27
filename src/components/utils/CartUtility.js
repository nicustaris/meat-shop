export const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const updateCartInLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const modifyCart = (cart, product, operation, quantity = 1) => {
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    const updatedCart = [...cart];

    if (operation) {
      updatedCart[existingProductIndex].quantity += quantity;
    } else {
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      }
    }

    return updatedCart;
  } else {
    return [...cart, { ...product, quantity: quantity }];
  }
};

export const removeFromCart = (cart, productId) => {
  const updatedCart = cart.filter((item) => item.id !== productId);
  return updatedCart;
};
