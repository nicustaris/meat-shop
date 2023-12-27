import React from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { ProductsContextProvider } from "./context/ProductsContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="app">
      <UserAuthContextProvider>
        <ProductsContextProvider>
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </ProductsContextProvider>
      </UserAuthContextProvider>
    </div>
  );
};

export default App;
