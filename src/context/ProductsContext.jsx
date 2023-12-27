import { useState, useEffect, createContext, useContext } from "react";

import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const productsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const value = collection(db, "products");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const products = await getDocs(value);
      // setData(products.docs.map((doc) => doc.data()));
      setData(products.docs.map((doc) => ({ ...doc.data() })));
    };
    getData();
  }, []);

  return (
    <productsContext.Provider value={{ data }}>
      {children}
    </productsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(productsContext);
};
