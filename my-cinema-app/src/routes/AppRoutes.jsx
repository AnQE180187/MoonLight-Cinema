import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Cinema from "./pages/Cinema";
import Movie from "./pages/Movie";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <>
            <Header />
            <div className="d-flex">
              <Sidebar />
              <div className="p-3 flex-grow-1">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cinema" element={<Cinema />} />
                  <Route path="/movie" element={<Movie />} />
                </Routes>
              </div>
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
