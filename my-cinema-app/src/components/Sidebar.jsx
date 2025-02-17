import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ width: "200px" }}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className="text-black">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/cinema" className="text-black">Cinemas</Nav.Link>
        <Nav.Link as={Link} to="/movie" className="text-black">Movies</Nav.Link>
        <Nav.Link as={Link} to="/schedule" className="text-black">Schedules</Nav.Link>
        <Nav.Link as={Link} to="/order" className="text-black">Orders</Nav.Link>
        <Nav.Link as={Link} to="/ticket" className="text-black">Tickets</Nav.Link>
        <Nav.Link as={Link} to="/product" className="text-black">Products</Nav.Link>
        <Nav.Link as={Link} to="/customer" className="text-black">Customers</Nav.Link>
        <Nav.Link as={Link} to="/equipment" className="text-black">Equipment</Nav.Link>
        <Nav.Link as={Link} to="/employee" className="text-black">Employees</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
