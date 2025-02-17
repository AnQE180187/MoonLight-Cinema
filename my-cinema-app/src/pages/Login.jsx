import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ onLogin }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Danh sách tài khoản Admin
  const ADMIN_ACCOUNTS = [
    { username: "admin1", password: "admin123" },
    { username: "admin2", password: "admin456" },
    { username: "admin3", password: "admin789" },
    { username: "vungu123", password: "cchovungu" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const foundAdmin = ADMIN_ACCOUNTS.find(admin => 
      admin.username === account && admin.password === password
    );

    if (foundAdmin) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("username", account);
      onLogin();
      navigate("/dashboard"); // Chuyển hướng sau khi đăng nhập thành công
    } else {
      alert("Invalid account or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">SIGN IN</h2>
        <form onSubmit={handleSubmit}>
          <label>Account</label>
          <input className="login-input" type="text" value={account} onChange={(e) => setAccount(e.target.value)} />
          <label>Password</label>
          <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
