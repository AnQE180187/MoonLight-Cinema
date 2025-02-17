import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Bell, User } from "lucide-react"; // Import icon
import "./Header.css"; // Import CSS
import logo from "../assets/logo.webp";
const Header = () => {
  return (
    <Navbar className="custom-header" expand="lg">
      

      <Navbar.Brand href="/" className="header-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <img 
    src={logo} 
    alt="MoonLight Logo" 
    width="50" 
    height="50" 
    style={{ borderRadius: "50%" }} // Bo tròn logo
  />
  <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>MoonLight</span>
</Navbar.Brand>


      <Nav className="ml-auto">
        {/* Icon Notification */}
        <Nav.Link href="#" className="nav-icon">
          <Bell size={20} />
        </Nav.Link>

        {/* User Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle variant="light" className="user-dropdown">
            <User size={20} /> <span>Admin</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
