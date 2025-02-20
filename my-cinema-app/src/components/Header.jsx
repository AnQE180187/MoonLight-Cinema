import React from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { Bell, User, LogOut } from "lucide-react"; // Thêm icon logout
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import "./Header.css"; // Import CSS
import logo from "../assets/logo.webp";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      // Xóa thông tin xác thực (ví dụ: token)
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      // Chuyển hướng đến trang đăng nhập
      navigate("/login");
    }
  };

  return (
    <Navbar className="custom-header" expand="lg">
      <Navbar.Brand
        href="/"
        className="header-title"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <img
          src={logo}
          alt="MoonLight Logo"
          width="50"
          height="50"
          style={{ borderRadius: "50%" }} // Bo tròn logo
        />
        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
          MoonLight
        </span>
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
            <Dropdown.Item as="button" onClick={handleLogout}>
              <LogOut size={18} className="me-2" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
