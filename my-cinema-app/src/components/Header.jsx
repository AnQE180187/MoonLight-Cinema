import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Bell, User } from "lucide-react"; // Import icon
import "./Header.css"; // Import CSS

const Header = () => {
  return (
    <Navbar className="custom-header" expand="lg">
      <Navbar.Brand href="/" className="header-title">
        🌙 MoonLight
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
