import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Components/Signup";
import Update from "./Pages/Update/Update";
import { CartProvider } from "./Context/CartManager/CartManager";
import Buyer from "./Pages/Buyer/Buyer";
import Seller from "./Pages/Seller/Seller";
import "./App.css";
import Cart from "./Pages/MyCart/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Successfully logged out");
  };
  const showNavbar = user;
  const showFooter = user;
  return (
    <div className="bg-[#f4f4fb] min-h-screen flex flex-col">
      {showNavbar && <Navbar onLogout={handleLogout} />}
      <div className="flex-grow dark:bg-black">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home onLogout={handleLogout} />} />
              <Route path="/Buyer" element={<Buyer onLogout={handleLogout} />} />
              <Route
                path="/Seller"
                element={<Seller onLogout={handleLogout} />}
              />
              <Route
                path="/Update/:id"
                element={<Update onLogout={handleLogout} />}
              />
              <Route path="/Cart" element={<Cart onLogout={handleLogout} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login onLogin={setUser} />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </div>
      {showFooter && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  );
}
