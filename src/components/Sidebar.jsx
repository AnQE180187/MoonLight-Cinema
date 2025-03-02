import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt, // Dashboard
  FaTheaterMasks, // Cinemas
  FaFilm, // Movies
  FaCalendarAlt, // Schedules
  FaShoppingCart, // Orders
  FaTicketAlt, // Tickets
  FaBoxOpen, // Products
  FaUsers, // Customers
  FaTools, // Equipment
  FaUserTie, // Employees
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className="sidebar-link">
          <FaTachometerAlt className="sidebar-icon" /> <span>Dashboard</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/cinema" className="sidebar-link">
          <FaTheaterMasks className="sidebar-icon" /> <span>Cinemas</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/movie" className="sidebar-link">
          <FaFilm className="sidebar-icon" /> <span>Movies</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/schedule" className="sidebar-link">
          <FaCalendarAlt className="sidebar-icon" /> <span>Schedules</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/order" className="sidebar-link">
          <FaShoppingCart className="sidebar-icon" /> <span>Orders</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/ticket" className="sidebar-link">
          <FaTicketAlt className="sidebar-icon" /> <span>Tickets</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/product" className="sidebar-link">
          <FaBoxOpen className="sidebar-icon" /> <span>Products</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/customer" className="sidebar-link">
          <FaUsers className="sidebar-icon" /> <span>Customers</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/equipment" className="sidebar-link">
          <FaTools className="sidebar-icon" /> <span>Equipment</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/employee" className="sidebar-link">
          <FaUserTie className="sidebar-icon" /> <span>Employees</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;