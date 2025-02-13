import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Cinema from "./pages/Cinema";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import OrderPage from "./pages/Order";
import Ticket from "./pages/Ticket";
import Product from "./pages/Products";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/*" element={
          isAuthenticated ? (
            <>
              <Header onLogout={handleLogout} />
              <div className="d-flex">
                <Sidebar />
                <div className="p-3 flex-grow-1">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cinema" element={<Cinema />} />
                    <Route path="/movie" element={<Movie />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/ticket" element={<Ticket />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
