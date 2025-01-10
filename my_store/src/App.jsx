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
  const [Product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products.");
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
        <div className="loader d-flex">
          <div className="bars bar1"></div>
          <div className="bars bar2"></div>
          <div className="bars bar3"></div>
          <div className="bars bar4"></div>
          <div className="bars bar5"></div>
          <div className="bars bar6"></div>
          <div className="bars bar7"></div>
          <div className="bars bar8"></div>
          <div className="bars bar9"></div>
          <div className="bars bar10"></div>
        </div>

    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-header">
            <span className="error-title">Oops! Something went wrong</span>
          </div>
          <p className="error-message">please try again .</p>
        </div>
      </div>      
    )
  }

  return (
    <>
      <ProductsContext.Provider value={Product}>
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
