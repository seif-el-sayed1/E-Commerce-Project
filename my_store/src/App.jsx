import Navbar from "./home/nav";
import Welcome from "./home/welcome";
import Products from "./home/products";
import Details from "./home/details";
import Cart from "./cart";
import Category from "../src/categories";
import Login from "./log/login";
import Signup from "./log/signup";
import About from "../src/about";
import Contact from "../src/contact";
import Footer from "../src/home/footer";
import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

export const ProductsContext = createContext();
function App() {
  const [product, setProduct] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true); 
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) {
    return (
      <div className="loader d-flex justify-content-center align-items-center vh-100">
        <p className="text fw-bold">
          <span className="letter letter1">L</span>
          <span className="letter letter2">o</span>
          <span className="letter letter3">a</span>
          <span className="letter letter4">d</span>
          <span className="letter letter5">i</span>
          <span className="letter letter6">n</span>
          <span className="letter letter7">g</span>
          <span className="letter letter8">.</span>
          <span className="letter letter9">.</span>
          <span className="letter letter10">.</span>
        </p>
      </div>
    )
  }

  return (
    <>
      <ProductsContext.Provider value={product}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Welcome />
                <Products />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Cart />
              </>
            }
          />
          <Route
            path="/details"
            element={
              <>
                <Details />
              </>
            }
          />
          <Route
            path="/category"
            element={
              <>
                <Category />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/sign_up"
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <About />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Contact />
              </>
            }
          />
        </Routes>
        <Footer />
      </ProductsContext.Provider>
    </>
  );
}

export default App;
